import { DefaultUpdateOrganizationUseCase } from "../../../organization/update/default-update-organization-use-case";
import { OrganizationID } from "@repo/domain/organization/organization-id";
import { Organization } from "@repo/domain/organization/organization.entity";
import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";

describe("DefaultUpdateOrganizationUseCase", () => {
  test("givenAValidOrganizationParams_whenCallUpdate_thenUpdateOrganization", async () => {
    const expectedTitle = "Organização 02";
    const expectedDescription = "Descrição da organização 02";
    const expectedImageUrl = "http://site.com/image.jpg";

    const organization = Organization.create(
      "Organização 01",
      "Descrição da organização 01",
      "http://site.com/image-01.jpg"
    );

    const updatedOrganization = Organization.createWithId(
      organization.id,
      expectedTitle,
      expectedDescription,
      expectedImageUrl
    );

    expect(organization.title).not.toEqual(expectedTitle);
    expect(organization.description).not.toEqual(expectedDescription);
    expect(organization.imageUrl).not.toEqual(expectedImageUrl);

    const repository: Partial<OrganizationGatewayInterface> = {
      findById: jest.fn((anId: OrganizationID) =>
        Promise.resolve(organization)
      ),
      update: jest.fn((anOrganization: Organization) =>
        Promise.resolve(updatedOrganization)
      ),
    };

    const useCase = new DefaultUpdateOrganizationUseCase(
      repository as OrganizationGatewayInterface
    );
    const res = await useCase.execute({
      id: organization.id.getValue(),
      title: expectedTitle,
      description: expectedDescription,
      imageUrl: expectedImageUrl,
    });

    expect(repository.findById).toHaveBeenCalledTimes(1)
    expect(repository.update).toHaveBeenCalledTimes(1)
    expect(res.isRight()).toBeTruthy();
    expect(res.get().id).toEqual(organization.id.getValue());
  });

  test("givenAInvalidOrganizationTitle_whenCallUpdate_thenReturnError", async () => {
    const expectedTitle = "";
    const expectedDescription = "Descrição da organização 02";
    const expectedImageUrl = "http://site.com/image.jpg";
    const expectedErrorCount = 1;
    const expectedErrorMessage = "'title' should not be null";

    const organization = Organization.create(
      "Organização 01",
      "Descrição da organização 01",
      "http://site.com/image-01.jpg"
    );

    expect(organization.title).not.toEqual(expectedTitle);
    expect(organization.description).not.toEqual(expectedDescription);
    expect(organization.imageUrl).not.toEqual(expectedImageUrl);

    const repository: Partial<OrganizationGatewayInterface> = {
      findById: jest.fn((anId: OrganizationID) =>
        Promise.resolve(organization)
      ),
      update: jest.fn(),
    };

    const useCase = new DefaultUpdateOrganizationUseCase(
      repository as OrganizationGatewayInterface
    );
    const res = await useCase.execute({
      id: organization.id.getValue(),
      title: expectedTitle,
      description: expectedDescription,
      imageUrl: expectedImageUrl,
    });

    const notification = res.getLeft();

    expect(repository.findById).toHaveBeenCalledTimes(1)
    expect(repository.update).not.toHaveBeenCalled()
    expect(res.isLeft()).toBeTruthy();
    expect(notification.getErrors()).toHaveLength(expectedErrorCount);
    expect(notification.firstError()).toHaveProperty(
      "message",
      expectedErrorMessage
    );
  });
});
