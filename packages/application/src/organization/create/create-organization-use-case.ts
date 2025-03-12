import { NotificationHandler } from "@repo/domain/core/validation/handler/notification-handler";
import { Either } from "../../core/tools/either";
import { UseCase } from "../../core/use-case";

export abstract class CreateOrganizationUseCase extends UseCase<
  CreateOrganizationInput,
  Promise<Either<NotificationHandler, CreateOrganizationOutput>>
> { }

export type CreateOrganizationInput = {
  title: string;
  description: string;
  imageUrl: string;
};

export type CreateOrganizationOutput = {
  id: string;
};
