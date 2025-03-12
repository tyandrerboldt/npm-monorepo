import { Either } from "../../core/tools/either";
import { UseCase } from "../../core/use-case";
import { NotificationHandler } from "@repo/domain/core/validation/handler/notification-handler";

export abstract class UpdateOrganizationUseCase extends UseCase<
  UpdateOrganizationInput,
  Promise<Either<NotificationHandler, UpdateOrganizationOutput>>
> {}

export type UpdateOrganizationInput = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export type UpdateOrganizationOutput = {
  id: string;
};
