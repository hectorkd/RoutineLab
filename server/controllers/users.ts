import { Request, Response } from 'express';
import IUser from '../interfaces/user.interface';
import User from '../models/users';

async function addUser(req: Request, res: Response): Promise<void> {
  try {
    const { firstName, lastName, gymnasticsClub, gymnast, email, password } = req.body;
    const user: IUser[] = await User.find({ email });
    if (user.length === 0) {
      console.log('create')
      const newUser = await User.create({ firstName, lastName, gymnasticsClub, gymnast, email, password })
      res.status(200);
      res.send({ firstName: newUser.firstName, lastName: newUser.lastName, gymnasticsClub: newUser.gymnasticsClub, gymnast: newUser.gymnast });
    } else {
      console.log('exists')
      res.status(409);
      res.send({ exists: 'User already exists' });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not add user');
  }
}

async function logIn(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user: IUser[] = await User.find({ email });
    if (user.length !== 0 && user[0].email === email && user[0].password === password) {
      const { firstName, lastName, gymnasticsClub, gymnast } = user[0];
      res.status(200);
      res.send({ firstName, lastName, gymnasticsClub, gymnast });
    } else {
      res.status(409);
      res.send({ exists: 'Incorrect log in details' });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not log in');
  }
}

export default { addUser, logIn }