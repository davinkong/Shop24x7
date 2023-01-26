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
  import axios from "axios";
  
  export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token} `,
        },
      };
  
      const { data } = await axios.get(`/api/orders`, config);
  
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };
 
  
  export const createOrderAction = (name, qty, price, email, isDelivered) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/orders/create`,
        { name, qty, price, email, isDelivered },
        config
      );
  
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteOrderAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/orders/${id}`, config);
  
      dispatch({
        type: ORDER_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDER_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateOrderAction = (id, name, qty, price, isDelivered) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: ORDER_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/orders/${id}`,
        { isDelivered },
        config
      );
  
      dispatch({
        type: ORDER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDER_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  