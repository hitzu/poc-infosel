import {Schema} from 'mongoose'; 
import { findByIdLean } from "./person.statics"

const PersonSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: Number,
    rfc: { 
      type: String, 
      unique: true 
    },
    address: String,
    createdAt: {
      type: Date,
      trim: true,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      trim: true
    },
  });

  PersonSchema.statics.findByIdLean = findByIdLean;
  
  export default PersonSchema
  