import ErrorHandler from '../ErrorHandler';

class EpochController {
    defaultMethod() {
      throw new ErrorHandler(501, 'API: Not implemented method');
    }
  }

  export = new EpochController();