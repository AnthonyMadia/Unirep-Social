import { useState, useContext } from 'react';
import Jdenticon from 'react-jdenticon';
import dateformat from 'dateformat';

import { Post } from '../../constants';
import { vote, leaveComment } from '../../utils';
import { WebContext } from '../../context/WebContext';
import './mainPage.scss';


type Props = {
    post: Post,
}

const PostBlock = ({ post } : Props) => {

    const date = dateformat(new Date(post.post_time), "yyyy/m/dd TT h:MM");
    const [ showComment, setShowComment ] = useState(false);
    const [ comment, setComment ] = useState("");
    const { user, shownPosts, setShownPosts } = useContext(WebContext);

    const upvote = async () => {
        if (user === null) {
            console.error('user not login!');
        } else {
            const ret = await vote(user.identity, 1, undefined, post.id, post.epoch_key);
            console.log('upvote ret: ' + JSON.stringify(ret))
            const filteredPosts = shownPosts.filter((p) => p.id != post.id)
            post.upvote += 1
            setShownPosts([post, ...filteredPosts])
        }
    }

    const downvote = async () => {
        if (user === null) {
            console.error('user not login!');
        } else {
            const ret = await vote(user.identity, undefined, 1, post.id, post.epoch_key);
            console.log('downvote ret: ' + JSON.stringify(ret))
            const filteredPosts = shownPosts.filter((p) => p.id != post.id)
            post.downvote += 1
            setShownPosts([post, ...filteredPosts])
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
                <Jdenticon size="24" value={post.epoch_key} />
                <div className="rep">{post.reputation}</div>
                <div className="epk">{post.epoch_key}</div>
                <div className="vote" onClick={upvote}><img src="/images/upvote.png"></img>{post.upvote}</div>
                <div className="vote" onClick={downvote}><img src="/images/downvote.png"></img>{post.downvote}</div>
            </div>
            <div className="post-block-main">
                <div className="post-block-info">
                    <div className="datetime-text">{date}</div>
                    <div className="post-share">
                        <img src="/images/share.png"/>
                    </div>
                </div>
                <div className="post-text">{post.content}</div>
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