import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "./lib/contextlib";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/signin?redirect=${pathname}${search}`
        } />
      )} 


    </Route>
  );
}