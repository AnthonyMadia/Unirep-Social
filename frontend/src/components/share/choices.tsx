import Jdenticon from 'react-jdenticon';

type Props = {
    className: string,
    value: string,
    setState: (value: string) => void,
}

const Choice = (props: Props) => {

    const doSetState = (event: any) => {
        event.stopPropagation();
        props.setState(props.value);
    }

    return (
        <div className={props.className} onClick={doSetState}>
            <Jdenticon size="16" value={props.value} />
            <span>{props.value}</span>
        </div>
    );
}

export default Choice;