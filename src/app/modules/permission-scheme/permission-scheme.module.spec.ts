import { PermissionSchemeModule } from './permission-scheme.module';

describe('PermissionSchemeModule', () => {
  let permissionSchemeModule: PermissionSchemeModule;

  beforeEach(() => {
    permissionSchemeModule = new PermissionSchemeModule();
  });

  it('should create an instance', () => {
    expect(permissionSchemeModule).toBeTruthy();
  });
});
