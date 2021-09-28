import { useContext } from 'react';
import { UserPageContext } from '../../context/UserPageContext';
import { WebContext } from '../../context/WebContext';
import { UserPageType } from '../../constants';

const UserHeader = () => {
    const { page, switchPage } = useContext(UserPageContext);
    const { user } = useContext(WebContext);
    const pageSwitches = [UserPageType.Posts, UserPageType.History, UserPageType.Settings];

    return (
        <div className="user-page-header">
            <div className="user-info">
                <div className="user-image">
                    <img src="/images/user.png" />
                </div>
                <div className="user-reputations">
                    <h2>{user?.reputation}</h2>
                    <p>My Page</p>
                </div>
            </div>
            <div className="page-switches">
                { pageSwitches.map(p => <div className={p === page? "switch chosen":"switch"} key={p} onClick={() => switchPage(p)}>{p}</div>)}
            </div>
        </div>
    );
}

export default UserHeader;