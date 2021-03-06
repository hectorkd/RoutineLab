import { Request, Response } from 'express';
import IUser from '../interfaces/user.interface';
import User from '../models/users';

async function addUser(req: Request, res: Response): Promise<void> {
  try {
    const { firstName, lastName, gymnasticsClub, gymnast, email, password } = req.params;
    const user: IUser = await User.create({ firstName, lastName, gymnasticsClub, gymnast, email, password });
    res.status(200);
    res.send({ firstName, lastName, gymnasticsClub, gymnast, email });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not add user');
  }
}

async function checkEmail(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.params;
    const user: IUser[] = await User.find({ email });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not add user');
  }
}

export default { addUser, checkEmail }