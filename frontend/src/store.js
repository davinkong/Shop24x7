import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./reducers/notesReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  prodCreateReducer,
  prodDeleteReducer,
  prodListReducer,
  prodUpdateReducer,
} from "./reducers/adminReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderListReducer,
  orderUpdateReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  noteList: noteListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
  userUpdate: userUpdateReducer,
  prodList: prodListReducer,
  prodCreate: prodCreateReducer,
  prodDelete: prodDeleteReducer,
  prodUpdate: prodUpdateReducer,
  orderList: orderListReducer,
  orderCreate: orderCreateReducer,
  orderDelete: orderDeleteReducer,
  orderUpdate: orderUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;



const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  
};




const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
