import {Schema} from 'mongoose';
import Person from "../person/person.model"

const AccountSchema = new Schema({
  account_number : Number,
  product: {
    type: String,
    enum : ['Chequera','Crédito', 'Débito'],
    default: 'Crédito'
  },
  balance: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true 
  },
  nip: Number,
  createdAt: {
    type: Date,
    trim: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    trim: true,
    default: Date.now
  },
  personId: { 
    type: Schema.Types.ObjectId, 
    ref: Person,
    required: true 
  }
});

  
export default AccountSchema;
  