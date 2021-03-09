import { Document, Model } from 'mongoose';

export default interface IRoutine {
  _id: string,
  userFirstName: string,
  routineName: string,
  isCompRoutine: boolean,
  routine: [],
  apparatus: string,
}

export interface IRoutineDocument extends IRoutine, Document { _id: string };