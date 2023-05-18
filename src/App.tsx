import React, { useContext } from "react";
import "./App.scss";
import Welcome from "./pages/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";

const App: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={currentUser ? <Home /> : <Welcome />} />
          <Route path="login" element={<Welcome />} />
          <Route path="register" element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
