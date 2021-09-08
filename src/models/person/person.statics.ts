import { IPersonDocument, IPersonModel } from "./person.types";
import { Types } from 'mongoose';

export async function findByIdLean(
  personId: string
): Promise<IPersonDocument> {
  try { 
    const personFound = await this.findById(Types.ObjectId(personId)).lean();
    personFound.id = personFound._id.toString();
    return personFound;
  } catch (err) {
    throw new Error(err)
  }
}
