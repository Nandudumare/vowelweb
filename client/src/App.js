import { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Register } from "./components/Register";
import RequiredAuth from "./components/RequiredAuth";
import Verified from "./components/Verified";
import VerifyId from "./components/VerifyId";

function App() {
  const [state, setState] = useState(false);

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
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth state={state} setState={setState}>
              <Home />
            </RequiredAuth>
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/verify" element={<Verified />} />
        <Route path="/verifyId" element={<VerifyId />} />
      </Routes>
    </div>
  );
}

export default App;
