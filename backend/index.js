import express from "express";
import cors from "cors";
// require("dotenv").config();
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import router from "./routes/routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000 || process.env.PORT;
//Connect db
// const client = neon(process.env.DATABASE_URL);

app.use("/api", router);
// app.get("/", async (req, res) => {
//   const data = await client.query("Select * from test");
//   return res.status(200).json(data);
// });

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
