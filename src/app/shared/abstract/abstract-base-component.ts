import { IHasPermission } from '../guards/common';

// Define common behavior for Base component
export abstract class AbstractBaseComponent implements IHasPermission {

  private _canUpdate: boolean;
  public get canUpdate() {
    return this._canUpdate;
  }
  public set canUpdate(value) {
    this._canUpdate = value;
  }

  private _canInsert: boolean;
  public get canInsert() {
    return this._canInsert;
  }
  public set canInsert(value) {
    this._canInsert = value;
  }

  private _canDelete: boolean;
  public get canDelete() {
    return this._canDelete;
  }
  public set canDelete(value) {
    this._canDelete = value;
  }
  // lots of other reused stuff
}
