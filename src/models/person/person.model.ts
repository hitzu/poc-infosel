import { model } from "mongoose";
import { IPersonDocument, IPersonModel } from "./person.types";
import personSchema from "./person.schema"

export default model<IPersonDocument>("person", personSchema) as IPersonModel;