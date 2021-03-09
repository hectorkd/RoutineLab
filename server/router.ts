import express from 'express';
const router = express.Router();
import moveController from './controllers/moves';
import userController from './controllers/users';
import routineController from './controllers/routines';

router.get('/code_of_points', moveController.getAllMoves);
router.get('/code_of_points/:apparatus', moveController.getApparatusMoves);

router.post('/register', userController.addUser);
router.post('/log_in', userController.logIn);

router.post('/add_routine', routineController.postRoutine);
router.get('/get_routines/:name', routineController.getRoutines);
router.put('/add_comp_routine', routineController.updateRoutines)

export default router;