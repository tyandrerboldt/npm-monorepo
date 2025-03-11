import { Pagination } from "../core/pagination/pagination";
import { SearchQuery } from "../core/pagination/search-query";
import { OrganizationID } from "./organization-id";
import { Organization } from "./organization.entity";

export interface OrganizationGatewayInterface {
  create(aOrganization: Organization): Promise<Organization>;

  deleteById(anId: OrganizationID): Promise<void>;

  findById(anId: OrganizationID): Promise<Organization>;

  update(aOrganization: Organization): Promise<Organization>;

  findAll(aQuery: SearchQuery): Promise<Pagination<Organization>>;
}
