import React from "react";
import { Route, Redirect, Router } from "react-router-dom";
// import { useUserContext } from "../context/user_context";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  const userLogin = useSelector(state => state.userLogin)

  const { error, loading, userInfo } = userLogin
  // const { isLogin, logintoken,logindata } = useUserContext();

  window.scrollTo(0, 0)
  console.log(children);
  console.log(rest); 
  //check user have logged in or not not from user context but auth0
  return (
    <Route
      {...rest}
      render={() => {
        return  userInfo  ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
