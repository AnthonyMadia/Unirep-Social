import React, { useContext, useState } from 'react';
import { WebContext } from '../../context/WebContext';
import { UserPageContext } from '../../context/UserPageContext';
import { UserPageType } from '../../constants';
import UserHeader from './userHeader';
import './userPage.scss';

const UserPage = () => {

    const [page, setPage] = useState<UserPageType>(UserPageType.Posts)

    const closeAll = () => {
    }

    return (
        <div className="default-gesture" onClick={closeAll}>
            <UserPageContext.Provider value={{page, switchPage: setPage}}>
                <UserHeader />
            </UserPageContext.Provider>
        </div>
    );
};

export default UserPage;