import { useContext } from 'react';
import { UserPageContext } from '../../context/UserPageContext';
import { WebContext } from '../../context/WebContext';

const UserHeader = () => {
    const { page, switchPage } = useContext(UserPageContext);
    const { user } = useContext(WebContext);

    return (
        <div className="user-page-header">
            <div className="user-info">
                <div className="user-image">
                    <img src="/images/user.png" />
                </div>
                <div className="user-reputations">
                    <h2>{user?.reputations}</h2>
                    <p>My Page</p>
                </div>
            </div>
            <div className="page-switches">

            </div>
        </div>
    );
}

export default UserHeader;