import { ValidationUtils } from "@repo/domain/core/utils/validation-utils";
import { NotificationHandler } from "@repo/domain/core/validation/handler/notification-handler";
import { Organization } from "@repo/domain/organization/organization.entity";
import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";
import { Either, makeLeft, makeRight } from "../../core/tools/either";
import {
  CreateOrganizationInput,
  CreateOrganizationOutput,
  CreateOrganizationUseCase,
} from "./create-organization-use-case";

export class DefaultCreateOrganizationUseCase extends CreateOrganizationUseCase {
  constructor(private gateway: OrganizationGatewayInterface) {
    super();
    ValidationUtils.requireNonNull(gateway)
  }

  async execute(
    input: CreateOrganizationInput
  ): Promise<Either<NotificationHandler, CreateOrganizationOutput>> {
    const { title, description, imageUrl } = input;
    const notification = NotificationHandler.create();
    const organization = Organization.create(title, description, imageUrl);
    organization.validate(notification);

    return notification.hasError()
      ? makeLeft(notification)
      : this.create(organization);
  }

  private async create(
    aOrganization: Organization
  ): Promise<Either<NotificationHandler, CreateOrganizationOutput>> {
    try {
      const organization = await this.gateway.create(aOrganization);
      return makeRight({ id: organization.id.getValue() });
    } catch (error: any) {
      return makeLeft(NotificationHandler.fromError(error.message));
    }
  }
}
