enum PermissionRole {
  ReadOnly = 0,
  Insert,
  Update,
  Delete,
  FullControl
}

interface IPermissionModule {
  module: string;
  role?: PermissionRole;
}

interface IHasPermission {
  canUpdate: boolean;
  canInsert: boolean;
  canDelete: boolean;
}

const PermissionDecoratorKey = '__permissionDecorator__';

export { PermissionRole, IPermissionModule, IHasPermission, PermissionDecoratorKey };
