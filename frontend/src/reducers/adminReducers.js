import {
    PRODS_CREATE_FAIL,
    PRODS_CREATE_REQUEST,
    PRODS_CREATE_SUCCESS,
    PRODS_DELETE_FAIL,
    PRODS_DELETE_REQUEST,
    PRODS_DELETE_SUCCESS,
    PRODS_LIST_FAIL,
    PRODS_LIST_REQUEST,
    PRODS_LIST_SUCCESS,
    PRODS_UPDATE_FAIL,
    PRODS_UPDATE_REQUEST,
    PRODS_UPDATE_SUCCESS,
  } from "../constants/adminConstants";
  
  export const prodListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODS_LIST_REQUEST:
        return { loading: true };
      case PRODS_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const prodCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODS_CREATE_REQUEST:
        return { loading: true };
      case PRODS_CREATE_SUCCESS:
        return { loading: false, success: true };
      case PRODS_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const prodDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODS_DELETE_REQUEST:
        return { loading: true };
      case PRODS_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PRODS_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const prodUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODS_UPDATE_REQUEST:
        return { loading: true };
      case PRODS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case PRODS_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  