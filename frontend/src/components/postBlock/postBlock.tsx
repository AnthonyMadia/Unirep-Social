import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Jdenticon from 'react-jdenticon';
import dateformat from 'dateformat';

import { Post, Page } from '../../constants';
import VotersList from './votersList';
import CommentField from './commentField';
import CommentBlock from './commentBlock';
import BlockHeader from '../share/blockHeader';
import './postBlock.scss';


type Props = {
    post: Post,
    page: Page,
}

const PostBlock = ({ post, page } : Props) => {

    const history = useHistory();

    const date = dateformat(new Date(post.post_time), "yyyy/m/dd TT h:MM");
    const [ showComment, setShowComment ] = useState(false);
    const [ isVotersListOn, setIsVotersListOn ] = useState(false);
    const shownVoters = 4;

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
                data={post}
                page={page}
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
            { post.comments.length > 0? 
                <div className="comments-list">
                    {
                        page === Page.Home? (
                            <div>
                                <CommentBlock comment={post.comments[0]} page={page} />
                                <div className="view-more-comments" onClick={() => history.push(`/post/${post.id}`)}>View more comments</div>
                            </div>
                        ) : post.comments.map(comment => (<CommentBlock comment={comment} key={comment.id} page={page} />))
                    }
                </div> : <div></div>
            }
        </div>
    );
};

export default PostBlock;