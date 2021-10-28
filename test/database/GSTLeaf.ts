import { ethers as hardhatEthers } from 'hardhat'
import { BigNumber, ethers } from 'ethers'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { verifyProof, formatProofForVerifierContract } from "@unirep/circuits"
import { attestingFee, epochLength, numEpochKeyNoncePerEpoch, maxUsers, UserState, circuitGlobalStateTreeDepth, circuitEpochTreeDepth, circuitUserStateTreeDepth, genUserStateFromContract, genUnirepStateFromContract } from '@unirep/unirep'
import { deployUnirep } from '@unirep/contracts'
import { add0x, genIdentity, genIdentityCommitment, genRandomSalt, Identity, IncrementalQuinTree } from '@unirep/crypto'

import { dbUri } from '../../config/database';
import { findValidNonce, genNewUserStateTree, getTreeDepthsForTesting } from '../utils'
import { defaultAirdroppedReputation, defaultCommentReputation, defaultPostReputation } from '../../config/socialMedia'
import { deployUnirepSocial } from '../../core/utils'
import Post, { IPost } from "../../database/models/post";
import Comment, { IComment } from '../../database/models/comment';
import { updateDBFromPostSubmittedEvent, updateDBFromCommentSubmittedEvent, updateGSTLeaves, getGSTLeaves } from '../../database/utils'


describe('GSTLeaf', function () {
    this.timeout(300000)

    let db
    let unirepContract
    let unirepSocialContract
    let GSTree
    let emptyUserStateRoot
    let ids: Identity[] = []
    let commitments: BigInt[] = []

    let accounts: ethers.Signer[]
    let GSTLeaves
    let GSTRoots
    let results
    let postId
    let commentId
    const text = genRandomSalt().toString()
    const commentText = genRandomSalt().toString()
    let attesterId

    before(async () => {
        accounts = await hardhatEthers.getSigners()

        const _treeDepths = getTreeDepthsForTesting('circuit')
        unirepContract = await deployUnirep(<ethers.Wallet>accounts[0], _treeDepths)
        unirepSocialContract = await deployUnirepSocial(<ethers.Wallet>accounts[0], unirepContract.address)

        const blankGSLeaf = await unirepContract.hashedBlankStateLeaf()
        GSTree = new IncrementalQuinTree(circuitGlobalStateTreeDepth, blankGSLeaf, 2)

        db = await mongoose.connect(
            dbUri, 
            { useNewUrlParser: true, 
              useFindAndModify: false, 
              useUnifiedTopology: true
            }
        )
    })

    it('should have the correct config value', async () => {
        const attestingFee_ = await unirepContract.attestingFee()
        expect(attestingFee).equal(attestingFee_)
        const epochLength_ = await unirepContract.epochLength()
        expect(epochLength).equal(epochLength_)
        const numEpochKeyNoncePerEpoch_ = await unirepContract.numEpochKeyNoncePerEpoch()
        expect(numEpochKeyNoncePerEpoch).equal(numEpochKeyNoncePerEpoch_)
        const maxUsers_ = await unirepContract.maxUsers()
        expect(maxUsers).equal(maxUsers_)

        const treeDepths_ = await unirepContract.treeDepths()
        expect(circuitEpochTreeDepth).equal(treeDepths_.epochTreeDepth)
        expect(circuitGlobalStateTreeDepth).equal(treeDepths_.globalStateTreeDepth)
        expect(circuitUserStateTreeDepth).equal(treeDepths_.userStateTreeDepth)

        const postReputation_ = await unirepSocialContract.postReputation()
        expect(postReputation_).equal(defaultPostReputation)
        const commentReputation_ = await unirepSocialContract.commentReputation()
        expect(commentReputation_).equal(defaultCommentReputation)
        const airdroppedReputation_ = await unirepSocialContract.airdroppedReputation()
        expect(airdroppedReputation_).equal(defaultAirdroppedReputation)
        const unirepAddress_ = await unirepSocialContract.unirep()
        expect(unirepAddress_).equal(unirepContract.address)

        attesterId = await unirepContract.attesters(unirepSocialContract.address)
        expect(attesterId).not.equal(0)
        const airdropAmount = await unirepContract.airdropAmount(unirepSocialContract.address)
        expect(airdropAmount).equal(defaultAirdroppedReputation)
    })

    describe('User sign-ups', () => {

        it('sign up should succeed', async () => {
            for (let i = 0; i < 3; i++) {
                const id = genIdentity()
                const commitment = genIdentityCommitment(id) 
            
                const tx = await unirepSocialContract.userSignUp(commitment)
                const receipt = await tx.wait()
                expect(receipt.status).equal(1)

                ids.push(id)
                commitments.push(commitment)
            }
        })

        it('Unirep state before epoch transition', async () => {
            const unirepState = await genUnirepStateFromContract(
                hardhatEthers.provider,
                unirepContract.address,
                0,
            )
            console.log('----------------------Unirep State----------------------')
            console.log(unirepState.toJSON(4))
            console.log('------------------------------------------------------')

            // store GST leaves and roots
            const unirepJSON = JSON.parse(unirepState.toJSON(4))
            const epoch = unirepJSON.currentEpoch
            GSTLeaves = unirepJSON.latestEpochGSTLeaves
            GSTRoots = unirepJSON.globalStateTreeRoots
            await updateGSTLeaves(unirepContract.address, hardhatEthers.provider, epoch, GSTLeaves, GSTRoots)
        })

        it('epoch transition', async () => {
            let currentEpoch = await unirepContract.currentEpoch()
            const prevEpoch = currentEpoch
            // Fast-forward epochLength of seconds
            await hardhatEthers.provider.send("evm_increaseTime", [epochLength])
            // Begin epoch transition
            let tx = await unirepContract.beginEpochTransition()
            let receipt = await tx.wait()
            expect(receipt.status, 'Epoch transition failed').to.equal(1)

            currentEpoch = await unirepContract.currentEpoch()
            expect(currentEpoch, `Current epoch should be ${prevEpoch.toNumber()+1}`).to.equal(prevEpoch.toNumber() + 1)

            const unirepState = await genUnirepStateFromContract(
                hardhatEthers.provider,
                unirepContract.address,
                0,
            )
            console.log('----------------------Unirep State----------------------')
            console.log(unirepState.toJSON(4))
            console.log('------------------------------------------------------')
        })

        it('query GST leaves and GST roots should success', async () => {
            const leaves = await getGSTLeaves(1)
            for (let i = 0; i < leaves.length; i++) {
                expect(leaves[i].hashedLeaf).equal(GSTLeaves[i])
            }
        })

        it('user state transition', async () => {
            for (let i = 0; i < 3; i++) {
                const userState = await genUserStateFromContract(
                    hardhatEthers.provider,
                    unirepContract.address,
                    0,
                    ids[i],
                    commitments[i]
                )
                const results = await userState.genUserStateTransitionProofs()
                const proofIndexes: BigInt[] = []

                const blindedUserState = results.startTransitionProof.blindedUserState
                const blindedHashChain = results.startTransitionProof.blindedHashChain
                const GSTreeRoot = results.startTransitionProof.globalStateTreeRoot
                const proof = formatProofForVerifierContract(results.startTransitionProof.proof)
                let tx = await unirepSocialContract.startUserStateTransition(
                    blindedUserState,
                    blindedHashChain,
                    GSTreeRoot,
                    proof,
                )
                let receipt = await tx.wait()
                expect(receipt.status, 'Submit user state transition proof failed').to.equal(1)

                const proofNullifier = await unirepContract.hashStartTransitionProof(
                    blindedUserState,
                    blindedHashChain,
                    GSTreeRoot,
                    proof
                )
                const proofIndex = await unirepContract.getProofIndex(proofNullifier)
                proofIndexes.push(BigInt(proofIndex))

                for (let j = 0; j < results.processAttestationProofs.length; j++) {
                    const outputBlindedUserState = results.processAttestationProofs[j].outputBlindedUserState
                    const outputBlindedHashChain = results.processAttestationProofs[j].outputBlindedHashChain
                    const inputBlindedUserState = results.processAttestationProofs[j].inputBlindedUserState
                    
                    const tx = await unirepSocialContract.processAttestations(
                        outputBlindedUserState,
                        outputBlindedHashChain,
                        inputBlindedUserState,
                        formatProofForVerifierContract(results.processAttestationProofs[j].proof),
                    )
                    const receipt = await tx.wait()
                    expect(receipt.status, 'Submit process attestations proof failed').to.equal(1)

                    const proofNullifier = await unirepContract.hashProcessAttestationsProof(
                        outputBlindedUserState,
                        outputBlindedHashChain,
                        inputBlindedUserState,
                        formatProofForVerifierContract(results.processAttestationProofs[j].proof),
                    )
                    const proofIndex = await unirepContract.getProofIndex(proofNullifier)
                    proofIndexes.push(BigInt(proofIndex))
                }

                const newGSTLeaf = results.finalTransitionProof.newGlobalStateTreeLeaf
                const outputEpkNullifiers = results.finalTransitionProof.epochKeyNullifiers
                const blindedUserStates = results.finalTransitionProof.blindedUserStates
                const blindedHashChains = results.finalTransitionProof.blindedHashChains
                const fromEpoch = results.finalTransitionProof.transitionedFromEpoch
                const fromGSTreeRoot = results.finalTransitionProof.fromGSTRoot
                const epochTreeRoot = results.finalTransitionProof.fromEpochTree
                const finalProof = formatProofForVerifierContract(results.finalTransitionProof.proof)

                const transitionProof = [
                    newGSTLeaf,
                    outputEpkNullifiers,
                    fromEpoch,
                    blindedUserStates,
                    fromGSTreeRoot,
                    blindedHashChains,
                    epochTreeRoot,
                    finalProof,
                ]
                tx = await unirepContract.updateUserStateRoot(
                    transitionProof,
                    proofIndexes,
                )
                receipt = await tx.wait()
                expect(receipt.status, 'Submit user state transition proof failed').to.equal(1)
            }
        })
    })

    describe('Generate reputation proof for verification', () => {

    })

})