import { Document, Model } from 'mongoose';
import {IUserDocument} from "../user/user.types"
import {IAccountDocument} from "../account/account.types"

export interface ITransaction {
  amount: number;
  movementType: string;
  concept: string;
  reference: number;
  operation: string;
  status: string;
  createdAt: Date;
}

export interface ITransactionDocument extends ITransaction, Document {
  userId: IUserDocument;
  receivedAccount: IAccountDocument;
  originAccount: IAccountDocument;
  
}

export interface ITransactionModel extends Model<ITransactionDocument> {
}

