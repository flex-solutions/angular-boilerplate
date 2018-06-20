import { PermissionRole, IPermissionModule, PermissionDecoratorKey } from './common';
import 'reflect-metadata';

function Permission(permissionModule: IPermissionModule): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(PermissionDecoratorKey, permissionModule, target);
  };
}

export { Permission };
