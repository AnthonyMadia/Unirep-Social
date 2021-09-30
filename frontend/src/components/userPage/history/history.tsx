import Jdenticon from 'react-jdenticon';
import dateformat from 'dateformat';
import { History, ActionType } from '../../../constants';

type Props = {
    history: History
}

const HistoryWidget = ({ history } : Props) => {

    const date = dateformat(new Date(history.time), "mmm dd @ hh:MM TT");

    const getActionWidget = () => {
        if (history.action === ActionType.UST) {
            return (
                <div className="info"><img src="/images/ust.png" />UST</div>
            );
        } else if (history.action === ActionType.Post) {
            return (
                <div className="info"><img src="/images/post.png" />Post</div>
            );
        } else if (history.action === ActionType.Comment) {
            return (
                <div className="info"><img src="/images/comment.png" />Comment</div>
            );
        } else if (history.action === ActionType.Vote) {
            return (
                <div className="info"><img src="/images/vote.png" />Vote</div>
            );
        } else {
            return (<div></div>);
        }
    }

    return (
        <div className="history-widget">
            <div className="info">{date}</div>
            {getActionWidget()}
            <div className="info">
                <div className="epoch-key">
                    { history.epoch_key === 'UniRep'? <img src="/images/unirep.png" /> : <Jdenticon size="16" value={history.epoch_key} />}
                </div>
                {history.epoch_key}
            </div>
            <div className="info">
                { history.upvote > 0? <img src="/images/upvote-purple.png"/> : <img src="/images/downvote.png" />}
                { history.upvote > 0? history.upvote : history.downvote }
            </div>
        </div>
    );
}

export default HistoryWidget;