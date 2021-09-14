import { useState, useContext } from 'react';
import Jdenticon from 'react-jdenticon';
import dateformat from 'dateformat';

import { Post } from '../../constants';
import { vote, leaveComment, getUserState } from '../../utils';
import { WebContext } from '../../context/WebContext';
import { MainPageContext } from '../../context/MainPageContext';
import './mainPage.scss';


type Props = {
    post: Post,
}

const PostBlock = ({ post } : Props) => {

    const date = dateformat(new Date(post.post_time), "yyyy/m/dd TT h:MM");
    const [ showComment, setShowComment ] = useState(false);
    const [ comment, setComment ] = useState("");
    const { user, setUser, shownPosts, setShownPosts } = useContext(WebContext);
    const { setIsUpVoteBoxOn, setIsDownVoteBoxOn } = useContext(MainPageContext);
    const shownVoters = 4;

    const openUpvote = (event: any) => {
        event.stopPropagation();
        setIsUpVoteBoxOn(true);
    }

    const openDownvote = (event: any) => {
        event.stopPropagation();
        setIsDownVoteBoxOn(true);
    }

    const upvote = async () => {
        if (user === null) {
            console.error('user not login!');
        } else {
            const ret = await vote(user.identity, 1, undefined, post.id, post.epoch_key);
            console.log('upvote ret: ' + JSON.stringify(ret))
            const filteredPosts = shownPosts.filter((p) => p.id != post.id)
            
            const newVote = {
                upvote: 1,
                downvote: 0,
                epoch_key: user.epoch_keys[0],
            }

            post.vote = [...post.vote, newVote];
            post.upvote += 1;
            setShownPosts([post, ...filteredPosts]);

            const reputations = (await getUserState(user.identity)).userState.getRep();
            setUser({...user, reputations});
            setIsUpVoteBoxOn(false);
        }
    }

    const downvote = async () => {
        if (user === null) {
            console.error('user not login!');
        } else {
            const ret = await vote(user.identity, undefined, 1, post.id, post.epoch_key);
            console.log('downvote ret: ' + JSON.stringify(ret))
            const filteredPosts = shownPosts.filter((p) => p.id != post.id)
            
            const newVote = {
                upvote: 1,
                downvote: 0,
                epoch_key: user.epoch_keys[0],
            }
            post.vote = [...post.vote, newVote];
            post.downvote += 1;
            setShownPosts([post, ...filteredPosts]);

            const reputations = (await getUserState(user.identity)).userState.getRep();
            setUser({...user, reputations});
            setIsDownVoteBoxOn(false);
        }
    }

    const handleUserInput = (event: any) => {
        setComment(event.target.value);
    }

    const submitComment = async () => {
        if (user === null) {
            console.error('user not login!');
        } else {
            const ret = await leaveComment(user.identity, comment, post.id)
        }
    }

    const switchComment = () => {
        setShowComment((prevState) => !prevState);
    }

    return (
        <div className="post-block">
            <div className="post-block-header">
                <div className="epk-icon"><Jdenticon size="24" value={post.epoch_key} /></div>
                <div className="rep">{post.reputation}</div>
                <div className="epk">{post.epoch_key}</div>
                <div className="vote" onClick={openUpvote}><img src="/images/upvote.png"></img>{post.upvote}</div>
                <div className="vote" onClick={openDownvote}><img src="/images/downvote.png"></img>{post.downvote}</div>
            </div>
            <div className="post-block-main">
                <div className="post-block-info">
                    <div className="datetime-text">{date}</div>
                    <div className="post-share">
                        <img src="/images/share.png" />
                    </div>
                </div>
                <div className="post-text">{post.content}</div>
            </div>

            <div className='post-voters'>
                {
                    post.vote.slice(0, shownVoters).map((vote, index) => (
                        <div className="voter" key={vote.epoch_key + '-' + index}><Jdenticon size="19" value={vote.epoch_key} /></div>
                    ))
                }
                {
                    post.vote.length > shownVoters? <div className="voter-text">+{post.vote.length - shownVoters}</div> : <div></div>
                }
                <div className="voter-text voter-more">show</div>
            </div>
            { showComment? 
                <div>
                    <form>
                        <input type="text" name="userInput" placeholder="say something..." value={comment} onChange={handleUserInput} />
                    </form>
                    <div onClick={submitComment}>Comment</div>
                </div> : <div></div>
            }
        </div>
    );
};

export default PostBlock;