import express, {Response, Request} from 'express';
import * as RoomService from '../controllers/rooms.service';
import {BaseRoom, Room} from '../models/rooms.interface';

export const roomRouter = express.Router();

roomRouter.get("/",async (req: Request, res: Response) => {
    try {
      const rooms: Room[] = await RoomService.getAllRooms();
  
      res.status(200).send(rooms);
    } catch (e) {
      res.status(500).send(e.message);
    }
});


roomRouter.get("/:id",async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const room: Room = await RoomService.getRoom(id);
    if(!room) {
        res.status(404).send("Room not found");
    }
    else {
        res.status(200).send(room);
    }
  } catch (e) {
    console.log('Error happened: ', e.message);
    //res.status(500).send(e.message);
  }
});

roomRouter.post("/", async (req: Request, res: Response) => {
  try {
    const room: BaseRoom = req.body;

    const newRoom = await RoomService.createRoom(room);

    res.status(201).json(newRoom);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

roomRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const roomUpdate: Room = req.body;

    const existingRoom: Room = await RoomService.getRoom(id);

    if (!existingRoom) {
        const newRoom = await RoomService.createRoom(roomUpdate);
        res.status(201).json(newRoom);
    }
    else {
        const updatedRoom = await RoomService.updateRoom(id, roomUpdate);
        return res.status(200).json(updatedRoom);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});


roomRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await RoomService.removeRoom(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});