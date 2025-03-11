import { ValidationHandler } from "./validation-handler";

export abstract class Validator {
  private handler: ValidationHandler;

  protected constructor(aHandler: ValidationHandler) {
    this.handler = aHandler;
  }

  public abstract validate(): void;

  protected validationHandler(): ValidationHandler {
    return this.handler;
  }
}
