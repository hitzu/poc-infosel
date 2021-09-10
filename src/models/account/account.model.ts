import { model } from "mongoose";
import { IAccountDocument, IAccountModel } from "./account.types";
import accountSchema from "./account.schema"

export default model<IAccountDocument>("account", accountSchema) as IAccountModel;