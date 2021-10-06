import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { WebContext } from '../../context/WebContext';
import * as Constants from '../../constants';
import { userStateTransition } from '../../utils';
import './header.scss';

const Header = () => {
    const history = useHistory();

    const makeCountdownText = () => {
        const diff = (nextUSTTime - Date.now()) / 1000; // change to seconds instead of milliseconds
        if (diff >= 0) {
            const days = Math.floor(diff / (60 * 60 * 24));
            const hours = Math.floor((diff / (60 * 60)) % 24);
            const minutes = Math.floor((diff / 60) % 60);
            const seconds = Math.floor(diff % 60);
            
            const ret = days + 'd:' + hours + 'h:' + minutes + 'm:' + seconds + 's';
            return ret;
        } else {
            return 'processing user state transition...';
        }
    }

    const { user, setUser, setPageStatus, shownPosts, setShownPosts, isLoading, nextUSTTime } = useContext(WebContext);
    const [searchInput, setSearchInput] = useState<string>("");
    const [countdownText, setCountdownText] = useState(makeCountdownText());

    useEffect(
        () => {
            const timer = setTimeout(() => setCountdownText(makeCountdownText()), 1000);

            return () => {
                clearTimeout(timer);
            }
        },
        [countdownText]
    );

    const signUp = () => {
        if (!isLoading) {
            console.log('open sign up! set ' + Constants.PageStatus.SignUp);
            setPageStatus(Constants.PageStatus.SignUp);
        }  
    }

    const signIn = () => {
        if (!isLoading) {
            console.log('open sign in! set ' + Constants.PageStatus.SignIn);
            setPageStatus(Constants.PageStatus.SignIn);
        }   
    }

    const logout = () => {
        if (!isLoading) {
            setUser(null);
            setShownPosts([...shownPosts].map(p => {
                const commentsLogout = p.comments.map(c => {
                    return {...c, isUpvoted: false, isDownvoted: false, isAuthor: false};
                });
                return {...p, isUpvoted: false, isDownvoted: false, isAuthor: false, comments: commentsLogout};
            }));
            history.push(`/`);
        }
    }

    const gotoUserPage = () => {
        if (!isLoading) {
            history.push(`/user`);
        }
    }

    const handleSearchInput = (event: any) => {
        console.log("search input : " + event.target.value);
    }

    const testUST = async () => {
        if (user !== null) {
            await userStateTransition(user.identity);
        }
    }

    return (
        <header>
            <div className="navLinks">
                <NavLink to="/" className="link" activeClassName="active" exact>
                    UNIREP SOCIAL
                </NavLink>
            </div>
            {/* <div className="search-bar">
                <div className="search-icon"><FaSearch /></div>
                <form>
                    <input type="text" name="searchInput" placeholder="Search by keyword, user names or epoch key" onChange={handleSearchInput} />
                </form>
            </div> */}
            <div className="timer" onClick={testUST}>{countdownText}</div>
            {user && user.identity? 
                <div className="navButtons">
                    <div className={isLoading? "lightPurpleButton disabled" : "lightPurpleButton"} onClick={gotoUserPage}>
                        <img src="/images/user-purple.png" />
                        <span>{user.reputation}</span>
                    </div>
                    <div className={isLoading? "whiteButton disabled" : "whiteButton"} onClick={logout}>Log out</div>
                </div> :
                <div className="navButtons">
                    <div className="purpleButton" onClick={signUp}> Sign Up</div>
                    <div className="whiteButton" onClick={signIn}> Sign In</div>
                </div>
                
            }   
        </header>
    );
}

export default Header;