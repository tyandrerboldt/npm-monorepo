import { UseCase } from "../../../core/use-case";

export abstract class GetOrganizationByIdUseCase extends UseCase<
  string,
  Promise<GetOrganizationByIdOutput>
> {}

export type GetOrganizationByIdOutput = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
