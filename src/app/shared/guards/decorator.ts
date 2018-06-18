import { PermissionRole, IHasPermission, PermissionDecoratorKey } from './common';
import 'reflect-metadata';

function Permission(module: string, role?: PermissionRole): ClassDecorator {
  const info: IHasPermission = {module, role};
  return (target: object) => {
    Reflect.defineMetadata(PermissionDecoratorKey, info, target);
  };
}

export { Permission };
