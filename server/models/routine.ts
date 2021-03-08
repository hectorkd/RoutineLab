import { model, Schema } from 'mongoose';
import { IRoutineDocument } from '../interfaces/routines.interface';

const RoutineSchema: Schema = new Schema({
  userFirstName: String,
  routineName: String,
  routine: Array,
  apparatus: String,
});

export default model<IRoutineDocument>('routines', RoutineSchema);