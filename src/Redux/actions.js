import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  SET_BASKET_EMPTY
} from "./actionTypes";
import { auth } from "../utils/firebase";

// Register Actions
const registerStart = () => ({
  type: REGISTER_START,
});

const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

const registerFail = (error) => ({
  type: REGISTER_FAIL,
  payload: error,
});

// Login Actions
const loginStart = () => ({
    type: LOGIN_START,
  });

const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
  });

const loginFail = (error) => ({
    type: LOGIN_FAIL,
    payload: error,
  });

 // Logout Actions
const logoutStart = () => ({
    type: LOGIN_START,
  });

const logoutSuccess = () => ({
    type: LOGIN_SUCCESS,
  });

const logoutFail = (error) => ({
    type: LOGIN_FAIL,
    payload: error,
  });

// SetUser Action
export const setUser = (user) => ({
    type : SET_USER,
    payload : user
  })

// Add To Basket
export const addToBasket = (item) => ({
    type : ADD_TO_BASKET,
    payload : item
})

// Remove From Basket
export const removeFromBasket = (item) => ({
    type : REMOVE_FROM_BASKET,
    payload : item
})

// Clear The Basket
export const clearBasket = () => ({
    type : SET_BASKET_EMPTY
})

export const registerInit = (email, password) => {
  return (dispatch) => {
    dispatch(registerStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(registerSuccess(user));
      })
      .catch((error) => dispatch(registerFail(error)));
  };
};


export const loginInit = (email, password) => {
    return (dispatch) => {
      dispatch(loginStart());
      auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          console.log(user)
          dispatch(loginSuccess(user));
        })
        .catch((error) => {dispatch(loginFail(error.message))});
    };
  };


 export const logoutInit = () => {
    return (dispatch) => {
        dispatch(logoutStart());
        auth
          .signOut()
          .then(() => {
            dispatch(logoutSuccess());
          })
          .catch((error) => dispatch(logoutFail(error)));
      };
 }