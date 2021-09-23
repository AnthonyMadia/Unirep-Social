import BlockHeader from '../share/blockHeader';
import { Comment, Page } from '../../constants';

type Props = {
    comment: Comment
    page: Page,
}

const CommentBlock = (props: Props) => {
    return (
        <div className="comment">
            <BlockHeader data={props.comment} page={props.page} />
            <div className="divider" />
            <p>{props.comment.content}</p>
        </div>
    );
}

export default CommentBlock;