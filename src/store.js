import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import { headerDataReducer,  } from "./reducers/componentReducer";
import { homeScreenDetail } from './reducers/homeScreenReducer'

//combine all reducers here
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  headerDataReducer: headerDataReducer,
  homeData : homeScreenDetail,
});

//fetching from user Info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//define initial State here
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

//define middleware
const middleware = [thunk];

//create store with reducer and initialstate
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
