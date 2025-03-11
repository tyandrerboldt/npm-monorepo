export class ValidationError {
  message: string;

  constructor(aMessage: string) {
    this.message = aMessage;
  }

  static from(aMessage: string) {
    return new ValidationError(aMessage);
  }
}
