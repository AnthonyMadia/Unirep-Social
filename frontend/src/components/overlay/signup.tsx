import React, { useState, useContext } from 'react';
import { WebContext } from '../../context/WebContext';
import * as Constants from '../../constants';
import { FaTwitter } from 'react-icons/fa';
import { checkInvitationCode, userSignUp, getEpochKeys } from '../../utils';
import './overlay.scss';

const SignUp = () => {
    const { setUser, setPageStatus } = useContext(WebContext);
    
    
    // step 0: sign up with twitter / others
    // step 1: private key randomly generated
    // step 2: confirm private key
    const [step, setStep] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [codeInput, setCodeInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [identity, setIdentity] = useState("");
    const [commitment, setCommitment] = useState("");
    const [epks, setEpks] = useState<string[]>([]);
    const [reputations, setReputations] = useState(0);

    const preventCloseBox = (event: any) => {
        event.stopPropagation();
    }

    const nextStep = async (event: any) => {
        event.stopPropagation();
        setErrorMsg("");

        if (step === 0) {
            const {i, c} = await userSignUp();
            setIdentity(i);
            setCommitment(c);
            const ret = await getEpochKeys(i);
            setEpks(ret.epks);
            setReputations(ret.userState.getRep());
        }

        setStep((prevState) => (prevState + 1));
    }

    const previousStep = (event: any) => {
        event.stopPropagation();
        setStep((prevState) => (prevState > 0? prevState - 1 : 0));
        // console.log('sign up step: ' + step);
    }

    const copyPrivateKey = (event: any) => {
        event.stopPropagation();
        navigator.clipboard.writeText(identity);
    }

    const downloadPrivateKey = (event: any) => {
        event.stopPropagation();

        const element = document.createElement('a');
        const file = new Blob([identity], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = 'unirep-social-identity.txt';
        document.body.appendChild(element);
        element.click();
    }

    const handleInvitationCode = (event: any) => {
        event.stopPropagation();
        setCodeInput(event.target.value);
    }

    const submitInvitationCode = async (event: any) => {
        const ret = await checkInvitationCode(codeInput);
        if (ret) {
            await nextStep(event);
        } else {
            setErrorMsg("Wrong invitation code.");
        }
    }

    const handleUserInput = (event: any) => {
        event.stopPropagation();
        setUserInput(event.target.value);
        if (event.target.value !== identity) {
            setErrorMsg("Incorrect private key. Go back to download your key.");
        } else {
            setErrorMsg("");
        }
    }

    const closeBox = async () => {
        setPageStatus(Constants.PageStatus.None);
        setUser({ identity: identity, epoch_keys: epks, reputations });
    }

    return (
        <div className="signBox" onClick={preventCloseBox}>
            <div className="sign-title">
                <h3>{
                    step === 0?
                    "Sign Up With" : step === 1?
                    "Protect Your Private Key" : step === 2?
                    "Confirm Your Private Key" : "Sign Up Error"
                }</h3> 
            </div>
            {
                step === 0?
                <div className="signup-with">
                    <input name="invitationCode" placeholder="enter your invitation code" onChange={handleInvitationCode} />
                    <div className="sign-button-purple" onClick={submitInvitationCode}>Submit</div>
                    {errorMsg !== ''? 
                        <div className="sign-error-message">
                            {errorMsg}
                        </div> : <div></div>
                    }
                </div> : step === 1?
                <div>
                    <div className="sign-message">
                        Record this private key and store it safely. You will need it to regain access to your reputation score.
                    </div>
                    <div className="sign-private-key" onClick={copyPrivateKey}>
                        {identity}
                        <div className="divider"></div>
                        <div className="copy" onClick={copyPrivateKey}>
                            <img src="/images/copy.png" />
                            <span>Copy to Clipboard</span>
                        </div>
                    </div>
                    <div className="divider-or">- or -</div>
                    <div className="sign-buttons">
                        <div className="sign-button-purple" onClick={downloadPrivateKey}>Download Private Key</div>
                        <div className="sign-button-grey" onClick={nextStep}>Next</div>
                    </div>
                </div> : step === 2?
                <div>
                    <div className="sign-message">
                        Record this private key and store it safely. You will need it to regain access to your reputation score.
                    </div>
                    <div className="sign-private-key">
                        <textarea name="userInput" placeholder="enter your private key" onChange={handleUserInput} />
                    </div>
                    {errorMsg !== ''? 
                        <div className="sign-error-message">
                            <img src="/images/warning.png" />
                            <span>{errorMsg}</span>
                        </div> : <div></div>
                    }
                    <div className="margin-box"></div>
                    <div className="sign-button-purple" onClick={closeBox}>Confirm</div>
                    <div className="sign-button-grey" onClick={previousStep}>Back</div>
                </div> : <div>{errorMsg}</div>
            } 
        </div>
    );
}

export default SignUp;