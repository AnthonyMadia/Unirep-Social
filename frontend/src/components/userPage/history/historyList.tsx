import { useState, useContext } from 'react';
import { History, ActionType } from '../../../constants';
import { WebContext } from '../../../context/WebContext';
import HistoryWidget from './history';

type Props = {
    histories: History[],
}

const HistoryList = ({ histories }: Props) => {
    const { user } = useContext(WebContext);
    const [expanded, setExpanded] = useState(false);
    const [netGain, setNetGain] = useState(() => { 
        let ret: number = 0;
        histories.forEach(h => ret = ret + h.upvote - h.downvote);
        return ret;
    });

    const switchExpansion = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="epoch-history">
            <div className="epoch-history-white">
                <div className="epoch-info" onClick={switchExpansion}>
                    <div className="info">
                        <label>Epoch</label>
                        <span>8/15/21 - 8/22/21</span>
                    </div>
                    <div className="info">
                        <label>Score</label>
                        <span>{user?.reputation}</span>
                    </div>
                    <div className="info">
                        <label>Net Gain</label>
                        <span><img src={netGain > 0? "/images/upvote-purple.png":"/images/downvote.png"}/>{netGain}</span>
                    </div>
                </div>
                { expanded? 
                    <div>
                        <div className="divider"></div>
                        <div className="list-title">Received</div>
                        { histories.map((history, i) => <HistoryWidget history={history} key={i}/>)}
                    </div> : <div></div>}
            </div>
        </div>
    );
}

export default HistoryList;