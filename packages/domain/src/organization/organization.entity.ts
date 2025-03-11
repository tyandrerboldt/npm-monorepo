import { AggregateRoot } from "../core/aggregate-root";
import { DateUtils } from "../core/utils/date-utils";
import { ValidationUtils } from "../core/utils/validation-utils";
import { ValidationHandler } from "../core/validation/validation-handler";
import { OrganizationID } from "./organization-id";
import { OrganizationValidator } from "./organization-validator";

export class Organization extends AggregateRoot<OrganizationID> {
  private _title: string;
  private _description: string;
  private _imageUrl: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt?: Date;

  constructor(
    anId: OrganizationID,
    aTitle: string,
    aDescription: string,
    aImageUrl: string,
    aCreatetionDate: Date,
    aUpdateDate: Date,
    aDeleteDate?: Date
  ) {
    super(anId);
    this._title = aTitle;
    this._description = aDescription;
    this._imageUrl = aImageUrl;
    this._createdAt = ValidationUtils.requireNonNull(
      aCreatetionDate,
      "'createdAt' should not be null"
    );
    this._updatedAt = ValidationUtils.requireNonNull(
      aUpdateDate,
      "'updatedAt' should not be null"
    );
    this._deletedAt = aDeleteDate;
  }

  static create(aTitle: string, aDescription: string, aImageUrl: string) {
    return new Organization(
      OrganizationID.unique(),
      aTitle,
      aDescription,
      aImageUrl,
      DateUtils.now(),
      DateUtils.now()
    );
  }

  static createWithId(aId: OrganizationID, aTitle: string, aDescription: string, aImageUrl: string) {
    return new Organization(
      aId,
      aTitle,
      aDescription,
      aImageUrl,
      DateUtils.now(),
      DateUtils.now()
    );
  }

  validate(handler: ValidationHandler): void {
    new OrganizationValidator(this, handler).validate();
  }

  update(aTitle: string, aDescription: string, aImageUrl: string) {
    this._title = aTitle;
    this._description = aDescription;
    this._imageUrl = aImageUrl;
    this._updatedAt = DateUtils.now();
    return this;
  }

  delete() {
    this._deletedAt = DateUtils.now();
    return this;
  }

  get id() {
    return this._id;
  }

  set id(val: OrganizationID) {
    this._id = val;
  }

  get title() {
    return this._title;
  }

  set title(val: string) {
    this._title = val;
  }

  get description() {
    return this._description;
  }

  set description(val: string) {
    this._description = val;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  set imageUrl(val: string) {
    this._imageUrl = val;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(val: Date) {
    this._createdAt = val;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(val: Date) {
    this._updatedAt = val;
  }

  get deletedAt() {
    return this._deletedAt;
  }

  set deletedAt(val: Date | undefined) {
    this._deletedAt = val;
  }
}
