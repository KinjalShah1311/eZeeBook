import express, {Response, Request} from 'express';
import * as UserService from '../controllers/users.service';
import {BaseUser, User} from '../models/users.interface';

export const userRouter = express.Router();

userRouter.get("/",async (req: Request, res: Response) => {
    try {
      const users: User[] = await UserService.getAllUsers();
  
      res.status(200).send(users);
    } catch (e) {
      res.status(500).send(e.message);
    }
});


userRouter.get("/:id",async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const user: User = await UserService.getUser(id);
    if(user) {
      res.status(200).send(user);
    }
    else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user: BaseUser = req.body;

    const newUser = await UserService.createUser(user);

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

userRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const userUpdate: User = req.body;

    const existingUser: User = await UserService.getUser(id);

    if (existingUser) {
      const updatedUser = await UserService.updateUser(id, userUpdate);
      return res.status(200).json(updatedUser);
    }

    const newUser = await UserService.createUser(userUpdate);

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await UserService.removeUser(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});