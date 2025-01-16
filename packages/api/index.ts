import express, { type Request, type Response, type NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authenticate } from "./middleware";
import { PrismaClient } from "db";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const app = express();
const db = new PrismaClient();

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/protected", authenticate, async (req: Request, res: Response) => {
  const user = await db.user.findUnique({
    where: {
      id: req.user?.properties.id,
    }
  });

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
