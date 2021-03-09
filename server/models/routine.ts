import { model, Schema } from 'mongoose';
import { IRoutineDocument } from '../interfaces/routines.interface';

const RoutineSchema: Schema = new Schema({
  userFirstName: String,
  routineName: String,
  routine: Array,
  isCompRoutine: {
    type: Boolean,
    default: false
  },
  apparatus: String,
});

export default model<IRoutineDocument>('routines', RoutineSchema);