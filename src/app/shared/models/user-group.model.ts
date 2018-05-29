export class UserGroup {
  _id: string;
  name: string;
  description: string;
  permissionScheme: {
    _id: any;
    name: string;
  };
  userCount: number;
}
