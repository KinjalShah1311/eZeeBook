import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../types';

export const loginUser = (email, password) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const { login } = useAuth();
    login(email, password)
    .then((x) => {
      history.push("/");
    })
    .catch((ex) => {
      setError("Incorrect Email or Password. Please try again!");
    });
}

export const getUserData = () => (dispatch) => {
  
}