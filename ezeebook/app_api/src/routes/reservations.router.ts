import express, {Response, Request} from 'express';
import ReservationsDataService from '../controllers/reservations.service';
import {BaseReservation} from '../models/reservations.interface';

export const reservationRouter = express.Router();

reservationRouter.get("/:uid/rooms/:roomID/reservations",async (req: Request, res: Response) => {
  try {
    const reservation = await ReservationsDataService.getAllReservations();
    if(!reservation) {
        res.status(404).send("Reservations not found");
    }
    else {
      res.status(200).send(reservation.on("value", 
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


reservationRouter.get("/:uid/rooms/:roomID/reservations/:id",async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const reservation = await ReservationsDataService.getReservation(id);
    if(!reservation) {
        res.status(404).send("Reservation not found");
    }
    else {
        res.status(200).send(reservation.on("value", 
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

reservationRouter.post("/:uid/rooms/:roomID/reservations/", async (req: Request, res: Response) => {
  try {
    const baseReservation: BaseReservation = req.body;
    const roomID = req.params.roomID;
    const uid = req.params.uid;

    const reservation = {...baseReservation,roomID,uid}

    const newReservation = await ReservationsDataService.createReservation(reservation);

    res.status(201).json(newReservation.on("value", 
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

reservationRouter.put("/:uid/rooms/:roomID/reservations/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const ReservationUpdate: BaseReservation = req.body;

    const existingReservation = await ReservationsDataService.getReservation(id);

    if (!existingReservation) {
        const newReservation = await ReservationsDataService.createReservation(ReservationUpdate);
        res.status(201).json(newReservation);
    }
    else {
        const updatedReservation = await ReservationsDataService.updateReservation(id, ReservationUpdate);
        return res.status(200).json(updatedReservation);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});


reservationRouter.delete("/:uid/rooms/:roomID/reservations/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await ReservationsDataService.deleteReservation(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});