import BlockHeader from '../share/blockHeader';
import { Comment } from '../../constants';

type Props = {
    comment: Comment
}

const CommentBlock = (props: Props) => {
    return (
        <div className="comment">
            <BlockHeader data={props.comment} />
            <div className="divider" />
            <p>{props.comment.content}</p>
        </div>
    );
}

export default CommentBlock;