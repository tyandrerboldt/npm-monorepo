import { v4 as uuid } from "uuid";

export class IdUtils {
  static generateUuid() {
    return uuid();
  }
}
