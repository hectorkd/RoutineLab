import express from 'express';
const router = express.Router();
import moveController from './controllers/moves';
import userController from './controllers/users';

router.get('/code_of_points', moveController.getAllMoves);
router.get('/code_of_points/:apparatus', moveController.getApparatusMoves);

router.post('/register', userController.addUser);
router.post('/check_email', userController.checkEmail);

export default router;