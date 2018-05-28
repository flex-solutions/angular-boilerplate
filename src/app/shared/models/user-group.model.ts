export class UserGroup {
  id: string;
  group_name: string;
  description: string;
  users: number[];
  schema_id: number;
}

export class UserGroupScheme {
     id: string;
     groupName: string;
     permissionSchemeId: string;
     permissionScheme: string;
}
