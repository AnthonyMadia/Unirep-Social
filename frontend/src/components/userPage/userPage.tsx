import React, { useContext, useState } from 'react';
import { WebContext } from '../../context/WebContext';
import { MainPageContext } from '../../context/MainPageContext';
import './userPage.scss';

const UserPage = () => {

    const closeAll = () => {
    }

    return (
        <div className="default-gesture" onClick={closeAll}>
            
        </div>
    );
};

export default UserPage;