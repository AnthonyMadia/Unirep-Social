import { useState, useContext } from 'react';
import Jdenticon from 'react-jdenticon';
import dateformat from 'dateformat';

import { Post } from '../../constants';
import { MainPageContext } from '../../context/MainPageContext';
import VotersList from './votersList';
import CommentField from './commentField';
import BlockHeader from '../share/blockHeader';
import './mainPage.scss';


type Props = {
    post: Post,
}

const PostBlock = ({ post } : Props) => {

    const date = dateformat(new Date(post.post_time), "yyyy/m/dd TT h:MM");
    const [ showComment, setShowComment ] = useState(false);
    const [ isVotersListOn, setIsVotersListOn ] = useState(false);
    const { setIsUpVoteBoxOn, setIsDownVoteBoxOn, setVoteReceiver } = useContext(MainPageContext);
    const shownVoters = 4;

    const openUpvote = (event: any) => {
        event.stopPropagation();
        setIsUpVoteBoxOn(true);
        setVoteReceiver(post);
    }

    const openDownvote = (event: any) => {
        event.stopPropagation();
        setIsDownVoteBoxOn(true);
        setVoteReceiver(post);
    }

    const switchVotersList = (event: any) => {
        event.stopPropagation();
        if (isVotersListOn) {
            setIsVotersListOn(false);
        } else {
            setIsVotersListOn(true);
        }
    }

    const switchComment = () => {
        setShowComment((prevState) => !prevState);
    }

    return (
        <div className="post-block">
            <BlockHeader 
                post={post}
                openUpvote={openUpvote}
                openDownvote={openDownvote}
            />
            <div className="post-block-main">
                <div className="post-block-info">
                    <div className="datetime-text">{date}</div>
                    <div className="post-share">
                        <img src="/images/share.png" />
                    </div>
                </div>
                <div className="post-text">{post.content}</div>
            </div>

            <div className='post-voters' onClick={switchVotersList}>
                {
                    post.vote.slice(0, shownVoters).map((vote, index) => (
                        <div className="voter" key={vote.epoch_key + '-' + index}><Jdenticon size="19" value={vote.epoch_key} /></div>
                    ))
                }
                {
                    post.vote.length > shownVoters? <div className="voter-text">+{post.vote.length - shownVoters}</div> : <div></div>
                }
                <div className="voter-text voter-more">{isVotersListOn? "hide" : "show"}</div>
            </div>
            { isVotersListOn? 
                <VotersList votes={post.vote}/> : <div></div>
            }
            <div className="comment-block">
                <div className={showComment? "comment-btn without-bottom" : "comment-btn"} onClick={switchComment}>
                    <img src="/images/comment.png"/>
                    <span>Comment</span>
                </div>
                { showComment? 
                    <CommentField post={post} closeComment={() => setShowComment(false)}/> : <div></div>
                }
            </div>
        </div>
    );
};

export default PostBlock;