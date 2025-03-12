import { DefaultListOrganizationUseCase } from "../../../../organization/retrieve/list/default-list-organization-use-case";
import { IllegalStateException } from "@repo/domain/core/exception/illegal-state.exception";
import { Pagination } from "@repo/domain/core/pagination/pagination";
import { SearchQuery } from "@repo/domain/core/pagination/search-query";
import { Organization } from "@repo/domain/organization/organization.entity";
import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";

describe("DefaultListOrganizationUseCase", () => {
  test("givenAValidSearchQuery_whenCallList_thenReturnPagination", async () => {
    const organizations: Organization[] = [
      Organization.create(
        "Organização 01",
        "Descrição da organização 01",
        "http://site.com/image-01.jpg"
      ),
      Organization.create(
        "Organização 02",
        "Descrição da organização 02",
        "http://site.com/image-02.jpg"
      ),
    ];
    const expectedPage = 0;
    const expectedPerPage = 2;
    const expectedTerms = "";
    const expectedSort = "";
    const expectedDirection = "";
    const expectedTotal = organizations.length;

    const pagination = Pagination.from(
      expectedPage,
      expectedPerPage,
      organizations.length,
      organizations
    );

    const repository: Partial<OrganizationGatewayInterface> = {
      findAll: jest.fn((aQuery: SearchQuery) => Promise.resolve(pagination)),
    };

    const query: SearchQuery = {
      page: expectedPage,
      perPage: expectedPerPage,
      direction: expectedDirection,
      sort: expectedSort,
      terms: expectedTerms,
    };

    const useCase = new DefaultListOrganizationUseCase(
      repository as OrganizationGatewayInterface
    );
    const res = await useCase.execute(query);

    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(res.total).toEqual(expectedTotal);
    expect(res.perPage).toEqual(expectedPerPage);
    expect(res.currentPage).toEqual(expectedPage);
    expect(res.items.length).toEqual(expectedPerPage);
  });

  test("givenAValidSearchQuery_whenHasNoResult_thenReturnEmptyPagination", async () => {
    const organizations: Organization[] = [];
    const expectedPage = 0;
    const expectedPerPage = 2;
    const expectedTerms = "";
    const expectedSort = "createdAt";
    const expectedDirection = "asc";
    const expectedTotal = 0;

    const pagination = Pagination.from(
      expectedPage,
      expectedPerPage,
      organizations.length,
      organizations
    );

    const repository: Partial<OrganizationGatewayInterface> = {
      findAll: jest.fn((aQuery: SearchQuery) => Promise.resolve(pagination)),
    };

    const query: SearchQuery = {
      page: expectedPage,
      perPage: expectedPerPage,
      direction: expectedDirection,
      sort: expectedSort,
      terms: expectedTerms,
    };

    const useCase = new DefaultListOrganizationUseCase(
      repository as OrganizationGatewayInterface
    );
    const res = await useCase.execute(query);

    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(res.total).toEqual(expectedTotal);
    expect(res.perPage).toEqual(expectedPerPage);
    expect(res.currentPage).toEqual(expectedPage);
    expect(res.items.length).toEqual(organizations.length);
  });

  test("givenAValidSearchQuery_whenGatewayThrowsException_thenShouldReturnException", async () => {
    const expectedPage = 0;
    const expectedPerPage = 2;
    const expectedTerms = "";
    const expectedSort = "createdAt";
    const expectedDirection = "asc";
    const expectedErrorMessage = "Gateway error";

    const repository: Partial<OrganizationGatewayInterface> = {
      findAll: jest.fn((aQuery: SearchQuery) => {
        throw new IllegalStateException(expectedErrorMessage);
      }),
    };

    const query: SearchQuery = {
      page: expectedPage,
      perPage: expectedPerPage,
      direction: expectedDirection,
      sort: expectedSort,
      terms: expectedTerms,
    };

    try {
      const useCase = new DefaultListOrganizationUseCase(
        repository as OrganizationGatewayInterface
      );
      await useCase.execute(query);
      throw new Error("Not validated");
    } catch (error) {
      expect(repository.findAll).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(IllegalStateException);
      expect(error).toHaveProperty("message", expectedErrorMessage);
    }
  });
});
