import { genIdentity, genIdentityCommitment, serialiseIdentity, unSerialiseIdentity } from 'libsemaphore'
import base64url from 'base64url'
import { ethers } from 'ethers'
import { stringifyBigInts } from 'maci-crypto'
import * as config from './config'

import UnirepSocial from "./artifacts/contracts/UnirepSocial.sol/UnirepSocial.json"
import Unirep from "./artifacts/contracts/Unirep.sol/Unirep.json"

import { genEpochKey, genUserStateFromContract } from './core/utils'
import { add0x } from './crypto/SMT'
import { genVerifyReputationProofAndPublicSignals, getSignalByNameViaSym, verifyProveReputationProof, formatProofForVerifierContract } from './circuits'

export const getUserState = async (identity: string) => {
    const provider = new ethers.providers.JsonRpcProvider(config.DEFAULT_ETH_PROVIDER)

    const unirepSocialContract = new ethers.Contract(
        config.UNIREP_SOCIAL,
        UnirepSocial.abi,
        provider,
    )

    const unirepAddress = await unirepSocialContract.unirep()
    const unirepContract = new ethers.Contract(
        unirepAddress,
        Unirep.abi,
        provider,
    )

    const numEpochKeyNoncePerEpoch = await unirepContract.numEpochKeyNoncePerEpoch()
    const encodedIdentity = identity.slice(config.identityPrefix.length)
    const decodedIdentity = base64url.decode(encodedIdentity)
    const id = unSerialiseIdentity(decodedIdentity)
    const commitment = genIdentityCommitment(id)
    const currentEpoch = (await unirepContract.currentEpoch()).toNumber()
    const treeDepths = await unirepContract.treeDepths()
    
    // Gen epoch key proof and reputation proof from Unirep contract
    const userState = await genUserStateFromContract(
        provider,
        unirepAddress,
        config.DEFAULT_START_BLOCK,
        id,
        commitment,
    )

    return {userState, id, currentEpoch, treeDepths, numEpochKeyNoncePerEpoch}
}

export const getEpochKeys = async (identity: string) => {
    const {userState, id, currentEpoch, treeDepths, numEpochKeyNoncePerEpoch} = await getUserState(identity);
    const epochTreeDepth = treeDepths.epochTreeDepth
    let epks: string[] = []

    for (let i = 0; i < numEpochKeyNoncePerEpoch; i++) {
        const tmp = genEpochKey(id.identityNullifier, currentEpoch, i, epochTreeDepth).toString(16)
        epks = [...epks, tmp]
    }
    console.log(epks)

    return {epks, userState}
}

const genProof = async (identity: string, epkNonce: number = 0, proveKarmaAmount: number, minRep: number = 0) => {
    const {userState, id, currentEpoch, treeDepths, numEpochKeyNoncePerEpoch} = await getUserState(identity);

    if (epkNonce >= numEpochKeyNoncePerEpoch) {
        console.error('no such epknonce available')
    }

    const epochTreeDepth = treeDepths.epochTreeDepth
    const epk = genEpochKey(id.identityNullifier, currentEpoch, epkNonce, epochTreeDepth).toString(16)
    console.log('after gen epoch key: ' + epk)

    let circuitInputs: any
    let GSTRoot: any
    let nullifierTreeRoot: any

    console.log('generating proving circuit from contract...')

    circuitInputs = await userState.genProveReputationCircuitInputs(
        epkNonce,                       // generate epoch key from epoch nonce
        proveKarmaAmount,               // the amount of output karma nullifiers
        minRep                          // the amount of minimum reputation the user wants to prove
    )
    
    GSTRoot = userState.getUnirepStateGSTree(currentEpoch).root
    nullifierTreeRoot = (await userState.getUnirepStateNullifierTree()).getRootHash()

    console.log('genVerifyReputationProofAndPublicSignals...')
    const results = await genVerifyReputationProofAndPublicSignals(stringifyBigInts(circuitInputs))
    console.log(results)
    
    const nullifiers = results['publicSignals'].slice(0, config.MAX_KARMA_BUDGET)
    
    // TODO: Not sure if this validation is necessary
    const isValid = await verifyProveReputationProof(results['proof'], results['publicSignals'])
    if(!isValid) {
        console.error('Error: reputation proof generated is not valid!')
        return
    }

    const proof = formatProofForVerifierContract(results['proof'])

    // generate public signals
    const publicSignals = [
        GSTRoot,
        nullifierTreeRoot,
        BigInt(true),
        proveKarmaAmount,
        minRep !== 0 ? BigInt(1) : BigInt(0),
        minRep !== 0 ? BigInt(minRep) : BigInt(0)
    ]

    return {epk, proof, publicSignals, nullifiers}
}

const makeURL = (action: string, data: any) => {
    let dataStr: string = ''

    for (let k of Object.keys(data)) {
        dataStr = dataStr + k + '=' + data[k] + '&'
    }

    return config.SERVER + '/api/' + action + '?' + dataStr
}

const header = {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': config.SERVER,
    'Access-Control-Allow-Credentials': 'true',
}

export const checkInvitationCode = async (invitationCode: string) => {
    const apiURL = makeURL('genInvitationCode/' + invitationCode, {})
    var ret = false
    await fetch(apiURL)
        .then(response => ret = (response.ok === true));
    return ret
}

export const userSignUp = async () => {
    const id = genIdentity()
    const commitment = genIdentityCommitment(id)

    const serializedIdentity = serialiseIdentity(id)
    const encodedIdentity = base64url.encode(serializedIdentity)
    console.log(config.identityPrefix + encodedIdentity)

    const serializedIdentityCommitment = commitment.toString(16)
    const encodedIdentityCommitment = base64url.encode(serializedIdentityCommitment)
    console.log(config.identityCommitmentPrefix + encodedIdentityCommitment)

    // call server user sign up
    const apiURL = makeURL('signup', {commitment: config.identityCommitmentPrefix + encodedIdentityCommitment})
    await fetch(apiURL)
        .then(response => response.json())
        .then(function(data){
            console.log(data)
        });

    return {i: config.identityPrefix + encodedIdentity, c: config.identityCommitmentPrefix + encodedIdentityCommitment}
}

export const publishPost = async (content: string, epkNonce: number, identity: string, minRep: number = 0) => {
    const ret = await genProof(identity, epkNonce, config.DEFAULT_POST_KARMA, minRep, )

    if (ret === undefined) {
        console.error('genProof error, ret is undefined.')
        return
    }

     // to backend: proof, publicSignals, content
     const apiURL = makeURL('post', {})
     const data = {
        content,
        epk: ret.epk,
        proof: ret.proof, 
        minRep,
        nullifiers: ret.nullifiers,
        publicSignals: ret.publicSignals,
     }
     const stringifiedData = JSON.stringify(data, (key, value) => 
        typeof value === "bigint" ? value.toString() + "n" : value
     )
     console.log('before publish post api: ' + stringifiedData)
     
     let transaction: string = ''
     let postId: string = ''
     await fetch(apiURL, {
         headers: header,
         body: stringifiedData,
         method: 'POST',
     }).then(response => response.json())
        .then(function(data){
            console.log(JSON.stringify(data))
            transaction = data.transaction
            postId = data.postId
        });
    
    return {epk: ret.epk, transaction, postId}
}

export const vote = async(identity: string, upvote: number, downvote: number, postId: string, receiver: string, epkNonce: number = 0, minRep: number = 0) => {
    // upvote / downvote user 
    const graffiti = BigInt(0)
    const overwriteGraffiti = false
    const voteValue = upvote + downvote

    const ret = await genProof(identity, epkNonce, voteValue, minRep)
    if (ret === undefined) {
        console.error('genProof error, ret is undefined.')
        return
    }

    // send publicsignals, proof, voted post id, receiver epoch key, graffiti to backend  
    const apiURL = makeURL('vote', {})
    const data = {
       upvote,
       downvote,
       graffiti,
       overwriteGraffiti,
       epk: ret.epk,
       proof: ret.proof, 
       minRep,
       nullifiers: ret.nullifiers,
       publicSignals: ret.publicSignals,
       receiver
    }
    const stringifiedData = JSON.stringify(data, (key, value) => 
       typeof value === "bigint" ? value.toString() + "n" : value
    )
    console.log('before vote api: ' + stringifiedData)
    
    let transaction: string = ''
    await fetch(apiURL, {
        headers: header,
        body: stringifiedData,
        method: 'POST',
    }).then(response => response.json())
       .then(function(data){
           console.log(JSON.stringify(data))
           transaction = data.transaction
       });

    const epochKey = BigInt(add0x(ret.epk))
    return {epk: epochKey.toString(), transaction} 
}

export const leaveComment = async(identity: string, content: string, postId: string, epkNonce: number = 0, minRep: number = 0) => {
    const ret = await genProof(identity, epkNonce, config.DEFAULT_COMMENT_KARMA, minRep)
    if (ret === undefined) {
        console.error('genProof error, ret is undefined.')
        return
    }

    // send proof, publicSignals, postid, content, epockKey to backend
    const apiURL = makeURL('comment', {})
     const data = {
        content,
        epk: ret.epk,
        proof: ret.proof, 
        minRep,
        postId,
        nullifiers: ret.nullifiers,
        publicSignals: ret.publicSignals,
     }
     const stringifiedData = JSON.stringify(data, (key, value) => 
        typeof value === "bigint" ? value.toString() + "n" : value
     )
     console.log('before leave comment api: ' + stringifiedData)
     
     let transaction: string = ''
     let commentId: string = ''
     await fetch(apiURL, {
         headers: header,
         body: stringifiedData,
         method: 'POST',
     }).then(response => response.json())
        .then(function(data){
            console.log(JSON.stringify(data))
            transaction = data.transaction
            commentId = data.commentId
        });

    const epochKey = BigInt(add0x(ret.epk))
    return {epk: epochKey.toString(), commentId}
}