export interface BaseReview {
    rating: number;
    comments: string;
}


export interface Review extends BaseReview {
    reviewID: number;
    roomID:number;
}

export interface Reviews {
    [key: number]: Review;
}