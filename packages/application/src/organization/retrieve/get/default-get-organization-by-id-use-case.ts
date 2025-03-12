import { DomainException } from "@repo/domain/core/exception/domain.exception";
import { ValidationUtils } from "@repo/domain/core/utils/validation-utils";
import { ValidationError } from "@repo/domain/core/validation/validation-error";
import { OrganizationID } from "@repo/domain/organization/organization-id";
import { Organization } from "@repo/domain/organization/organization.entity";
import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";
import {
  GetOrganizationByIdOutput,
  GetOrganizationByIdUseCase,
} from "./get-organization-by-id-use-case";

export class DefaultGetOrganizationByIdUseCase extends GetOrganizationByIdUseCase {
  constructor(private gateway: OrganizationGatewayInterface) {
    super();
    ValidationUtils.requireNonNull(gateway)
  }

  public async execute(
    id: string
  ): Promise<GetOrganizationByIdOutput> {
    const anId = OrganizationID.from(id);
    const aOrganization = await this.gateway.findById(anId);
    !aOrganization && this.notFound(anId);
    return this.domainToOutput(aOrganization);
  }

  private notFound(id: OrganizationID) {
    throw DomainException.withError(
      ValidationError.from(
        `Organization with ID ${id.getValue()} was not found`
      )
    );
  }

  private domainToOutput(
    aOrganization: Organization
  ): GetOrganizationByIdOutput {
    const { id, title, description, imageUrl, createdAt, updatedAt, deletedAt } = aOrganization;
    return { id: id.getValue(), title, description, imageUrl, createdAt, updatedAt, deletedAt };
  }
}
