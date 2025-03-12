import { Either, makeLeft, makeRight } from "../../core/tools/either";
import { DomainException } from "@repo/domain/core/exception/domain.exception";
import { ValidationUtils } from "@repo/domain/core/utils/validation-utils";
import { NotificationHandler } from "@repo/domain/core/validation/handler/notification-handler";
import { ValidationError } from "@repo/domain/core/validation/validation-error";
import { OrganizationID } from "@repo/domain/organization/organization-id";
import { Organization } from "@repo/domain/organization/organization.entity";
import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";
import {
  UpdateOrganizationInput,
  UpdateOrganizationOutput,
  UpdateOrganizationUseCase,
} from "./update-organization-use-case";

export class DefaultUpdateOrganizationUseCase extends UpdateOrganizationUseCase {
  constructor(private gateway: OrganizationGatewayInterface) {
    super();
    ValidationUtils.requireNonNull(gateway)
  }

  public async execute(
    anInput: UpdateOrganizationInput
  ): Promise<Either<NotificationHandler, UpdateOrganizationOutput>> {
    const { id, title, description, imageUrl } = anInput;
    const anId = OrganizationID.from(id);

    const aOrganization = await this.gateway.findById(anId);
    !aOrganization && this.notFound(anId);

    const notification = NotificationHandler.create();
    aOrganization.update(title, description, imageUrl).validate(notification);

    return notification.hasError()
      ? makeLeft(notification)
      : this.update(aOrganization);
  }

  private async update(
    aOrganization: Organization
  ): Promise<Either<NotificationHandler, UpdateOrganizationOutput>> {
    try {
      const organization = await this.gateway.update(aOrganization);
      return makeRight({ id: organization.id.getValue() });
    } catch (error: any) {
      return makeLeft(NotificationHandler.fromError(error.message));
    }
  }

  private notFound(id: OrganizationID) {
    throw DomainException.withError(
      ValidationError.from(
        `Organization with ID ${id.getValue()} was not found`
      )
    );
  }
}
