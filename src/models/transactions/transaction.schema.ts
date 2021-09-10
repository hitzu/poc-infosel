import {Schema} from 'mongoose';
import User from "../user/user.model"
import account from "../account/account.model"


const TransactionSchema = new Schema({
  userId : { 
    type: Schema.Types.ObjectId, 
    ref: User,
    required: true 
  },
  receivedAccount: {
    type: Schema.Types.ObjectId, 
    ref: account,
    required: true
  },
  originAccount: {
    type: Schema.Types.ObjectId, 
    ref: account
  },
  amount: Number,
  movementType: {
    type: String,
    enum : ['Cargo','Abono'],
    default: 'Abono'
  },
  concept: String,
  reference: String,
  operation: {
    type: String,
    enum : ['SPEI','Interbancario'],
    default: 'SPEI'
  },
  status: {
    type: String,
    enum : ['Pendiente','Aprobado', 'Error'],
    default: 'Pendiente'
  },
  createdAt: {
    type: Date,
    trim: true,
    default: Date.now
  },
});

  
export default TransactionSchema;
  