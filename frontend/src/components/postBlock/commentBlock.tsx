import BlockHeader from '../share/blockHeader';
import { Comment, Page } from '../../constants';
import dateformat from 'dateformat';

type Props = {
    comment: Comment
    page: Page,
}

const CommentBlock = ({comment, page}: Props) => {
    const date = dateformat(new Date(comment.post_time), "yyyy/m/dd TT h:MM");

    return (
        <div className="comment">
            <BlockHeader data={comment} page={page} />
            <div className="divider" />
            <div className="datetime-text">{date}</div>
            <p>{comment.content}</p>
        </div>
    );
}

export default CommentBlock;