import { useState, useContext } from 'react';
import { vote, getUserState } from '../../utils';
import { WebContext } from '../../context/WebContext';
import { MainPageContext } from '../../context/MainPageContext';
import { Post, Vote } from '../../constants';

type Props = {
    isUpvote: boolean,
    post: null|Post,
}
const VoteBox = (props: Props) => {

    const { user, setUser, shownPosts, setShownPosts } = useContext(WebContext);
    const { setIsUpVoteBoxOn, setIsDownVoteBoxOn, setVoteReceiver } = useContext(MainPageContext);
    const [ givenAmount, setGivenAmount ] = useState<undefined|number>(1);

    const init = () => {
        setIsUpVoteBoxOn(false);
        setIsDownVoteBoxOn(false);
        setVoteReceiver(null);
    }

    const doVote = () => {
        if (props.isUpvote) {
            upvote(); 
        } else {
            downvote();
        }
    }

    const upvote = async () => {
        if (user === null) {
            console.error('user not login!');
        } else if (props.post === null) {
            console.error('no post to attest!');
        } else if (givenAmount === undefined) {
            console.error('no enter any given amount');
        } else {
            const ret = await vote(user.identity, givenAmount, 0, props.post.id, props.post.epoch_key, 1);
            console.log('upvote ret: ' + JSON.stringify(ret))
            const filteredPosts = shownPosts.filter((p) => p.id != props.post?.id)
            
            const newVote: Vote = {
                upvote: givenAmount,
                downvote: 0,
                epoch_key: user.epoch_keys[0],
            }

            props.post.vote = [...props.post.vote, newVote];
            props.post.upvote += givenAmount;
            props.post.isUpvoted = true;
            setShownPosts([props.post, ...filteredPosts]);

            const reputations = (await getUserState(user.identity)).userState.getRep();
            setUser({...user, reputations});
            init();
        }
    }

    const downvote = async () => {
        if (user === null) {
            console.error('user not login!');
        } else if (props.post === null) {
            console.error('no post to attest!');
        } else if (givenAmount === undefined) {
            console.error('no enter any given amount');
        } else {
            const ret = await vote(user.identity, 0, givenAmount, props.post.id, props.post.epoch_key);
            console.log('downvote ret: ' + JSON.stringify(ret))
            const filteredPosts = shownPosts.filter((p) => p.id != props.post?.id)
            
            const newVote: Vote = {
                upvote: 0,
                downvote: givenAmount,
                epoch_key: user.epoch_keys[0],
            }
            props.post.vote = [...props.post.vote, newVote];
            props.post.downvote += givenAmount;
            props.post.isDownvoted = true;
            setShownPosts([props.post, ...filteredPosts]);

            const reputations = (await getUserState(user.identity)).userState.getRep();
            setUser({...user, reputations});
            init();
        }
    }

    const preventClose = (event: any) => {
        event.stopPropagation();
    }

    const handleUserInput = (event: any) => {
        if (event.target.value === '' || (event.target.value <= 10 && event.target.value >= 1)) {
            setGivenAmount(Number(event.target.value));
        }
    }

    return (
        <div className="vote-overlay">
            <div className="vote-box" onClick={preventClose}>
                <h3>{user?.reputations} Points Available</h3>
                <div className="vote-margin"></div>
                <p>Enter an amount up to 10 to give to @{props.post?.epoch_key}</p>
                <div className="vote-margin"></div>
                <input type="number" placeholder="max 10" onChange={handleUserInput} value={givenAmount} />
                <div className="vote-margin"></div>
                <div className="vote-button" onClick={doVote}>
                    {props.isUpvote? (<img src="/images/upvote-purple.png" />):(<img src="/images/downvote-purple.png" />)}
                    {props.isUpvote? (<p>Up Vote</p>):(<p>Down Vote</p>)}
                </div>
            </div>
        </div>
    );
}

export default VoteBox;