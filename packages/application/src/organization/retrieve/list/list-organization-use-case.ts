import { UseCase } from "../../../core/use-case";
import { Pagination } from "@repo/domain/core/pagination/pagination";

export abstract class ListOrganizationUseCase extends UseCase<
  ListOrganizationInput,
  Promise<Pagination<ListOrganizationOutput>>
> {}

export type ListOrganizationInput = {
  page?: number;
  perPage?: number;
  terms?: string;
  direction?: string;
  sort?: string;
};

export type ListOrganizationOutput = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
