import { Document, Model } from 'mongoose';

export default interface IRoutine {
  userFirstName: string,
  routineName: string,
  routine: [],
  apparatus: string,
}

export interface IRoutineDocument extends IRoutine, Document { };