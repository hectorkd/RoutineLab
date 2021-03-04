import { model, Schema } from 'mongoose';
import { IMoveDocument } from '../interfaces/move.interface';

const MoveSchema: Schema = new Schema({
  name: String,
  apparatus: String,
  pointValue: Number,
  letterValue: String,
  copGroup: String,
  isDoubleRotation: {
    type: Boolean,
    default: false
  }
});

export default model<IMoveDocument>('codeofpoints', MoveSchema);