export abstract class Exception extends Error {
  constructor(description: string = "") {
    super();
    this.name = this.constructor.name;
    this.message = description;
  }
}
