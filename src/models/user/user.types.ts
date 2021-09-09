import { Document, Model } from 'mongoose';
import {IPersonDocument} from "../person/person.types"
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
  personId: IPersonDocument
  setLastUpdated: (this: IUserDocument) => Promise<void>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByIdLean: (userId : string) => Promise<IUserDocument>
}

