import { Request, Response } from 'express';
import IMove from '../interfaces/move.interface';
import Move from '../models/moves';

async function getAllMoves(req: Request, res: Response): Promise<void> {
  try {
    const moves: IMove[] = await Move.find();
    res.status(200);
    res.send(moves);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Could not retrieve data');
  }
}

export default { getAllMoves }