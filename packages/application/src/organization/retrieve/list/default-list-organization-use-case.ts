import { Pagination } from "@repo/domain/core/pagination/pagination";
import { SearchQuery } from "@repo/domain/core/pagination/search-query";
import { ValidationUtils } from "@repo/domain/core/utils/validation-utils";
import { Organization } from "@repo/domain/organization/organization.entity";
import { OrganizationGatewayInterface } from "@repo/domain/organization/organization.gateway";
import { ListOrganizationInput, ListOrganizationOutput, ListOrganizationUseCase } from "./list-organization-use-case";

export class DefaultListOrganizationUseCase extends ListOrganizationUseCase {
  constructor(private gateway: OrganizationGatewayInterface) {
    super();
    ValidationUtils.requireNonNull(gateway)
  }

  public async execute(
    aQuery: ListOrganizationInput
  ): Promise<Pagination<ListOrganizationOutput>> {
    let searchQuery: SearchQuery = {
      page: 0,
      perPage: 10,
      terms: "",
      sort: "",
      direction: "asc",
    };
    Object.assign(searchQuery, aQuery)
    const page = await this.gateway.findAll(searchQuery);
    return this.domainToOutput(page);
  }

  private domainToOutput(
    page: Pagination<Organization>
  ): Pagination<ListOrganizationOutput> {
    const { items } = page;
    const mappedItems = items.map((item) => {
      const {
        id,
        title,
        description,
        imageUrl,
        createdAt,
        updatedAt,
        deletedAt,
      } = item;
      return {
        id: id.getValue(),
        title,
        description,
        imageUrl,
        createdAt,
        updatedAt,
        deletedAt,
      } as ListOrganizationOutput;
    });
    return new Pagination(
      page.currentPage,
      page.perPage,
      page.total,
      mappedItems
    );
  }
}
