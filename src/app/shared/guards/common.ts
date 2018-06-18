enum PermissionRole {
  ReadOnly = 0,
  Insert,
  Update,
  Delete,
  FullControl
}

interface IHasPermission {
  module: string;
  role: PermissionRole;
}

const PermissionDecoratorKey = '__permissionDecorator__';

export { PermissionRole, IHasPermission, PermissionDecoratorKey };
