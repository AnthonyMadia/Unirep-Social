import React, { useContext, useState } from 'react';
import { WebContext } from '../../context/WebContext';
import { MainPageContext } from '../../context/MainPageContext';
import PostsList from './postsList';
import PostField from './postField';
import VoteBox from './voteBox';
import Feed from './feed';
import './mainPage.scss';

const MainPage = () => {

    const { shownPosts } = useContext(WebContext);

    const [isPostFieldActive, setIsPostFieldActive] = useState(false);
    const [isPostFieldEpkDropdown, setIsPostFieldEpkDropdown] = useState(false);
    const [isUpVoteBoxOn, setIsUpVoteBoxOn] = useState(false);
    const [isDownVoteBoxOn, setIsDownVoteBoxOn] = useState(false);

    const loadMorePosts = () => {
        // setShownPosts([...shownPosts, examplePost]);
        console.log("load more posts, now posts: " + shownPosts.length);
    }

    const closeAll = () => {
        setIsPostFieldActive(false);
        setIsPostFieldEpkDropdown(false);
        setIsUpVoteBoxOn(false);
        setIsDownVoteBoxOn(false);
    }

    return (
        <div className="default-gesture" onClick={closeAll}>
            <MainPageContext.Provider value={{
                    isPostFieldActive, setIsPostFieldActive, 
                    isPostFieldEpkDropdown, setIsPostFieldEpkDropdown, 
                    isUpVoteBoxOn, setIsUpVoteBoxOn, 
                    isDownVoteBoxOn, setIsDownVoteBoxOn}}>
                <div className="main-content">
                    <PostField />
                    <Feed />
                    <div className="post-list"><PostsList posts={shownPosts} /></div>
                    <div className="main-page-button" onClick={loadMorePosts}>Load More Posts</div>
                </div>
                { isUpVoteBoxOn? <VoteBox isUpvote={true} /> : isDownVoteBoxOn? <VoteBox isUpvote={false} /> : <div></div>}
            </MainPageContext.Provider>
        </div>
    );
};

export default MainPage;