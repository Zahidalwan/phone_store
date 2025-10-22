import express from "express";
import { testConection } from "./config/db.js";
import userRouter from "./routes/usersRouter.js";
import productRouter from "./routes/productsRouter.js";
import cors from "cors";

app.use(cors());
const app = express();

const PORT = 3000;
app.use(express.json());

app.use(userRouter);
app.use(productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  testConection();
});
