import { Document, Model } from 'mongoose';

export default interface IUser {
  firstName: string,
  lastName: string,
  gymnasticsClub: string,
  gymnast: boolean,
  email: string,
  password: string,
}

export interface IUserDocument extends IUser, Document { };