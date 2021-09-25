import React, { useState, useContext } from 'react';
import { WebContext } from '../../context/WebContext';
import * as Constants from '../../constants';
import { userSignIn, getEpochKeys, getUserState } from '../../utils';
import './overlay.scss';

const SignUp = () => {
    const { setUser, setPageStatus, shownPosts, setShownPosts } = useContext(WebContext);
    
    const [userInput, setUserInput] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    const preventCloseBox = (event: any) => {
        event.stopPropagation();
    }

    const handleUserInput = (event: any) => {
        event.stopPropagation();
        setUserInput(event.target.value);
        console.log('user input: ' + userInput);
    }

    const closeBox = async () => {
        const ret = await userSignIn(userInput);
        
        if (ret) {
            const reputations = (await getUserState(userInput)).userState.getRep();
            const ret = await getEpochKeys(userInput);

            setUser({
                identity: userInput,
                epoch_keys: ret.epks,
                reputations,
            });

            setShownPosts([...shownPosts].map(p => {
                let isUpvoted: boolean = false, isDownvoted: boolean = false;
                p.vote.forEach(v => {
                    if (v.epoch_key in ret.epks) {
                        if (v.upvote > 0) {
                            isUpvoted = true;
                        }
                        if (v.downvote > 0) {
                            isDownvoted = true;
                        }
                    }
                });
                let comments = [...p.comments].map(c => {
                    let isUpvotedC: boolean = false, isDownvotedC: boolean = false;
                    c.vote.forEach(v => {
                        if (v.epoch_key in ret.epks) {
                            if (v.upvote > 0) {
                                isUpvotedC = true;
                            }
                            if (v.downvote > 0) {
                                isDownvotedC = true;
                            }
                        }
                    });
                    let newComment: Constants.Comment = {...c, isUpvoted: isUpvotedC, isDownvoted: isDownvotedC};
                    return newComment;
                });
                let newPost: Constants.Post = {...p, isUpvoted, isDownvoted, comments};
                return newPost;
            }));

            setPageStatus(Constants.PageStatus.None);
        } else {
            console.log(ret);
        }
        
    }

    return (
        <div className="signBox" onClick={preventCloseBox}>
            <div className="sign-title">
                <h3>Sign In With Private Key</h3> 
            </div>
            <div className="sign-message">
                Enter your private key to sign back in.
            </div>
            <div className="sign-confirm">
                <div className="sign-private-key">
                    <textarea name="userInput" placeholder="enter your private key" onChange={handleUserInput} />
                </div>
                <div className="margin-box"></div>
                <div className="sign-button-purple" onClick={closeBox}>Confirm</div>
            </div>
        </div>
    );
}

export default SignUp;