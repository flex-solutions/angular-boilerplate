interface IUserModel {
    _id: any;
    username: string;
    fullname: string;
    email: string;
    userGroup: {
        _id: any;
        name: string;
    };
}

export { IUserModel };
