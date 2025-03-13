import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "../src/context/userContext";

import Register from "./templates/Register/register";
import Login from "./templates/Login/Login";
import Home from "./templates/Home/Home";
import Anime from "./templates/Anime/Anime";
import PrivateRouter from "./components/PrivateRouter/PrivateRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<Anime />} />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
