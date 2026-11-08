import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/orders", orderRouter);

// Set up the "/api/inngest" routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions: functions }));

//Error Handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: error.message });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
