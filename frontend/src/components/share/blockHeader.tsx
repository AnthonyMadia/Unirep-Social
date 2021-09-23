import { useContext } from 'react';
import Jdenticon from 'react-jdenticon';
import { Post, Comment, DataType, Page } from '../../constants';
import './blockHeader.scss';
import { MainPageContext } from '../../context/MainPageContext';
import { PostPageContext } from '../../context/PostPageContext';

type Props = {
    data: Post | Comment,
    page: Page,
}

const BlockHeader = ({ data, page }: Props) => {
    
    const { setIsMainPageUpVoteBoxOn, setIsMainPageDownVoteBoxOn, setMainPageVoteReceiver } = useContext(MainPageContext);
    const { setIsPostPageUpVoteBoxOn, setIsPostPageDownVoteBoxOn, setPostPageVoteReceiver } = useContext(PostPageContext);

    const setIsUpVoteBoxOn = (value: boolean) => {
        if (page === Page.Home) {
            setIsMainPageUpVoteBoxOn(value);
        } else if (page === Page.Post) {
            setIsPostPageUpVoteBoxOn(value);
        } else {
            console.error('no such page');
        }
    }

    const setIsDownVoteBoxOn = (value: boolean) => {
        if (page === Page.Home) {
            setIsMainPageDownVoteBoxOn(value);
        } else if (page === Page.Post) {
            setIsPostPageDownVoteBoxOn(value);
        } else {
            console.error('no such page');
        }
    }

    const setVoteReceiver = (value: Post|Comment|null) => {
        if (page === Page.Home) {
            setMainPageVoteReceiver(value);
        } else if (page === Page.Post) {
            setPostPageVoteReceiver(value);
        } else {
            console.error('no such page');
        }
    }

    const openUpvote = (event: any) => {
        event.stopPropagation();
        setIsUpVoteBoxOn(true);
        if (data.type === DataType.Post) {
            setVoteReceiver(data as Post);
        } else {
            setVoteReceiver(data as Comment);
        }
        
    }

    const openDownvote = (event: any) => {
        event.stopPropagation();
        setIsDownVoteBoxOn(true);
        if (data.type === DataType.Post) {
            setVoteReceiver(data as Post);
        } else {
            setVoteReceiver(data as Comment);
        }
    }

    return (
        <div className="block-header">
            <div className="epk-icon"><Jdenticon size="24" value={data.epoch_key} /></div>
            <div className="rep">{data.reputation}</div>
            <div className="epk">{data.epoch_key}</div>
            {
                data.isUpvoted? (
                    <div className="vote vote-purple"><img src="/images/upvote-purple.png"></img>{data.upvote}</div>
                ) : (
                    <div className="vote" onClick={openUpvote}><img src="/images/upvote.png"></img>{data.upvote}</div>
                )
            }
            {
                data.isDownvoted? (
                    <div className="vote vote-purple"><img src="/images/downvote-purple.png"></img>{data.downvote}</div>
                ) : (
                    <div className="vote" onClick={openDownvote}><img src="/images/downvote.png"></img>{data.downvote}</div>
                ) 
            }
        </div>
    );
}

export default BlockHeader;
