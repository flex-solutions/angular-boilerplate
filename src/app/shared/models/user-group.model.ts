export class UserGroup {
  id: string;
  groupName: string;
  description: string;
  users: number[];
  permisionScheme: any;
  userCount: number;
}

export class UserGroupScheme {
     id: string;
     groupName: string;
     permissionSchemeId: string;
     permissionScheme: string;
}
