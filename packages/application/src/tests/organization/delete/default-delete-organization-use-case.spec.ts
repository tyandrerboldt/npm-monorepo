import { OrganizationID } from "@repo/domain/organization/organization-id";
import { Organization } from "@repo/domain/organization/organization.entity";
import { IllegalStateException } from "@repo/domain/core/exception/illegal-state.exception";
import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";
import { DefaultDeleteOrganizationUseCase } from "../../../organization/delete/default-delete-organization-use-case";

describe("DefaultDeleteOrganizationUseCase", () => {
  test("givenAValidId_whenCallDelete_thenShouldBeOk", async () => {
    const expectedTitle = "Organização 01";
    const expectedDescription = "Descrição da organização 01"; 0
    const expectedImageUrl = "http://site.com/image.jpg";

    const organization = Organization.create(
      expectedTitle,
      expectedDescription,
      expectedImageUrl
    );

    const repository: Partial<OrganizationGatewayInterface> = {
      deleteById: jest.fn((anId: OrganizationID) => Promise.resolve()),
    };

    const useCase = new DefaultDeleteOrganizationUseCase(
      repository as OrganizationGatewayInterface
    );

    const res = await useCase.execute(organization.id.getValue());

    expect(res).toBeUndefined()
    expect(repository.deleteById).toHaveBeenCalledTimes(1);
  });

  test("givenAInvalidId_whenCallDelete_thenShouldBeOk", async () => {
    const anId = "123";

    const repository: Partial<OrganizationGatewayInterface> = {
      deleteById: jest.fn((anId: OrganizationID) => Promise.resolve()),
    };

    const useCase = new DefaultDeleteOrganizationUseCase(
      repository as OrganizationGatewayInterface
    );
    const res = await useCase.execute(anId);

    expect(res).toBeUndefined()
    expect(repository.deleteById).toHaveBeenCalledTimes(1);
  });

  test("givenAValidId_whenGatewayThrowsException_thenShouldReturnException", async () => {
    const anId = "123";
    const expectedErrorMessage = "Gateway Error";

    let repository: Partial<OrganizationGatewayInterface> = {
      deleteById: jest.fn((anId: OrganizationID) => {
        throw new IllegalStateException(expectedErrorMessage);
      }),
    };

    try {
      const useCase = new DefaultDeleteOrganizationUseCase(
        repository as OrganizationGatewayInterface
      );
      await useCase.execute(anId);
      throw new Error("Not validated");
    } catch (error) {
      expect(error).toBeInstanceOf(IllegalStateException);
      expect(error).toHaveProperty("message", expectedErrorMessage);
    }
  });
});
