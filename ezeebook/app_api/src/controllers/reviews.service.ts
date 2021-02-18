import {BaseReview, Review, Reviews} from '../models/reviews.interface'

let reviews: Reviews = {
    1: {
        reviewID:1,
        roomID:1,
        rating: 4,
        comments: "Great room"
    }
}

export const getAllReviews = async (): Promise<Review[]> => Object.values(reviews);

export const getReview = async (id: number): Promise<Review> => reviews[id];

export const createReview = async (newReview: BaseReview, roomID:number): Promise<Review> => {
    
    const reviewID= new Date().valueOf();

    reviews[reviewID] = {
        reviewID,
        roomID,
        ...newReview
    };

    return reviews[reviewID];
}

export const updateReview = async (reviewID: number, reviewUpdate: BaseReview, roomID: number): Promise<Review | null> => {
    const review = await getReview(reviewID);

    if(!review) {
        return null;
    }

    reviews[reviewID] = {reviewID,roomID, ...reviewUpdate};

    return reviews[reviewID];
}

export const removeReview = async (reviewID: number): Promise<null | void> =>{
    const review = await getReview(reviewID);

    if(!review) {
        return null;
    }

    delete reviews[reviewID];
}
