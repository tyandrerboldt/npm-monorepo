import { ValidationUtils } from "@repo/domain/core/utils/validation-utils";
import { OrganizationID } from "@repo/domain/organization/organization-id";
import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";
import { DeleteOrganizationUseCase } from "./delete-organization-use-case";

export class DefaultDeleteOrganizationUseCase extends DeleteOrganizationUseCase {
  constructor(private gateway: OrganizationGatewayInterface) {
    super();
    ValidationUtils.requireNonNull(gateway)
  }

  public async execute(anInput: string): Promise<void> {
    return await this.gateway.deleteById(OrganizationID.from(anInput));
  }
}
