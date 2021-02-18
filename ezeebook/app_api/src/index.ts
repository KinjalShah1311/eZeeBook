import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./routes/users.router";
import { roomRouter } from "./routes/rooms.router";
import { reviewRouter } from "./routes/reviews.router";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}
 
const PORT: number = parseInt(process.env.PORT as string, 10);
 
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/rooms",roomRouter);
app.use("/api/rooms/:roomID/reviews",reviewRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

