import { Document, Model } from 'mongoose';

export interface IPerson {
  firstName: string;
  lastName: string;
  phone: number;
  rfc: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPersonDocument extends IPerson, Document {
  setLastUpdated: (this: IPersonDocument) => Promise<void>;
}

export interface IPersonModel extends Model<IPersonDocument> {
  findByIdLean: (personId : string) => Promise<IPersonDocument>
}

