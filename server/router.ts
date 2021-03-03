import express from 'express';
const router = express.Router();
import controller from './controllers/moves';

router.get('/codeofpoints', controller.getAllMoves);

export default router;