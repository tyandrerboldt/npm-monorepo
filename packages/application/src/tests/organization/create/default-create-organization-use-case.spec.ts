import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";
import { DefaultCreateOrganizationUseCase } from "../../../organization/create/default-create-organization-use-case";
import { Organization } from "@repo/domain/organization/organization.entity";

describe("DefaultCreateOrganizationUseCase", () => {
  test("givenAValidOrganizationParams_whenCallCreate_thenCreateOrganization", async () => {
    const expectedTitle = "Organização 01";
    const expectedDescription = "Descrição da organização 01";
    const expectedImageUrl = "http://site.com/image.jpg";

    const aOrganization = Organization.create(
      expectedTitle,
      expectedDescription,
      expectedImageUrl
    );

    const repository: Partial<OrganizationGatewayInterface> = {
      create: jest.fn((anInput: Organization) =>
        Promise.resolve(aOrganization)
      ),
    };

    const useCase = new DefaultCreateOrganizationUseCase(
      repository as OrganizationGatewayInterface
    );
    const res = await useCase.execute(aOrganization);

    expect(res.isRight()).toBeTruthy();
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(res.get()).not.toBeUndefined();
  });

  test("givenAInvalidOrganizationTitle_whenCallCreate_thenReturnError", async () => {
    const expectedTitle = "";
    const expectedDescription = "Descrição da organização 01";
    const expectedImageUrl = "http://site.com/image.jpg";
    const expectedErrorCount = 1;
    const expectedErrorMessage = "'title' should not be null";

    const aOrganization = Organization.create(
      expectedTitle,
      expectedDescription,
      expectedImageUrl
    );

    const repository: Partial<OrganizationGatewayInterface> = {
      create: jest.fn((anInput: Organization) =>
        Promise.resolve(aOrganization)
      ),
    };

    const useCase = new DefaultCreateOrganizationUseCase(
      repository as OrganizationGatewayInterface
    );
    const res = await useCase.execute(aOrganization);

    const notification = res.getLeft();
    expect(res.isLeft()).toBeTruthy();
    expect(notification.getErrors()).toHaveLength(expectedErrorCount);
    expect(notification.firstError()).toHaveProperty(
      "message",
      expectedErrorMessage
    );
  });
});
