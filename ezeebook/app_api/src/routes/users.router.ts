import express, {Response, Request} from 'express';
import UsersDataService from '../controllers/users.service';
import {BaseUser} from '../models/users.interface';

export const userRouter = express.Router();

userRouter.get("/",async (req: Request, res: Response) => {
    try {
      const users = await UsersDataService.getAllUsers();
  
      res.status(200).send(users);
    } catch (e) {
      res.status(500).send(e.message);
    }
});


userRouter.get("/:id",async (req: Request, res: Response) => {
  const id= req.params.id;
  try {
    const user = await UsersDataService.getUser(id);
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
    const baseUser: BaseUser = req.body;
    const createdAt = (new Date()).toString();

    const user = {...baseUser,createdAt} 

    const newUser = await UsersDataService.createUser(user);

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

userRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const userUpdate: BaseUser = req.body; 

    const existingUser = await UsersDataService.getUser(id);

    if (existingUser) {
      const updatedUser = await UsersDataService.updateUser(id, userUpdate);
      return res.status(200).json(updatedUser);
    }

    const newUser = await UsersDataService.createUser(userUpdate);

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await UsersDataService.deleteUser(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});