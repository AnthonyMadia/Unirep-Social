import { useState } from 'react';
import Dropdown from '../share/dropdown';
import { ChoiceType } from '../../constants';

const popularChoices = [
    ['most', 'fewest'],
    ['comments', 'reputation', 'votes'],
    ['today', 'this week', 'this month', 'this year', 'all time']
];

const timeChoices = [
    ['newest', 'oldest'],
    ['comments', 'posts']
];

const Feed = () => {
    
    const [isTime, setIsTime] = useState(false);
    const [popularFeed, setPopularFeed] = useState(['most', 'votes', 'today']);
    const [timeFeed, setTimeFeed] = useState(['newest', 'posts']);

    const onToggleSwitch = (event: any) => {
        if (event.target.checked === true) {
            setIsTime(true);
        } else {
            setIsTime(false);
        }
    }

    const onTapPopularFeed = (rowIndex: number, chosenIndex: number) => {
        setPopularFeed([...popularFeed].map((r, index) => index === rowIndex? popularChoices[rowIndex][chosenIndex] : r));
    }

    const onTapTimeFeed = (rowIndex: number, chosenIndex: number) => {
        setTimeFeed([...timeFeed].map((r, index) => index === rowIndex? timeChoices[rowIndex][chosenIndex] : r));
    }

    return (
        <div>
            Popular
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
                            <div className="dropdown-box">
                                <Dropdown 
                                    choices={choices} 
                                    type={ChoiceType.Feed}  
                                    onChoose={(value) => onTapTimeFeed(index, value)}
                                    defaultChoice={timeFeed[index]}
                                    key={'timeFeed' + index}
                                />
                            </div>
                        )}
                    </div>: 
                    <div className="dropdown-row">
                        {popularChoices.map((choices, index) => 
                            <div className="dropdown-box">
                                <Dropdown 
                                    choices={choices} 
                                    type={ChoiceType.Feed}  
                                    onChoose={(value) => onTapPopularFeed(index, value)}
                                    defaultChoice={popularFeed[index]}
                                    key={'popularFeed' + index}
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