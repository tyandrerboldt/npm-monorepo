import { Identifier } from "../core/identifier";
import { IdUtils } from "../core/utils/id-utils";
import { ValidationUtils } from "../core/utils/validation-utils";

export class OrganizationID extends Identifier {
  private value: string;

  constructor(value: string) {
    super();
    this.value = ValidationUtils.requireNonNull(value);
  }

  override getValue(): string {
    return this.value;
  }

  static unique() {
    return OrganizationID.from(IdUtils.generateUuid());
  }

  static from(anId: string) {
    return new OrganizationID(anId);
  }
}
