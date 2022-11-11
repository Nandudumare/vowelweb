import React, { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Verified = () => {
  const navigate = useNavigate();

  const time = useRef();

  useEffect(() => {
    time.current = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(time.current);
  }, []);

  return <h1>your Id is Verified</h1>;
};

export default Verified;
