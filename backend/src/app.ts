import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import ErrorHandler from './ErrorHandler';
import MasterRouter from './routers/MasterRouter';

import EpochController from './controllers/EpochController';

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

// global variables: actually should be stored in db
global.epochPeriod = 7 * 24 * 60 * 60 * 1000;
// global.epochPeriod = 2 * 60 * 1000;

global.invitationCodes = [];
global.nextEpochTransition = Date.now() + global.epochPeriod + 10000; // delay 10 seconds

const doEpochTransition = async () => {
  console.log('do epoch transition');
  const _controller = EpochController;
  try {
    await _controller.epochTransition();
  } catch (e) {
    console.error(e);
  }
  setTimeout(doEpochTransition, global.epochPeriod);
}

setTimeout(doEpochTransition, global.epochPeriod);

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();