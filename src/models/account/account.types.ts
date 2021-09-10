import { Document, Model } from 'mongoose';
import {IPersonDocument} from "../person/person.types"

export interface IAccount {
  account_number: number;
  balance: number;
  product: string;
  nip: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountDocument extends IAccount, Document {
  personId: IPersonDocument
}

export interface IAccountModel extends Model<IAccountDocument> {
}

