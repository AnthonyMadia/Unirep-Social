import { NextFunction, Request, Response, Router } from 'express';
import GenInvitationCodeController from '../controllers/GenInvitationCodeController';

class GenInvitationCodeRouter {
  private _router = Router();
  private _controller = GenInvitationCodeController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _configure() {
    this._router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization === 'NLmKDUnJUpc6VzuPc7Wm') {
            try {
                const ret = this._controller.genCode();
                res.status(200).json(ret);
              }
              catch (error) {
                console.log(error);
                next(error);
              }
        } else {
            res.status(403).json({error: 'No available authentications'});
        }
      });
  }
}

export = new GenInvitationCodeRouter().router;