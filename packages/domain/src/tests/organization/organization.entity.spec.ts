import { DomainException } from "../../core/exception/domain.exception";
import { ThrowsValidationHandler } from "../../core/validation/handler/throws-validation-handler";
import { Organization } from "../../organization/organization.entity";

describe("Organization", () => {
  test("givenAValidParams_whenCallCreate_thenInstantiateAOrganization", () => {
    const expectedName = "Organização 01";
    const expectedDescription = "Descrição da organização 01";
    const expectedImageUrl = "http://site.com/image.jpg";

    const organization = Organization.create(
      expectedName,
      expectedDescription,
      expectedImageUrl
    );

    expect(organization.title).toBe(expectedName);
    expect(organization.description).toBe(expectedDescription);
    expect(organization.imageUrl).toBe(expectedImageUrl);
    expect(organization.createdAt).not.toBeNull();
    expect(organization.updatedAt).not.toBeNull();
    expect(organization.deletedAt).toBeUndefined();
  });

  test("givenAnInvalidNullTitle_whenCallCreateAndValidate_thenShouldReceiveError", () => {
    const expectedName = "";
    const expectedDescription = "Descrição da organização 01";
    const expectedImageUrl = "http://site.com/image.jpg";

    const organization = Organization.create(
      expectedName,
      expectedDescription,
      expectedImageUrl
    );

    try {
      organization.validate(new ThrowsValidationHandler());
      throw new Error("Not validated");
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
      expect(error.message).toBe("'title' should not be null");
    }
  });

  test("givenAnInvalidTitleLengthLessThan3_whenCallCreateAndValidate_thenShouldReceiveError", () => {
    const expectedName = "A";
    const expectedDescription = "Descrição da organização 01";
    const expectedImageUrl = "http://site.com/image.jpg";

    const organization = Organization.create(
      expectedName,
      expectedDescription,
      expectedImageUrl
    );

    try {
      organization.validate(new ThrowsValidationHandler());
      throw new Error("Not validated");
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
      expect(error.message).toBe("'title' must be greater than 3 characteres");
    }
  });

  test("givenAnInvalidTitleLengthMoreThan100_whenCallCreateAndValidate_thenShouldReceiveError", () => {
    const expectedName =
      "Gostaria de enfatizar que o consenso sobre a necessidade de qualificação auxilia a preparação e " +
      "a composição das posturas dos órgãos dirigentes com relação às suas atribuições.";
    const expectedDescription = "Descrição da organização 01";
    const expectedImageUrl = "http://site.com/image.jpg";

    const organization = Organization.create(
      expectedName,
      expectedDescription,
      expectedImageUrl
    );

    try {
      organization.validate(new ThrowsValidationHandler());
      throw new Error("Not validated");
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
      expect(error.message).toBe("'title' must be between 4 and 100 characters");
    }
  });

  test("givenAValidParams_whenCallUpdate_thenUpdateAOrganization", () => {
    const organization = Organization.create(
      "Organização",
      "Desc organização",
      "http://s"
    );

    const expectedName = "Organização 01";
    const expectedDescription = "Descrição da organização 01";
    const expectedImageUrl = "http://site.com/image.jpg";

    const actualOrganization = organization.update(
      expectedName,
      expectedDescription,
      expectedImageUrl
    );
    expect(actualOrganization.title).toBe(expectedName);
    expect(actualOrganization.description).toBe(expectedDescription);
    expect(actualOrganization.imageUrl).toBe(expectedImageUrl);
    expect(actualOrganization.createdAt).toBe(organization.createdAt);
    expect(actualOrganization.deletedAt).toBeUndefined();
  });

  test("givenACreatedOrganization_whenCallDelete_thenDeleteAOrganization", () => {
    const organization = Organization.create(
      "Organização 01",
      "Descrição da organização 01",
      "http://site.com/image.jpg"
    );
    const actualOrganization = organization.delete();
    expect(actualOrganization.deletedAt).toBeDefined();
  });
});
