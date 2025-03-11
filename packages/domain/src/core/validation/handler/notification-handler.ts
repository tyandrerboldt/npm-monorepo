import { DomainException } from "../../exception/domain.exception";
import { ValidationError } from "../validation-error";
import { Validation, ValidationHandler } from "../validation-handler";

export class NotificationHandler extends ValidationHandler {
  private errors: ValidationError[];

  constructor(anErrors: ValidationError[]) {
    super();
    this.errors = anErrors;
  }

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

  public static create(): NotificationHandler {
    return new NotificationHandler([]);
  }

  public static fromError(anError: ValidationError) {
    return NotificationHandler.create().appendError(anError);
  }

  appendError(anError: ValidationError): NotificationHandler {
    this.errors.push(anError);
    return this;
  }

  override appendHandler(anHandler: NotificationHandler): NotificationHandler {
    this.errors = this.errors.concat(anHandler.getErrors());
    return this;
  }

  validate<T>(aValidation: Validation<T>): T {
    try {
      return aValidation.validate();
    } catch (error) {
      if (error instanceof DomainException) {
        this.errors = this.errors.concat(error.getErrors());
      }
    }
    return null as T;
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }
}
