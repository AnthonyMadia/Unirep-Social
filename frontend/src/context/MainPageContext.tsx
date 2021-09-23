import { createContext } from 'react';
import { Post } from '../constants';

type MainPageContent = {
    isPostFieldActive: boolean;
    setIsPostFieldActive: (value: boolean) => void;
    isPostFieldEpkDropdown: boolean;
    setIsPostFieldEpkDropdown: (value: boolean) => void;
    isMainPageUpVoteBoxOn: boolean;
    setIsMainPageUpVoteBoxOn: (value: boolean) => void;
    isMainPageDownVoteBoxOn: boolean;
    setIsMainPageDownVoteBoxOn: (value: boolean) => void;
    mainPageVoteReceiver: null | Post | Comment;
    setMainPageVoteReceiver: (value: any) => void;
}

export const MainPageContext = createContext<MainPageContent>({
    isPostFieldActive: false,
    setIsPostFieldActive: () => {},
    isPostFieldEpkDropdown: false,
    setIsPostFieldEpkDropdown: () => {},
    isMainPageUpVoteBoxOn: false,
    setIsMainPageUpVoteBoxOn: () => {},
    isMainPageDownVoteBoxOn: false,
    setIsMainPageDownVoteBoxOn: () => {},
    mainPageVoteReceiver: null,
    setMainPageVoteReceiver: () => {},
});