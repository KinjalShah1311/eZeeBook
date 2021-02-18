export interface BaseReview {
    rating: number;
    comments: string;
}


export interface Review extends BaseReview {
    reviewID: string;
    roomID:string;
}

export interface Reviews {
    [key: number]: Review;
}