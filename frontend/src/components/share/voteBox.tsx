import { useState, useContext } from 'react';
import { vote, getUserState } from '../../utils';
import { WebContext } from '../../context/WebContext';
import { MainPageContext } from '../../context/MainPageContext';
import { Post, Vote, Comment, DataType } from '../../constants';
import './voteBox.scss';

type Props = {
    isUpvote: boolean,
    data: Post|Comment,
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

    const doVote = async () => {
        if (user === null) {
            console.error('user not login!');
        } else if (givenAmount === undefined) {
            console.error('no enter any given amount');
        } else {
            let ret: any;
            if (props.isUpvote) {
                ret = await vote(user.identity, givenAmount, 0, props.data.id, props.data.epoch_key, 1);
                console.log('upvote ret: ' + JSON.stringify(ret))
            } else {
                ret = await vote(user.identity, 0, givenAmount, props.data.id, props.data.epoch_key, 1);
                console.log('downvote ret: ' + JSON.stringify(ret))
            }

            const newVote: Vote = {
                upvote: props.isUpvote? givenAmount:0,
                downvote: props.isUpvote? 0:givenAmount,
                epoch_key: user.epoch_keys[0],
            }
            let v = [...props.data.vote, newVote];
            if (props.data.type === DataType.Post) {
                const filteredPosts = shownPosts.filter((p) => p.id != props.data.id)
                let p: Post = {...(props.data as Post), 
                    upvote: props.isUpvote? props.data.downvote + givenAmount : 0,
                    downvote: props.isUpvote? 0 : props.data.downvote + givenAmount, 
                    isUpvoted: props.isUpvote, 
                    isDownvoted: !props.isUpvote, 
                    vote: v
                };
                setShownPosts([p, ...filteredPosts]);
            } else if (props.data.type === DataType.Comment) {
                const selectedPost = shownPosts.filter((p) => p.id === (props.data as Comment).post_id);
                if (selectedPost.length > 1) {
                    console.log('error!!!! selecte post of comment is not single!');
                }
                const filteredPosts = shownPosts.filter((p) => p.id !== (props.data as Comment).post_id);
                const filteredComment = selectedPost[0].comments.filter((c) => c.id !== props.data.id);
                let c: Comment = {...(props.data as Comment), 
                    upvote: props.isUpvote? props.data.downvote + givenAmount : 0,
                    downvote: props.isUpvote? 0 : props.data.downvote + givenAmount, 
                    isUpvoted: props.isUpvote, 
                    isDownvoted: !props.isUpvote, 
                    vote: v
                };
                let p: Post = {...selectedPost[0], comments: [c, ...filteredComment]}
                setShownPosts([p, ...filteredPosts]);
            }
            
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
                <p>Enter an amount up to 10 to give to @{props.data.epoch_key}</p>
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