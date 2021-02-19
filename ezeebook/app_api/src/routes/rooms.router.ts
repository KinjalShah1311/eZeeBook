import express, {Response, Request} from 'express';
import RoomsDataService from '../controllers/rooms.service';
import {BaseRoom} from '../models/rooms.interface'

export const roomRouter = express.Router();

roomRouter.get("/",async (req: Request, res: Response) => {
  try {
    const room = await RoomsDataService.getAllRooms();
    if(!room) {
        res.status(404).send("Room not found");
    }
    else {
      res.status(200).send(room.on("value", 
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

roomRouter.get("/:id",async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const room = await RoomsDataService.getRoom(id);
    if(!room) {
        res.status(404).send("Room not found");
    }
    else {
        res.status(200)
          .send(room.on("value", 
              function(snapshot) {
                console.log(snapshot.val());
              }, function (e) {
                console.log("The read failed: " + e);
              })
              );
    }
  } catch (e) {
    //console.log('Error happened: ', e.message);
    res.status(500).send(e.message);
  }
});

roomRouter.post("/", async (req: Request, res: Response) => {
  try {
    const room:BaseRoom = req.body;

    const newRoom = await RoomsDataService.createRoom(room);

    res.status(201).json(newRoom.on("value", 
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

roomRouter.put("/:id", async (req: Request, res: Response) => {
  const id= req.params.id;

  try {
    const roomUpdate:BaseRoom = req.body;

    const existingRoom = await RoomsDataService.getRoom(id);

    if (!existingRoom) {
        const newRoom = await RoomsDataService.createRoom(roomUpdate);
        res.status(201).json(newRoom);
    }
    else {
        const updatedRoom = await RoomsDataService.updateRoom(id, roomUpdate);
        return res.status(200).json(updatedRoom);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});


roomRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await RoomsDataService.deleteRoom(id);

    res.status(204).send("Room successfully deleted.");
  } catch (e) {
    res.status(500).send(e.message);
  }
});