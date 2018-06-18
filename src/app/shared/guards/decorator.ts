import { PermissionRole, IHasPermission, PermissionDecoratorKey } from './common';
import 'reflect-metadata';

function Permission(controller: string, role?: PermissionRole): ClassDecorator {
  const info: IHasPermission = {controller, role};
  return (target: object) => {
    Reflect.defineMetadata(PermissionDecoratorKey, info, target);
  };
}

export { Permission };
