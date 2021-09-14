import { createContext } from 'react';

type MainPageContent = {
    isPostFieldActive: boolean;
    setIsPostFieldActive: (value: boolean) => void;
    isPostFieldEpkDropdown: boolean;
    setIsPostFieldEpkDropdown: (value: boolean) => void;
    isUpVoteBoxOn: boolean;
    setIsUpVoteBoxOn: (value: boolean) => void;
    isDownVoteBoxOn: boolean;
    setIsDownVoteBoxOn: (value: boolean) => void;
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
});