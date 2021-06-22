import React, { useState, useContext } from 'react';
import WebContext from '../context/WebContext';
import * as Constants from '../constants';
import { FaTwitter, FaCheck } from 'react-icons/fa';

const SignUp = () => {
    const { setUser, setPageStatus } = useContext(WebContext);
    
    // step 0: sign up with twitter / others
    // step 1: private key randomly generated
    // step 2: confirm private key
    const [step, setStep] = useState(0);
    const [privateKey, setPrivateKey] = useState("75av86YRG34MG9297388723987"); // got from api
    const [userInput, setUserInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const preventCloseBox = (event) => {
        event.stopPropagation();
    }

    const nextStep = (event) => {
        event.stopPropagation();
        setStep((prevState) => (prevState + 1));
        console.log('sign up step: ' + step);
    }

    const previousStep = (event) => {
        event.stopPropagation();
        setStep((prevState) => (prevState > 0? prevState - 1 : 0));
        console.log('sign up step: ' + step);
    }

    const copyPrivateKey = (event) => {
        event.stopPropagation();
        console.log('copy private key: ' + privateKey);
    }

    const downloadPrivateKey = (event) => {
        event.stopPropagation();
        console.log('download private key: ' + privateKey);
    }

    const handleUserInput = (event) => {
        event.stopPropagation();
        setUserInput(event.target.value);
        console.log('user input: ' + userInput);
    }

    const closeBox = () => {
        setPageStatus(Constants.PageStatus.None);
        setUser({ privateKey: privateKey });
    }

    return (
        <div className="signupBox" onClick={preventCloseBox}>
            <div className="signup-title">
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
                    {/* should change to real functioned connect to twitter account */}
                    <div className="signup-with-twitter" onClick={nextStep}>
                        <FaTwitter />
                    </div>
                </div> : step === 1?
                <div>
                    <div className="signup-private-key" onClick={copyPrivateKey}>
                        <div className="signup-private-key-text">{privateKey}</div>
                        <div className="signup-private-key-status"><FaCheck /></div>
                    </div>
                    <div className="signup-message">
                        Record this private key and store it safely. You will need it to regain access to your reputation score.
                    </div>
                    <div className="signup-button-black" onClick={downloadPrivateKey}>Download Private Key</div>
                    <div className="signup-button-white" onClick={nextStep}>Next</div>
                </div> : step === 2?
                <div className="signup-confirm">
                    <div className="signup-private-key">
                        <form>
                            <input type="text" name="userInput" placeholder="enter your private key" onChange={handleUserInput} />
                        </form>
                    </div>
                    <div className="signup-message">
                        ... some message
                    </div>
                    <div className="signup-button-black" onClick={closeBox}>Confirm</div>
                    <div className="signup-button-white" onClick={previousStep}>{"<<Back"}</div>
                </div> : <div>{errorMsg}</div>
            } 
        </div>
    );
}

export default SignUp;