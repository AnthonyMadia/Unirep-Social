import { useState, useContext }  from 'react';
import Jdenticon from 'react-jdenticon';
import { WebContext } from '../../context/WebContext';
import Choice from './choices';
import './writingField.scss';

type Props = {
    setIsDropdown: (isDropdown: boolean) => void,
    handleUserInput: (event: any) => void,
    isDropdown: boolean,
    epkNonce: number,
    changeEpk: (epkNonce: number) => void,
    changeRep: (reputation: number) => void,
    submit: () => void,
    onClick: (event: any) => void,
}

const WritingField = (props: Props) => {

    const { user } = useContext(WebContext);

    const switchDropdown = (event: any) => {
        props.onClick(event);
        props.setIsDropdown(!props.isDropdown);
    }

    const changeReputation = (event: any) => {
        props.changeRep(event.target.value);
    }

    const onClickField = (event: any) => {
        props.onClick(event);
        props.setIsDropdown(false);
    }

    return (
        <div className="writing-field" onClick={onClickField}>
            <textarea name="userInput" placeholder="Share something!" onChange={props.handleUserInput}></textarea>
            <div className="setting-area">
                <div className="setting-epk">
                    <label>Select an Epoch Key to display with your post <span>?</span></label>
                    {props.isDropdown? <div className="epk-dropdown">
                        <div className="epk" onClick={switchDropdown}>
                            <Jdenticon size="16" value={user?.epoch_keys[props.epkNonce]} />
                            <span>{props.epkNonce >= 0? user?.epoch_keys[props.epkNonce] : 'Choose an epock key'}</span>
                            <img src="/images/arrow-down.png"/>
                        </div>
                        <div className="divider"></div>
                        {
                            user?.epoch_keys.map((epk, index) => (
                                <Choice className="epk" key={epk} setState={() => props.changeEpk(index)} value={user.epoch_keys[index]}/>
                            ))
                        }
                    </div> : <div className="epk epk-with-border" onClick={switchDropdown}>
                        <Jdenticon size="16" value={user?.epoch_keys[props.epkNonce]} />
                        <span>{props.epkNonce >= 0? user?.epoch_keys[props.epkNonce] : 'Choose an epock key'}</span>
                        <img src="/images/arrow-down.png"/>
                    </div>}
                </div>
                <div className="setting-reputation">
                    <label>Reputation Score <span>?</span></label>
                    <br/>
                    <textarea name="repInput" placeholder="Enter a number between 10-xxx" onChange={changeReputation}></textarea>
                </div>
            </div>
            <div className="submit-btn" onClick={props.submit}>
                Post
            </div>
        </div>
    );
}

export default WritingField;