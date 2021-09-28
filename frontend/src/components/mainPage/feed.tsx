import { useState, useContext } from 'react';
import { WebContext } from '../../context/WebContext';
import Dropdown from '../share/dropdown';
import { ChoiceType, Post } from '../../constants';

const popularChoices = [
    ['most', 'fewest'],
    ['comments', 'reputation', 'votes', 'up votes'],
    ['today', 'this week', 'this month', 'this year', 'all time']
];

const text2Days = [1, 7, 30, 365, 365000];

const timeChoices = [
    ['newest', 'oldest'],
    ['comments', 'posts']
];

const Feed = () => {
    
    const { shownPosts, setShownPosts } = useContext(WebContext);

    const [isTime, setIsTime] = useState(false);
    const [popularFeed, setPopularFeed] = useState([0, 2, 0]);
    const [timeFeed, setTimeFeed] = useState([0, 1]);

    const onToggleSwitch = (event: any) => {
        if (event.target.checked === true) {
            setIsTime(true);
        } else {
            setIsTime(false);
        }
    }

    const diffDays = (date: number, otherDate: number) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

    const sort = (feed: any) => {
        let sortedPosts: Post[] = shownPosts;
        if (isTime) { /// sort by time
            if (feed[1] === 1) { /// sort by posts
                if (feed[0] == 0) {
                    sortedPosts = [...shownPosts].sort((a, b) => a.post_time > b.post_time? -1 : 1);
                } else {
                    sortedPosts = [...shownPosts].sort((a, b) => a.post_time < b.post_time? -1 : 1);
                }
            } else { /// sort by comments
                if (feed[0] === 0) {
                    sortedPosts = [...shownPosts].sort((a, b) => 
                        (a.comments.length > 0? a.comments[0].post_time:a.post_time) > 
                        (b.comments.length > 0? b.comments[0].post_time:b.post_time)? -1 : 1);
                } else {
                    sortedPosts = [...shownPosts].sort((a, b) => 
                        (a.comments.length > 0? a.comments[0].post_time:a.post_time) < 
                        (b.comments.length > 0? b.comments[0].post_time:b.post_time)? -1 : 1);
                }
            }
        } else { /// sort by popularity
            // get posts in right time, then sort that part, then sort the remaining according to time
            const today = Date.now();
            const filteredPosts = shownPosts.filter((p) => diffDays(today, p.post_time) <= text2Days[feed[2]]);
            const otherPosts = shownPosts.filter((p) => diffDays(today, p.post_time) > text2Days[feed[2]]);
            otherPosts.sort((a, b) => a.post_time > b.post_time? -1 : 1);

            if (feed[1] === 0) { /// sort by comments count
                if (feed[0] === 0) {
                    filteredPosts.sort((a, b) => a.comments.length > b.comments.length? -1 : 1);
                } else {
                    filteredPosts.sort((a, b) => a.comments.length < b.comments.length? -1 : 1);
                }
            } else if (feed[1] === 1) { /// sort by rep
                if (feed[0] === 0) {
                    filteredPosts.sort((a, b) => a.reputation > b.reputation? -1 : 1);
                } else {
                    filteredPosts.sort((a, b) => a.reputation < b.reputation? -1 : 1);
                }
            } else if (feed[1] === 2) { /// sort by vote count
                if (feed[0] === 0) {
                    filteredPosts.sort((a, b) => a.vote.length > b.vote.length? -1 : 1);
                } else {
                    filteredPosts.sort((a, b) => a.vote.length < b.vote.length? -1 : 1);
                }
            } else { /// sort by up vote
                if (feed[0] === 0) {
                    filteredPosts.sort((a, b) => a.upvote > b.upvote? -1 : 1);
                } else {                
                    filteredPosts.sort((a, b) => a.upvote < b.upvote? -1 : 1);
                }
            }

            sortedPosts = [...filteredPosts, ...otherPosts];
        }
        setShownPosts(sortedPosts);
    }

    const onTapPopularFeed = (rowIndex: number, chosenIndex: number) => {
        const newPopularFeed = [...popularFeed].map((originalIndex, n) => n === rowIndex? chosenIndex : originalIndex);
        setPopularFeed(newPopularFeed);
        sort(newPopularFeed);
    }

    const onTapTimeFeed = (rowIndex: number, chosenIndex: number) => {
        const newTimeFeed = [...timeFeed].map((originalIndex, n) => n === rowIndex? chosenIndex : originalIndex);
        setTimeFeed(newTimeFeed);
        sort(newTimeFeed);
    }

    return (
        <div>
            {/* Popular */}
            <div className="feed-row">
                <div className="toggle-switch">
                    <label className="switch">
                        <input type="checkbox" defaultChecked={isTime} onChange={onToggleSwitch}/>
                        <span className="slider round"></span>
                        <img className="diamond" src="/images/diamond.png" />
                        <img className="clock" src="/images/clock.png" />
                    </label>
                </div>
                { isTime? 
                    <div className="dropdown-row">
                        {timeChoices.map((choices, index) => 
                            <div className="dropdown-box" key={'timeFeed' + index}>
                                <Dropdown 
                                    choices={choices} 
                                    type={ChoiceType.Feed}  
                                    onChoose={(value) => onTapTimeFeed(index, value)}
                                    defaultChoice={timeChoices[index][timeFeed[index]]}
                                />
                            </div>
                        )}
                    </div>: 
                    <div className="dropdown-row">
                        {popularChoices.map((choices, index) => 
                            <div className="dropdown-box" key={'popularFeed' + index}>
                                <Dropdown 
                                    choices={choices} 
                                    type={ChoiceType.Feed}  
                                    onChoose={(value) => onTapPopularFeed(index, value)}
                                    defaultChoice={popularChoices[index][popularFeed[index]]}
                                />
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}

export default Feed;