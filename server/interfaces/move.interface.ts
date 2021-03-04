import { Document, Model } from 'mongoose';

export default interface IMove {
  name: string,
  apparatus: string,
  pointValue: number,
  letterValue: string,
  copGroup: string,
  isDoubleRotation: boolean
}

export interface IMoveDocument extends IMove, Document { };