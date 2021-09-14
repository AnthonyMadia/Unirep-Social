import { createContext } from 'react';
import { Post } from '../constants';

type MainPageContent = {
    isPostFieldActive: boolean;
    setIsPostFieldActive: (value: boolean) => void;
    isPostFieldEpkDropdown: boolean;
    setIsPostFieldEpkDropdown: (value: boolean) => void;
    isUpVoteBoxOn: boolean;
    setIsUpVoteBoxOn: (value: boolean) => void;
    isDownVoteBoxOn: boolean;
    setIsDownVoteBoxOn: (value: boolean) => void;
    voteReceiver: null | Post;
    setVoteReceiver: (value: null|Post) => void;
}

export const MainPageContext = createContext<MainPageContent>({
    isPostFieldActive: false,
    setIsPostFieldActive: () => {},
    isPostFieldEpkDropdown: false,
    setIsPostFieldEpkDropdown: () => {},
    isUpVoteBoxOn: false,
    setIsUpVoteBoxOn: () => {},
    isDownVoteBoxOn: false,
    setIsDownVoteBoxOn: () => {},
    voteReceiver: null,
    setVoteReceiver: () => {},
});