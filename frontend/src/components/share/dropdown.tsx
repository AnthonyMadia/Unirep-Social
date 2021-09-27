import Jdenticon from 'react-jdenticon';
import { useState } from 'react';

import { ChoiceType } from '../../constants';
import './dropdown.scss';

type ChoiceProps = {
    type: ChoiceType,
    value: string,
    setState: () => void,
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
                <Choice setState={switchDropdown} value={defaultChoice} type={type} />
                { on? <div className="divider"></div> : <div></div>}
                { on? 
                    <div>
                    {choices.map((choice, i) => <Choice setState={() => choose(i)} value={choice} type={type} key={choice} />)}
                    </div> : <div></div>
                }
            </div>
        </div>
    );
}

export default Dropdown;