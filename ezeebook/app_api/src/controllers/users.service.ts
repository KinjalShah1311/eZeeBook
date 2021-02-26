import {BaseUser} from '../models/users.interface'

import app from '../../../src/firebase'

const db = app.database().ref("/users");
class UsersDataService {
    getAllUsers() {
      return db;
    }

    getUser(key) {
        return db.child(key);
    }
  
    createUser(user) {
      return db.push(user);
    }
  
    updateUser(key,value:BaseUser) {
      return db.child(key).update(value);
    }
  
    deleteUser(key) {
      return db.child(key).remove();
    }
  
    deleteAllUsers() {
      return db.remove();
    }
  }
  
  export default new UsersDataService();

// let users: Users = {
//     1: {
//         uid: 1,
//         firstName: "Tushar",
        // lastName: "Khatri",
        // emailAddress: "tusharkhatri56@gmail.com",
        // password: "12345678",
        // createdAt: new Date(),
        // updatedAt: new Date(),
        // phoneNumber: "1234567890",
        // imageUrl: "https://cdn.pixabay.com/photo/2017/12/11/15/34/lion-3012515_960_720.jpg"
//     },
//     2: {
//         uid: 2,
//         firstName: "Kinjal",
//         lastName: "Shah",
//         emailAddress: "kinjalshah@gmail.com",
//         password: "87654321",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         phoneNumber: "6789012345",
//         imageUrl: "https://cdn.pixabay.com/photo/2017/12/11/15/34/lion-3012515_960_720.jpg"
//     }
// }

// export const getAllUsers = async (): Promise<User[]> => Object.values(users);

// export const getUser = async (id: number): Promise<User> => users[id];

// export const createUser = async (newUser: BaseUser): Promise<User> => {
    
//     const uid= new Date().valueOf();
//     const createdAt = new Date();
//     const updatedAt = new Date();

//     users[uid] = {
//         uid,
//         createdAt,
//         updatedAt,
//         ...newUser
//     };

//     return users[uid];
// }

// export const updateUser = async (uid: number, userUpdate: BaseUser): Promise<User | null> => {
//     const user = await getUser(uid);
//     const createdAt = user.createdAt;
//     const updatedAt = new Date();
//     if(!user) {
//         return null;
//     }

//     users[uid] = {uid,createdAt,updatedAt, ...userUpdate};

//     return users[uid];
// }

// export const removeUser = async (uid: number): Promise<null | void> =>{
//     const user = await getUser(uid);

//     if(!user) {
//         return null;
//     }

//     delete users[uid];
// }

