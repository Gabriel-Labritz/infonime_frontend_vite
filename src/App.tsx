import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./context/userContext";
import { AnimeListProvider } from "./context/animeListContext";

import Register from "./templates/Register/Register";
import Login from "./templates/Login/Login";
import Home from "./templates/Home/Home";
import Anime from "./templates/Anime/Anime";
import MyList from "./templates/MyList/MyList";
import Search from "./templates/Search/Search";
import PrivateRouter from "./components/PrivateRouter/PrivateRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <AnimeListProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRouter />}>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:id" element={<Anime />} />
              <Route path="/mylist" element={<MyList />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
        </AnimeListProvider>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
