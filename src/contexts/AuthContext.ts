import * as React from "react";

export const AuthContext = React.createContext({
  authenticated: true,
  email: '',
  password: ''
});

// const AuthProvider: React.FC = ({ children }) => {
//   const [todos, setTodos] = React.useState<IAuth>({
//     email: "post 1",
//     password: "this",
//   });
 

  
// };

//export default AuthProvider;
