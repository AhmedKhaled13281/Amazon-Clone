import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SET_USER,
    ADD_TO_BASKET,
    REMOVE_FROM_BASKET,
    SET_BASKET_EMPTY
  } from "./actionTypes";

const initialState = {
    user : null,
    error : null,
    loading : false,
    basket : []
}


export const basketReducer = (state =  initialState , action) => {

    switch(action.type){
        case ADD_TO_BASKET :
            const existItem = state.basket.find(item => item.id === action.payload.id)
            const product = action.payload
            if(existItem)
            {
                return {...state , basket : [...state.basket.map(item => item.id === product.id ? {...item , amount : item.amount + 1} : item)]}
            }
            else{
                return {...state , basket : [...state.basket , {...product , amount : 1}]}
            }
        case REMOVE_FROM_BASKET :
            const existItemForDelete = state.basket.find(item => item.id === action.payload.id)
            const Product = action.payload
            const newBasket =  state.basket.filter(item => item.id !== Product.id)
            if(existItemForDelete.amount === 1){
                return {...state , basket : newBasket}
            }else{
                return {...state , basket : [...state.basket.map(item => item.id === Product.id ? {...item , amount : item.amount - 1} : item)]}
            }

        case SET_BASKET_EMPTY :
            return {...state , basket : []}
        default :
            return state
    }
}

export const authReducer = (state = initialState , action) => {

    switch (action.type) {
      case REGISTER_START:
      case LOGIN_START:
      case LOGOUT_START:
        return { ...state, loading: true };

      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return { ...state, loading: false, user: action.payload };

      case LOGOUT_SUCCESS:
        return { ...state, loading: false, user: null };

      case SET_USER:
        return { ...state, user: action.payload };

      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOGOUT_FAIL:
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
}