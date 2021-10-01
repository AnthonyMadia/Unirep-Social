import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';

import useLocalStorage from './useLocalStorage';
import * as Constants from './constants';

import Header from './components/header/header';
import Overlay from './components/overlay/overlay';
import MainPage from './components/mainPage/mainPage';
import PostPage from './components/postPage/postPage';
import UserPage from './components/userPage/userPage';

import { WebContext } from './context/WebContext';

const AppRouter = () => {

    const [user, setUser] = useLocalStorage(Constants.userKey, {});
    const [pageStatus, setPageStatus] = useLocalStorage(Constants.pageStatusKey, Constants.PageStatus.None);
    const [shownPosts, setShownPosts] = useLocalStorage(Constants.shownPostsKey, []);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <BrowserRouter>
            <div>
            <WebContext.Provider value={{
                    user, setUser, 
                    pageStatus, setPageStatus, 
                    shownPosts, setShownPosts, 
                    isLoading, setIsLoading}}>
                <Header />
                
                <Switch>
                    <Route component={MainPage} path="/" exact={true} />
                    <Route component={PostPage} path="/post/:id" />
                    <Route component={UserPage} path="/user" />
                    <Route component={() => <Redirect to="/" />} />
                </Switch>

                {pageStatus !== Constants.PageStatus.None? 
                    <Overlay /> : <div></div>
                }
            </WebContext.Provider>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;