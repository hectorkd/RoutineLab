import { model, Schema } from 'mongoose';
import { IUserDocument } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
  firstName: String,
  lastName: String,
  gymnasticsClub: String,
  gymnast: {
    type: Boolean,
    default: true
  },
  email: String,
  password: String,
});

export default model<IUserDocument>('users', UserSchema);