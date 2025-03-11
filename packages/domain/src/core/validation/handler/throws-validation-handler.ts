import { DomainException } from "../../exception/domain.exception";
import { ValidationError } from "../validation-error";
import { Validation, ValidationHandler } from "../validation-handler";

export class ThrowsValidationHandler extends ValidationHandler {
  
  override appendError(anError: ValidationError): ValidationHandler {
    throw DomainException.withError(anError);
  }

  override appendHandler(anHandler: ValidationHandler): ValidationHandler {
    throw DomainException.withErrors(anHandler.getErrors());
  }

  validate<T>(aValidation: Validation<T>): T {
    try {
      return aValidation.validate();
    } catch (error) {
      throw DomainException.withError(ValidationError.from(`${error}`));
    }
  }
  getErrors(): ValidationError[] {
    return [];
  }
}
