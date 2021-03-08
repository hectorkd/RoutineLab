import { Request, Response } from 'express';
import IRoutine from '../interfaces/routines.interface';
import Routine from '../models/routine';

async function postRoutine(req: Request, res: Response): Promise<void> {
  try {
    const { userFirstName, routineName, routine, apparatus } = req.body;
    const newRoutine = await Routine.create({ userFirstName, routineName, routine, apparatus })
    res.status(200);
    res.send(newRoutine)
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not post routine');
  }
}

export default { postRoutine }