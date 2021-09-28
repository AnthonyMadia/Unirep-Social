export const pageStatusKey = "pageStatus";
export const userKey = "user";
export const shownPostsKey = "shownPosts";

export interface User {
    identity: string,
    epoch_keys: string[],
    reputations: number,
}

export interface Vote {
    upvote: number,
    downvote: number,
    epoch_key: string,
}

export interface Comment {
    type: DataType,
    id: string,
    post_id: string,
    content: string,
    vote: Vote[],
    upvote: number,
    downvote: number,
    isUpvoted: boolean,
    isDownvoted: boolean,
    epoch_key: string,
    username: string,
    post_time: number,
    reputation: number,
}

export interface Post {
    type: DataType,
    id: string,
    content: string,
    vote: Vote[],
    upvote: number,
    downvote: number,
    isUpvoted: boolean,
    isDownvoted: boolean,
    epoch_key: string,
    username: string,
    post_time: number,
    reputation: number,
    comments: Comment[],
}

export enum PageStatus {
    None = 'none',
    SignUp = 'signup',
    SignIn = 'signin',
}

export enum DataType {
    Post = 'post',
    Comment = 'comment',
}

export enum Page {
    Home = 'home',
    Post = 'post',
    User = 'user',
}

export enum ChoiceType {
    Feed = 'feed',
    Epk = 'epk',
}

export enum UserPageType {
    Posts = 'Posts',
    History = 'History',
    Settings = 'Settings',
}

export interface Params {
    id: string,
}