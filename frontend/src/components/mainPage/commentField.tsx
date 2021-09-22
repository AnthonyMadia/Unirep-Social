import { leaveComment, getUserState } from '../../utils';
import { WebContext } from '../../context/WebContext';
import { useState, useContext } from 'react';
import { Post, Comment, DataType } from '../../constants';
import WritingField from '../share/writingField';
import { DEFAULT_COMMENT_KARMA } from '../../config';

type Props = {
    post: Post,
    closeComment: () => void,
}

const CommentField = (props: Props) => {
    const [ comment, setComment ] = useState("");
    const [ isEpkDropdown, setIsEpkDropdown] = useState(false);
    const [ epkNonce, setEpkNonce ] = useState(0); 
    const [ reputation, setReputation ] = useState(DEFAULT_COMMENT_KARMA); 
    const { user, setUser, shownPosts, setShownPosts } = useContext(WebContext);

    const handleUserInput = (event: any) => {
        setComment(event.target.value);
    }

    const preventPropagation = (event: any) => {
        event.stopPropagation();
    }

    const submitComment = async () => {
        if (user === null) {
            console.error('user not login!');
        } else {
            const ret = await leaveComment(user.identity, comment, props.post.id, epkNonce)
            if (ret !== undefined) {
                let c: Comment = {
                    type: DataType.Comment,
                    id: ret.commentId,
                    post_id: props.post.id,
                    content: comment,
                    vote: [],
                    upvote: 0,
                    downvote: 0,
                    isUpvoted: false,
                    isDownvoted: false,
                    epoch_key: ret.epk,
                    username: 'username',
                    post_time: Date.now(),
                    reputation,
                };
                const filteredPosts = shownPosts.filter((p) => p.id != props.post?.id)
                let comments = props.post.comments.length > 0? [...props.post.comments, c] : [c];
                let p = {...props.post, comments};

                setShownPosts([p, ...filteredPosts]);
                const rep = (await getUserState(user.identity)).userState.getRep();
                setUser({...user, reputations: rep})

                props.closeComment();
            } else {
                console.log(ret);
            }
        }
    }

    const setEpk = (epk: number) => {
        setEpkNonce(epk);
        setIsEpkDropdown(false);
    }

    return (
        <div className="comment-field">
            <WritingField 
                setIsDropdown={setIsEpkDropdown}
                handleUserInput={handleUserInput}
                isDropdown={isEpkDropdown}
                epkNonce={epkNonce}
                changeEpk={setEpk}
                changeRep={setReputation}
                submit={submitComment} 
                submitBtnName="Comment"
                onClick={preventPropagation}
            />
        </div>
    );
}

export default CommentField;