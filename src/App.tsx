import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.scss";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";

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
      <ToastContainer autoClose={2000} style={{ top: "10px" }} />
    </BrowserRouter>
  );
};

export default App;
