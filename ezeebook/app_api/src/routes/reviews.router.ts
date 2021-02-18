import express, {Response, Request} from 'express';
import ReviewsDataService from '../controllers/reviews.service';
import {BaseReview} from '../models/reviews.interface';

export const reviewRouter = express.Router();

reviewRouter.get("/:roomID/reviews",async (req: Request, res: Response) => {
  try {
    const review = await ReviewsDataService.getAllReviews();
    if(!review) {
        res.status(404).send("Reviews not found");
    }
    else {
      res.status(200).send(review.on("value", 
        function(snapshot) {
          console.log(snapshot.val());
        }, function (e) {
          console.log("The read failed: " + e);
        })
      );
    }
  }catch(e) {
    res.status(500).send(e.message);
  }
});


reviewRouter.get("/:roomID/reviews/:id",async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const review = await ReviewsDataService.getReview(id);
    if(!review) {
        res.status(404).send("Review not found");
    }
    else {
        res.status(200).send(review.on("value", 
        function(snapshot) {
          console.log(snapshot.val());
        }, function (e) {
          console.log("The read failed: " + e);
        })
      );
    }
  }catch(e) {
    console.log('Error happened: ', e.message);
    //res.status(500).send(e.message);
  }
});

reviewRouter.post("/:roomID/reviews/", async (req: Request, res: Response) => {
  try {
    const basereview: BaseReview = req.body;
    const roomID = req.params.roomID;

    const review = {...basereview,roomID}

    const newReview = await ReviewsDataService.createReview(review);

    res.status(201).json(newReview.on("value", 
    function(snapshot) {
      console.log(snapshot.val());
    }, function (e) {
      console.log("The read failed: " + e);
    })
    );
  } catch (e) {
    res.status(500).send(e.message);
  }
});

reviewRouter.put("/:roomID/reviews/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const reviewUpdate: BaseReview = req.body;

    const existingReview = await ReviewsDataService.getReview(id);

    if (!existingReview) {
        const newReview = await ReviewsDataService.createReview(reviewUpdate);
        res.status(201).json(newReview);
    }
    else {
        const updatedReview = await ReviewsDataService.updateReview(id, reviewUpdate);
        return res.status(200).json(updatedReview);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});


reviewRouter.delete("/:roomID/reviews/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await ReviewsDataService.deleteReview(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});