import {Schema} from 'mongoose'; 
import { findByIdLean } from "./user.statics"
import { setLastUpdated } from "./user.methods"
import Person from "../person/person.model"

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  token: String,
  loginDate: {
    type: Date,
    trim: true,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true 
  },
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

UserSchema.statics.findByIdLean = findByIdLean;
UserSchema.methods.setLastUpdated = setLastUpdated;
  
  export default UserSchema
  