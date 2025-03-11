import { NullPointerException } from "../exception/null-pointer.exception";

export class ValidationUtils {
  static requireNonNull<T>(value: T, message: string = ""): T {
    if (value == null || value == undefined || value == "") {
      throw new NullPointerException(message);
    }
    return value;
  }
}
