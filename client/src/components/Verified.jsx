import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Verified = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const time = useRef();

  const fun = async () => {
    try {
      let res = await axios.post("http://localhost:8080/api/auth/verify", {
        id,
      });
    } catch (err) {}
  };

  useEffect(() => {
    fun();
  }, []);

  useEffect(() => {
    time.current = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(time.current);
  }, []);

  return <h1>your Id is Verified</h1>;
};

export default Verified;
