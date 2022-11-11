import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

const RequiredAuth = ({ children, state, setState }) => {
  //   const [state, setState] = useState(false);

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (id) {
      setState(true);
    }
  }, []);
  useLayoutEffect(() => {
    let id = localStorage.getItem("id");
    if (id) {
      setState(true);
    }
  }, []);

  let location = useLocation();

  if (state) return children;
  else return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default RequiredAuth;
