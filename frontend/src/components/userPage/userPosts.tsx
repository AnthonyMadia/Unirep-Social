import { useContext } from 'react';

import PostField from '../mainPage/postField';
import Feed from '../mainPage/feed';
import PostsList from '../mainPage/postsList';
import { WebContext } from '../../context/WebContext';

const UserPosts = () => {
    const { user, shownPosts } = useContext(WebContext); 
    const userPosts = user !== null? [...shownPosts].filter((p) => user.epoch_keys.find(epk => epk === p.epoch_key) !== undefined) : shownPosts;

    return (
        <div className="user-page-posts">
            <PostField />
            <h3>My Posts</h3>
            <Feed />
            <div className="post-list"><PostsList posts={userPosts} /></div>
        </div>
    );
}

export default UserPosts;