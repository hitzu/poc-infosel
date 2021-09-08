import { Document, Model } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  token: string;
  loginDate: Date;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  setLastUpdated: (this: IUserDocument) => Promise<void>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByIdLean: (userId : string) => Promise<IUserDocument>
}

