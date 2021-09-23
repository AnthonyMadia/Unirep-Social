import { useContext } from 'react';

import PostBlock from '../share/postBlock';
import { Post, Page } from '../../constants';
import { MainPageContext } from '../../context/MainPageContext';
import './mainPage.scss';

type Props = {
    posts: Post[],
}

const PostsList = ({ posts }: Props) => {
    const sortedPosts = posts.sort((a, b) => a.post_time > b.post_time? -1 : 1); // newest show upper
    const { setIsMainPageUpVoteBoxOn: setIsUpVoteBoxOn, setIsMainPageDownVoteBoxOn: setIsDownVoteBoxOn, setMainPageVoteReceiver: setVoteReceiver } = useContext(MainPageContext);

    return (
        <div>
            {sortedPosts.length > 0? (
                sortedPosts.map((post) => (
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