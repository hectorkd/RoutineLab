import { Request, Response } from 'express';
import IRoutine from '../interfaces/routines.interface';
import Routine from '../models/routine';

async function postRoutine(req: Request, res: Response): Promise<void> {
  try {
    const { userFirstName, routineName, routine, apparatus } = req.body;
    const checkRoutine = await Routine.find({ userFirstName, routineName });
    if (checkRoutine.length > 0) {
      res.status(409);
      res.send({ exists: 'Routine under this name already exists' });
    } else {
      const newRoutine = await Routine.create({ userFirstName, routineName, routine, apparatus });
      res.status(200);
      res.send(newRoutine)
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not post routine');
  }
}

async function getRoutines(req: Request, res: Response): Promise<void> {
  console.log('You are here');
  try {
    const { name } = req.params;
    const myRoutines: IRoutine[] = await Routine.find({ userFirstName: name });
    console.log('-------------', myRoutines);
    res.status(200);
    res.send(myRoutines);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not find routines');
  }
}

export default { postRoutine, getRoutines }