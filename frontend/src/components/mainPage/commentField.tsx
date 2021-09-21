import { leaveComment } from '../../utils';
import { WebContext } from '../../context/WebContext';
import { useState, useContext } from 'react';
import { Post } from '../../constants';
import WritingField from '../share/writingField';
import { DEFAULT_COMMENT_KARMA } from '../../config';

type Props = {
    post: Post,
}

const CommentField = (props: Props) => {
    const [ comment, setComment ] = useState("");
    const [ isEpkDropdown, setIsEpkDropdown] = useState(false);
    const [ epkNonce, setEpkNonce ] = useState(0); 
    const [ reputation, setReputation ] = useState(DEFAULT_COMMENT_KARMA); 
    const { user } = useContext(WebContext);

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
            const ret = await leaveComment(user.identity, comment, props.post.id)
        }
    }

    return (
        <div className="comment-field">
            <WritingField 
                setIsDropdown={setIsEpkDropdown}
                handleUserInput={handleUserInput}
                isDropdown={isEpkDropdown}
                epkNonce={epkNonce}
                changeEpk={setEpkNonce}
                changeRep={setReputation}
                submit={submitComment} 
                submitBtnName="Comment"
                onClick={preventPropagation}
            />
        </div>
    );
}

export default CommentField;