import express, {Response, Request} from 'express';
import * as ReviewService from '../controllers/reviews.service';
import {BaseReview, Review} from '../models/reviews.interface';

export const reviewRouter = express.Router();

reviewRouter.get("/",async (req: Request, res: Response) => {
    try {
      
      const reviews: Review[] = await ReviewService.getAllReviews();
  
      res.status(200).send(reviews);
    } catch (e) {
      res.status(500).send(e.message);
    }
});


reviewRouter.get("/:id",async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const review: Review = await ReviewService.getReview(id);
    if(!review) {
        res.status(404).send("Review not found");
    }
    else {
        res.status(200).send(review);
    }
  } catch (e) {
    console.log('Error happened: ', e.message);
    //res.status(500).send(e.message);
  }
});

reviewRouter.post("/", async (req: Request, res: Response) => {
  try {
    const review: BaseReview = req.body;
    const roomID: number = parseInt(req.params.roomID, 10);

    const newReview = await ReviewService.createReview(review,roomID);

    res.status(201).json(newReview);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

reviewRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const roomID: number = parseInt(req.params.roomID, 10);

  try {
    const reviewUpdate: Review = req.body;

    const existingReview: Review = await ReviewService.getReview(id);

    if (!existingReview) {
        const newReview = await ReviewService.createReview(reviewUpdate,roomID);
        res.status(201).json(newReview);
    }
    else {
        const updatedReview = await ReviewService.updateReview(id, reviewUpdate,roomID);
        return res.status(200).json(updatedReview);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});


reviewRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ReviewService.removeReview(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});