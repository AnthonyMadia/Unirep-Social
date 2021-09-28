import { useContext } from 'react';

import PostBlock from '../postBlock/postBlock';
import { Post, Page } from '../../constants';
import './postsList.scss';

type Props = {
    posts: Post[],
}

const PostsList = ({ posts }: Props) => {
    return (
        <div>
            {posts.length > 0? (
                posts.map((post) => (
                    <PostBlock 
                        key={post.id} 
                        post={post} 
                        page={Page.Home}
                    />
                ))
            ) : <p>No posts are available.</p>}
        </div>
    );
}

export default PostsList;