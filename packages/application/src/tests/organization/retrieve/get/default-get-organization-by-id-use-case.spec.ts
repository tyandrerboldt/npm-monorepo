import { DefaultGetOrganizationByIdUseCase } from "../../../../organization/retrieve/get/default-get-organization-by-id-use-case";
import { OrganizationID } from "@repo/domain/organization/organization-id";
import { Organization } from "@repo/domain/organization/organization.entity";
import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";

describe("DefaultGetOrganizationByIdUseCase", () => {
  test("givenAValidOrganizationId_whenCallFindById_thenReturnAOrganization", async () => {
    const organization = Organization.create(
      "Organização 01",
      "Descrição da organização 01",
      "http://site.com/image-01.jpg"
    );

    const repository: Partial<OrganizationGatewayInterface> = {
      findById: jest.fn((anId: OrganizationID) =>
        Promise.resolve(organization)
      ),
    };

    const useCase = new DefaultGetOrganizationByIdUseCase(
      repository as OrganizationGatewayInterface
    );

    const actualOrganization = await useCase.execute(
      organization.id.getValue()
    );

    expect(actualOrganization).toBeDefined();
    expect(actualOrganization.id).toEqual(actualOrganization.id);
    expect(repository.findById).toHaveBeenCalledTimes(1);
  });
});
