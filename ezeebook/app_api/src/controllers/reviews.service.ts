import { BaseReview} from '../models/reviews.interface'
import app from '../../../src/firebase'



const db = app.database().ref("/reviews");
class ReviewsDataService {
    getAllReviews() {
      return db;
    }

    getReview(key) {
        return db.child(key);
    }
  
    createReview(review) {
      return db.push(review);
    }
  
    updateReview(key,value:BaseReview) {
      return db.child(key).update(value);
    }
  
    deleteReview(key) {
      return db.child(key).remove();
    }
  
    deleteAllReviews() {
      return db.remove();
    }
  }
  
  export default new ReviewsDataService();

// let reviews: Reviews = {
//     1: {
//         reviewID: 1,
//         roomID: 1,
//         rating: 4,
//         comments: "Great room"
//     }
// }



// export const getReview = async (id: number): Promise<Review> => reviews[id];

// export const createReview = async (newReview: BaseReview, roomID: number): Promise<Review> => {

//     const reviewID = new Date().valueOf();

//     reviews[reviewID] = {
//         reviewID,
//         roomID,
//         ...newReview
//     };

//     return reviews[reviewID];
// }

// export const updateReview = async (reviewID: number, reviewUpdate: BaseReview, roomID: number): Promise<Review | null> => {
//     const review = await getReview(reviewID);

//     if (!review) {
//         return null;
//     }

//     reviews[reviewID] = { reviewID, roomID, ...reviewUpdate };

//     return reviews[reviewID];
// }

// export const removeReview = async (reviewID: number): Promise<null | void> => {
//     const review = await getReview(reviewID);

//     if (!review) {
//         return null;
//     }

//     delete reviews[reviewID];
// }
