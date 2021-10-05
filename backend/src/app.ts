import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import ErrorHandler from './ErrorHandler';
import MasterRouter from './routers/MasterRouter';

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MasterRouter;
}

// initialize server app
const server = new Server();
server.app.use(cors());
server.app.use(express.json());

// make server app handle any route starting with '/api'
server.app.use('/api', server.router);

// make server app handle any error
server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message
    });
  });

// global variables
global.invitationCodes = [];
global.nextEpochTransition = Date.now() + 7 * 24 * 60 * 60 * 1000;

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();