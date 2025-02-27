import { Express } from 'express'
import catchError from '../catchError'
import { ethers } from 'ethers'
import TransactionManager from '../daemons/TransactionManager'
import { formatProofForSnarkjsVerification } from '@unirep/circuits'
import { ReputationProof } from '@unirep/contracts'
import { verifyReputationProof } from '../utils'
import {
    UNIREP,
    UNIREP_SOCIAL_ABI,
    UNIREP_ABI,
    UNIREP_SOCIAL,
    DEFAULT_ETH_PROVIDER,
    DEFAULT_COMMENT_KARMA,
    UNIREP_SOCIAL_ATTESTER_ID,
    QueryType,
    LOAD_POST_COUNT,
} from '../constants'
import { ActionType } from '@unirep-social/core'

export default (app: Express) => {
    app.get('/api/comment/:id', catchError(loadComment))
    app.get('/api/comment/:commentId/votes', catchError(loadVotesByCommentId))
    app.get('/api/comment/', catchError(listComments))
    app.post('/api/comment', catchError(createComment))
}

async function loadComment(req, res, next) {
    const comment = await req.db.findOne('Comment', {
        transactionHash: req.params.id,
    })
    res.json(comment)
}

async function loadVotesByCommentId(req, res, next) {
    const { commentId } = req.params
    const votes = await req.db.findMany('Vote', {
        where: {
            commentId,
        },
    })
    res.json(votes)
}

async function listComments(req, res, next) {
    if (req.query.query === undefined) {
        const comments = await req.db.findMany('Comment', { where: {} })
        res.json(comments)
        return
    }
    const lastRead = req.query.lastRead
    const query = req.query.query.toString()
    const epks = req.query.epks ? req.query.epks.split('_') : []
    const comments = await req.db.findMany('Comment', {
        where: {
            createdAt:
                lastRead && query === QueryType.New
                    ? {
                          $lt: +lastRead,
                      }
                    : undefined,
            epochKey: epks.length ? epks : undefined,
        },
        // TODO: add an offset argument for non-chronological sorts
        orderBy: {
            createdAt: query === QueryType.New ? 'desc' : undefined,
            posRep: query === QueryType.Boost ? 'desc' : undefined,
            negRep: query === QueryType.Squash ? 'desc' : undefined,
            totalRep: query === QueryType.Rep ? 'desc' : undefined,
        },
        limit: LOAD_POST_COUNT,
    })
    res.json(comments)
}

async function createComment(req, res) {
    const unirepContract = new ethers.Contract(
        UNIREP,
        UNIREP_ABI,
        DEFAULT_ETH_PROVIDER
    )
    const unirepSocialContract = new ethers.Contract(
        UNIREP_SOCIAL,
        UNIREP_SOCIAL_ABI,
        DEFAULT_ETH_PROVIDER
    )
    const unirepSocialId = UNIREP_SOCIAL_ATTESTER_ID
    const currentEpoch = Number(await unirepContract.currentEpoch())

    // Parse Inputs
    const { publicSignals, proof } = req.body
    const reputationProof = new ReputationProof(
        publicSignals,
        formatProofForSnarkjsVerification(proof)
    )
    const epochKey = BigInt(reputationProof.epochKey.toString()).toString(16)
    const minRep = Number(reputationProof.minRep)

    const error = await verifyReputationProof(
        req.db,
        reputationProof,
        DEFAULT_COMMENT_KARMA,
        unirepSocialId,
        currentEpoch
    )
    if (error !== undefined) {
        res.status(422).json({
            error,
        })
        return
    }

    const attestingFee = await unirepContract.attestingFee()
    const calldata = unirepSocialContract.interface.encodeFunctionData(
        'leaveComment',
        [req.body.postId, req.body.content, reputationProof]
    )
    const hash = await TransactionManager.queueTransaction(
        unirepSocialContract.address,
        {
            data: calldata,
            value: attestingFee,
        }
    )

    const comment = await req.db.create('Comment', {
        postId: req.body.postId,
        content: req.body.content, // TODO: hashedContent
        epochKey: epochKey,
        epoch: currentEpoch,
        proveMinRep: minRep !== 0 ? true : false,
        minRep: Number(minRep),
        posRep: 0,
        negRep: 0,
        status: 0,
        transactionHash: hash,
    })

    await req.db.create(
        'Nullifier',
        reputationProof.repNullifiers
            .filter((n) => n.toString() !== '0')
            .map((n) => ({
                epoch: currentEpoch,
                transactionHash: hash,
                nullifier: n.toString(),
                confirmed: false,
            }))
    )
    await req.db.create('Record', {
        to: epochKey,
        from: epochKey,
        upvote: 0,
        downvote: DEFAULT_COMMENT_KARMA,
        epoch: currentEpoch,
        action: ActionType.Comment,
        data: hash,
        transactionHash: hash,
        confirmed: false,
    })

    res.json({
        error: error,
        transaction: hash,
        currentEpoch: currentEpoch,
        comment,
    })
}
