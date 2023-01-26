import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_UPDATE_FAIL,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
  } from "../constants/orderConstants";
  
  export const orderListReducer = (state = { notes: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, notes: action.payload };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true };
      case ORDER_CREATE_SUCCESS:
        return { loading: false, success: true };
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return { loading: true };
      case ORDER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ORDER_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const orderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_UPDATE_REQUEST:
        return { loading: true };
      case ORDER_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case ORDER_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  