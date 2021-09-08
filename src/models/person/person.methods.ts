import { IPersonDocument } from "./person.types";

export async function setLastUpdate(this: IPersonDocument): Promise<void> {
    const now = new Date();
    if (!this.updatedAt || this.updatedAt < now) {
      this.updatedAt = now;
      await this.save();
    }
  }
