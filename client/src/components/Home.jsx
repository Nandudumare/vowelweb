import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [detail, setDetail] = useState({});

  let id = localStorage.getItem("id");
  async function getDetails() {
    try {
      let res = await axios.get(`http://localhost:8080/api/auth/getuser/${id}`);
      console.log("res:", res);
      setDetail({ ...res.data });
    } catch (err) {}
  }
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <h2>Email : {detail.email}</h2>
      <h2>Username : {detail.username}</h2>
      <h2>Password : {detail.password}</h2>
    </div>
  );
};

export default Home;
