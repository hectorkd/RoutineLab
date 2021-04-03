import express from "express";
import router from "./router";
import connection from "./models/index";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router);

(async function (): Promise<void> {
  try {
    await connection;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} 🚀`);
    });
  } catch (error) {
    console.error(error);
  }
})();
