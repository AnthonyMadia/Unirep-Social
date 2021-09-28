import { createContext } from 'react';
import { UserPageType } from '../constants';

type UserPageContent = {
    page: UserPageType,
    switchPage: (page: UserPageType) => void,
}

export const UserPageContext = createContext<UserPageContent>({
    page: UserPageType.Posts,
    switchPage: () => {},
});