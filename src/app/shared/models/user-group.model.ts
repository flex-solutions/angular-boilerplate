export class UserGroup {
  _id: string;
  groupName: string;
  description: string;
  permisionScheme: any;
  userCount: number;
}

export class UserGroupScheme {
     id: string;
     groupName: string;
     permissionSchemeId: string;
     permissionScheme: string;
}
