import Jdenticon from 'react-jdenticon';
import { Post } from '../../constants';
import './blockHeader.scss';

type Props = {
    post: Post,
    openUpvote: (event: any) => void,
    openDownvote: (event: any) => void,
}

const BlockHeader = (props: Props) => {
    return (
        <div className="block-header">
            <div className="epk-icon"><Jdenticon size="24" value={props.post.epoch_key} /></div>
            <div className="rep">{props.post.reputation}</div>
            <div className="epk">{props.post.epoch_key}</div>
            {
                props.post.isUpvoted? (
                    <div className="vote vote-purple"><img src="/images/upvote-purple.png"></img>{props.post.upvote}</div>
                ) : (
                    <div className="vote" onClick={props.openUpvote}><img src="/images/upvote.png"></img>{props.post.upvote}</div>
                )
            }
            {
                props.post.isDownvoted? (
                    <div className="vote vote-purple"><img src="/images/downvote-purple.png"></img>{props.post.downvote}</div>
                ) : (
                    <div className="vote" onClick={props.openDownvote}><img src="/images/downvote.png"></img>{props.post.downvote}</div>
                ) 
            }
        </div>
    );
}

export default BlockHeader;
