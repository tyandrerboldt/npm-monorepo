import { ValidationError } from "../core/validation/validation-error";
import { ValidationHandler } from "../core/validation/validation-handler";
import { Validator } from "../core/validation/validator";
import { Organization } from "./organization.entity";
import { validate as isValidUUID } from 'uuid';

export class OrganizationValidator extends Validator {
  private organization: Organization;

  constructor(aOrganization: Organization, aHandler: ValidationHandler) {
    super(aHandler);
    this.organization = aOrganization;
  }

  public validate(): void {
    this.checkIdConstraints();
    this.checkTitleConstraints();
  }

  private checkIdConstraints() {
    const id: string = this.organization.id.getValue();
    if (!id || id == null || id == undefined || id == "") {
      this.validationHandler().appendError(
        ValidationError.from("'Id' should not be null")
      );
    } else if (!isValidUUID(id)) {
      this.validationHandler().appendError(
        ValidationError.from("'Id' must be a uuid")
      );
    } 
  }

  private checkTitleConstraints() {
    const title = this.organization.title;
    if (!title || title == null || title == undefined) {
      this.validationHandler().appendError(
        ValidationError.from("'title' should not be null")
      );
    } else if (title.length <= 3) {
      this.validationHandler().appendError(
        ValidationError.from("'title' must be greater than 3 characteres")
      );
    } else if (title.length > 100) {
      this.validationHandler().appendError(
        ValidationError.from("'title' must be between 4 and 100 characters")
      );
    }
  }
}
