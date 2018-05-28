export class UserGroup {
  _id: string;
  name: string;
  description: string;
  users: string[];
  permissionScheme: string;
}

export class UserGroupScheme {
     id: string;
     groupName: string;
     permissionSchemeId: string;
     permissionScheme: string;
}
