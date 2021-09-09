import ErrorHandler from '../ErrorHandler';
import randomstring from 'randomstring';

class GenInvitationCodeController {
    invitationCodes = {}; // should be a global or stored in db
    
    defaultMethod() {
      throw new ErrorHandler(501, 'API: Not implemented method');
    }

    genCode = () => {
        const randomOutput = randomstring.generate(8);
        console.log('random output: ' + randomOutput);

        this.invitationCodes[randomOutput] = false;
        console.log('all invitation codes: ' + JSON.stringify(this.invitationCodes));

        return randomOutput;
    }
  }

  export = new GenInvitationCodeController();