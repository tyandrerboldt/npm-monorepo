import { ValidationError } from "./validation-error";

export abstract class ValidationHandler {
  abstract appendError(anError: ValidationError): ValidationHandler;

  abstract appendHandler(anHandler: ValidationHandler): ValidationHandler;

  abstract validate<T>(aValidation: Validation<T>): T;

  abstract getErrors(): ValidationError[];

  public hasError(): boolean {
    return this.getErrors() != null && this.getErrors().length > 0;
  }

  public firstError(): ValidationError | null {
    if (this.hasError()) {
      return this.getErrors()[0];
    } else {
      return null;
    }
  }
}

export interface Validation<T> {
  validate(): T;
}
