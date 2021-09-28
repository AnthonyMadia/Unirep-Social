import React, { useContext, useState } from 'react';
import { WebContext } from '../../context/WebContext';
import { UserPageContext } from '../../context/UserPageContext';
import { UserPageType } from '../../constants';
import UserHeader from './userHeader';
import UserPosts from './userPosts';
import './userPage.scss';

const UserPage = () => {

    const [page, setPage] = useState<UserPageType>(UserPageType.Posts);
    const [isPostFieldActive, setIsPostFieldActive] = useState(false);

    const closeAll = () => {
        setIsPostFieldActive(false);
    }

    return (
        <div className="default-gesture" onClick={closeAll}>
            <UserPageContext.Provider value={{
                    page, switchPage: setPage, 
                    isPostFieldActive, setIsPostFieldActive}}>
                <UserHeader />
                { page === UserPageType.Posts? <UserPosts /> : <div></div>}
            </UserPageContext.Provider>
        </div>
    );
};

export default UserPage;