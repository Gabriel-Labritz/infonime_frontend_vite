import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import { AnimeListProvider } from "./context/animeListContext";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./templates/Register/Register";
import Login from "./templates/Login/Login";
import Home from "./templates/Home/Home";
import Anime from "./templates/Anime/Anime";
import MyList from "./templates/MyList/MyList";
import Search from "./templates/Search/Search";
import Profile from "./templates/Profile/Profile";
import PrivateRouter from "./components/PrivateRouter/PrivateRoute";
import NotFound from "./templates/404/404";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <AnimeListProvider>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route element={<PrivateRouter />}>
                <Route path="/" element={<Home />} />
                <Route path="/anime/:id" element={<Anime />} />
                <Route path="/mylist" element={<MyList />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimeListProvider>
        </UserContextProvider>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        closeButton={false}
        transition={Slide}
        style={{ marginTop: "62px" }}
      />
    </>
  );
}

export default App;
