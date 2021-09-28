import Jdenticon from 'react-jdenticon';
import { useState } from 'react';

import { ChoiceType } from '../../constants';
import './dropdown.scss';

type ChoiceProps = {
    type: ChoiceType,
    value: string,
    setState: () => void,
    upArrow: boolean,
    downArrow: boolean,
}

const Choice = (props: ChoiceProps) => {

    const doSetState = (event: any) => {
        event.stopPropagation();
        props.setState();
    }

    return (
        <div className="choice" onClick={doSetState}>
            {props.type === ChoiceType.Epk? <Jdenticon size="16" value={props.value} /> : <div></div>}
            <span>{props.value}</span>
            { props.upArrow? <img src="/images/arrow-up.png"/> : props.downArrow? <img src="/images/arrow-down.png"/> : <div></div>}
        </div>
    );
}

type Props = {
    type: ChoiceType,
    defaultChoice: string,
    choices: string[],
    onChoose: (value: any) => void,
}

const Dropdown = ({ type, defaultChoice, choices, onChoose }: Props) => {
    const [on, setOn] = useState(false);

    const switchDropdown = () => {
        setOn(!on);
    }

    const choose = (value: number) => {
        onChoose(value);
        setOn(false);
    }

    return (
        <div className="dropdown-field">
            <div className="dropdown-box">
                <Choice setState={switchDropdown} value={defaultChoice} type={type} upArrow={on? true:false} downArrow={on? false:true} />
                { on? <div className="divider"></div> : <div></div>}
                { on? 
                    <div>
                    {choices.map((choice, i) => <Choice setState={() => choose(i)} value={choice} type={type} upArrow={false} downArrow={false} key={choice} />)}
                    </div> : <div></div>
                }
            </div>
        </div>
    );
}

export default Dropdown;