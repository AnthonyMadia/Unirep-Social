import { Router } from 'express';
import SignUpRouter from './SignUpRouter';
import SignInRouter from './SignInRouter';
import PostRouter from './PostRouter';
import CommentRouter from './CommentRouter';
import VoteRouter from './VoteRouter';
import TransitionRouter from './TransitionRouter';
import GenInvitationCodeRouter from './GenInvitationCodeRouter';
import EpochRouter from './EpochRouter';

class MasterRouter {
  private _router = Router();
  private _signupRouter = SignUpRouter;
  private _signinRouter = SignInRouter;
  private _postRouter = PostRouter;
  private _commentRouter = CommentRouter;
  private _voteRouter = VoteRouter;
  private _transitionRouter = TransitionRouter;
  private _genInvitationCodeRouter = GenInvitationCodeRouter;
  private _epochRouter = EpochRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/signup', this._signupRouter);
    this._router.use('/signin', this._signinRouter);
    this._router.use('/post', this._postRouter);
    this._router.use('/comment', this._commentRouter);
    this._router.use('/vote', this._voteRouter);
    this._router.use('/transition', this._transitionRouter);
    this._router.use('/genInvitationCode', this._genInvitationCodeRouter);
    this._router.use('/epochTransition', this._epochRouter);
  }
}

export = new MasterRouter().router;