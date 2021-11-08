import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  const isAuth = (props) => {
    return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
  };

  return <Route {...rest} render={isAuth}></Route>;
}
