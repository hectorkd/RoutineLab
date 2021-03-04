import express from 'express';
const router = express.Router();
import controller from './controllers/moves';

router.get('/code_of_points', controller.getAllMoves);
router.get('/code_of_points/:apparatus', controller.getApparatusMoves);

export default router;