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
    post_time: number,
    epoch_key: string,
    vote: Vote[],
    upvote: number,
    downvote: number,
    content: string, 
}

export interface Post {
    id: string,
    title: string,
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

export enum PageStatus {
    None = 'none',
    SignUp = 'signup',
    SignIn = 'signin',
}