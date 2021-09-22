import { useContext } from 'react';
import { MainPageContext } from '../../context/MainPageContext';
import Jdenticon from 'react-jdenticon';
import { Post, Comment, DataType } from '../../constants';
import './blockHeader.scss';

type Props = {
    data: Post | Comment
}

const BlockHeader = (props: Props) => {

    const { setIsUpVoteBoxOn, setIsDownVoteBoxOn, setVoteReceiver } = useContext(MainPageContext);

    const openUpvote = (event: any) => {
        event.stopPropagation();
        setIsUpVoteBoxOn(true);
        if (props.data.type === DataType.Post) {
            setVoteReceiver(props.data as Post);
        } else {
            setVoteReceiver(props.data as Comment);
        }
        
    }

    const openDownvote = (event: any) => {
        event.stopPropagation();
        setIsDownVoteBoxOn(true);
        if (props.data.type === DataType.Post) {
            setVoteReceiver(props.data as Post);
        } else {
            setVoteReceiver(props.data as Comment);
        }
    }

    return (
        <div className="block-header">
            <div className="epk-icon"><Jdenticon size="24" value={props.data.epoch_key} /></div>
            <div className="rep">{props.data.reputation}</div>
            <div className="epk">{props.data.epoch_key}</div>
            {
                props.data.isUpvoted? (
                    <div className="vote vote-purple"><img src="/images/upvote-purple.png"></img>{props.data.upvote}</div>
                ) : (
                    <div className="vote" onClick={openUpvote}><img src="/images/upvote.png"></img>{props.data.upvote}</div>
                )
            }
            {
                props.data.isDownvoted? (
                    <div className="vote vote-purple"><img src="/images/downvote-purple.png"></img>{props.data.downvote}</div>
                ) : (
                    <div className="vote" onClick={openDownvote}><img src="/images/downvote.png"></img>{props.data.downvote}</div>
                ) 
            }
        </div>
    );
}

export default BlockHeader;
