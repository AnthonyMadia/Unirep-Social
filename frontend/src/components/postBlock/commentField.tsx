import { leaveComment, getUserState } from '../../utils';
import { WebContext } from '../../context/WebContext';
import { useState, useContext } from 'react';
import { Post, Comment, DataType } from '../../constants';
import WritingField from '../share/writingField';

type Props = {
    post: Post,
    closeComment: () => void,
}

const CommentField = (props: Props) => {
    const [ epkNonce, setEpkNonce ] = useState(0);
    const { user, setUser, shownPosts, setShownPosts } = useContext(WebContext);

    const preventPropagation = (event: any) => {
        event.stopPropagation();
    }

    const submitComment = async (reputation: number, content: string) => {
        if (user === null) {
            console.error('user not login!');
        } else if (content.length === 0) {
            console.error('nothing happened, no input.')
        } else {
            const ret = await leaveComment(user.identity, content, props.post.id, epkNonce)
            if (ret !== undefined) {
                let c: Comment = {
                    type: DataType.Comment,
                    id: ret.commentId,
                    post_id: props.post.id,
                    content,
                    vote: [],
                    upvote: 0,
                    downvote: 0,
                    isUpvoted: false,
                    isDownvoted: false,
                    epoch_key: user.epoch_keys[epkNonce],
                    username: 'username',
                    post_time: Date.now(),
                    reputation,
                };
                const filteredPosts = shownPosts.filter((p) => p.id != props.post?.id)
                let comments = props.post.comments.length > 0? [c, ...props.post.comments] : [c];
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
    }

    return (
        <div className="comment-field">
            <WritingField
                type={DataType.Comment} 
                epkNonce={epkNonce}
                changeEpk={setEpk}
                submit={submitComment} 
                submitBtnName="Comment"
                onClick={preventPropagation}
            />
        </div>
    );
}

export default CommentField;