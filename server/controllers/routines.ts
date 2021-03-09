import { Request, Response } from 'express';
import IRoutine from '../interfaces/routines.interface';
import Routine from '../models/routine';

async function postRoutine(req: Request, res: Response): Promise<void> {
  try {
    const { userFirstName, routineName, routine, apparatus } = req.body;
    const checkRoutine = await Routine.find({ userFirstName, routineName, apparatus });
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
  try {
    const { name } = req.params;
    const myRoutines: IRoutine[] = await Routine.find({ userFirstName: name });
    res.status(200);
    res.send(myRoutines);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not find routines');
  }
}

async function updateRoutines(req: Request, res: Response): Promise<void> {
  try {
    const { _id, apparatus, isCompRoutine } = req.body;
    console.log('id', _id);
    console.log({ apparatus });
    const [changeToFalse]: IRoutine[] = await Routine.find({ apparatus, isCompRoutine: true });
    if (changeToFalse) {
      console.log('you are here')
      console.log('changetofalse', changeToFalse, _id)
      if (changeToFalse?._id == _id) {
        console.log('------------', _id)
        await Routine.findByIdAndUpdate({ _id: changeToFalse._id }, { isCompRoutine: !changeToFalse.isCompRoutine });
      } else {
        await Routine.findByIdAndUpdate({ _id: changeToFalse._id }, { isCompRoutine: !changeToFalse.isCompRoutine });
        await Routine.findByIdAndUpdate({ _id }, { isCompRoutine: !isCompRoutine });
      }
    } else {
      await Routine.findByIdAndUpdate({ _id }, { isCompRoutine: !isCompRoutine });
    }
    const myRoutines: IRoutine[] = await Routine.find();
    res.status(201);
    res.send(myRoutines)
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not update routines')
  }
}

async function getCompRoutines(req: Request, res: Response): Promise<void> {
  try {
    const { name } = req.params;
    const compRoutines: IRoutine[] = await Routine.find({ isCompRoutine: true, userFirstName: name });
    res.status(200);
    res.send(compRoutines);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not find competition routines');
  }
}

export default { postRoutine, getRoutines, updateRoutines, getCompRoutines }