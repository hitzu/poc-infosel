import { model } from "mongoose";
import { IUserDocument, IUserModel } from "./user.types";
import userSchema from "./user.schema"

export default model<IUserDocument>("user", userSchema) as IUserModel;