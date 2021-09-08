import { Model, model, Schema, Types } from 'mongoose';
// import Person from "./person.model"

export interface User {
  username: string;
  password: string;
  token: string;
  loginDate: Date;
  status: boolean;
  createdAt: Date;
  updateAt: Date;
}

export interface UserDocument extends User, Document{
  personId : Types.ObjectId
}

const UserSchema = new Schema<UserDocument>({
  username: String,
  password: String,
  token: String,
  loginDate: {
    type: Date,
    trim: true,
  },
  status: Boolean,
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
  // personId: { 
  //   type: Schema.Types.ObjectId, 
  //   ref: Person,
  //   required: true 
  // }
});

UserSchema.statics.getUserData = async function(
  this: Model<UserDocument>,
  id: string
){
  return this.findById(id).populate("person").exec()
}

export default model<UserDocument>('User', UserSchema);
