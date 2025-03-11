import { ValueObject } from "./value-object";

export abstract class Identifier extends ValueObject {
  
  public abstract getValue(): string;

}
