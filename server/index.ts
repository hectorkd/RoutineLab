import express from 'express';
import router from './router';
import connection from './models/index';
import cors from 'cors';

const app = express();
const PORT = 3000;

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