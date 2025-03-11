import { Exception } from "../exception";
import { ValidationError } from "../validation/validation-error";

export class DomainException extends Exception {
  protected errors: ValidationError[];

  protected constructor(aMessage: string, anErrors: ValidationError[]) {
    super(aMessage);
    this.errors = anErrors;
  }

  static withError(anError: ValidationError): DomainException {
    return new DomainException(anError.message, [anError]);
  }

  static withErrors(anErrors: ValidationError[]): DomainException {
    return new DomainException("", anErrors);
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }
}
