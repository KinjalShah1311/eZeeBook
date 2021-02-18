export interface BaseUser {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    phoneNumber: string;
    imageUrl: string;
}

export interface User extends BaseUser {
    uid: string;
    createdAt: Date;
}

export interface Users {
    [key: number]: User;
}