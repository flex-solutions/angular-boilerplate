
export class UserModel {
     /*
      * Define usermodel
      */
     uid: number;
     fullName: string;
     accountName: string;
     email: string;
     imagePath: string;
     position: string;

     loginCount: number;
     lastLogin: Date;
     previousLogin: Date;
     lastFailedLogin: Date;
     currentFailedLogin: number;
     totalFailedLogin: number;
}
