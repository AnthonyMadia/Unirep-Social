import { useState, useContext } from 'react';
import { History, ActionType } from '../../../constants';
import { WebContext } from '../../../context/WebContext';
import HistoryList from './historyList';
import './userHistory.scss';

const UserHistory = () => {
    const { user } = useContext(WebContext);
    const [ histories, setHistories ] = useState<History[]>([
        {
            action: ActionType.Post,
            epoch_key: '7ad8a817',
            upvote: 0, 
            downvote: 5,
            epoch: 0,
            time: 1632856173370,
        }, {
            action: ActionType.Vote,
            epoch_key: 'a67bdd93',
            upvote: 3, 
            downvote: 0,
            epoch: 0,
            time: 1632992149530,
        }, {
            action: ActionType.UST,
            epoch_key: 'UniRep',
            upvote: 20, 
            downvote: 0,
            epoch: 1,
            time: 1633010400000,
        }, {
            action: ActionType.Comment,
            epoch_key: '8deb19b0',
            upvote: 0, 
            downvote: 3,
            epoch: 1,
            time: 1633010600000,
        }
    ]); 

    const getHistoryByEpoch = (epoch: number) => {
        /// actually will interact with server or contract ///
        return histories.filter(history => history.epoch === epoch);
    }

    return (
        <div className="user-page-main-content">
            {
                user !== null? 
                    Array.from(Array(user.current_epoch + 1).keys()).map(i => <HistoryList histories={getHistoryByEpoch(i)} />) 
                    : <div></div>
            }
        </div>
    );
}

export default UserHistory;