import { Identifier } from "./identifier";
import { ValidationHandler } from "./validation/validation-handler";

export abstract class Entity<ID extends Identifier> {
  protected _id: ID;

  constructor(id: ID) {
    this._id = id;
  }

  abstract validate(handler: ValidationHandler): void;
}
