import { Link } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import { useState } from "react";

import { IoMdClose, IoMdMenu } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

import "./NavBar.css";

function NavBar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout } = useUserContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="nav-container">
      <div className="nav-logo-area">
        <a href="/">
          <img src="../logo_052b647f68.png" alt="logo" />
        </a>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuVisible(!menuVisible)}
      >
        {menuVisible ? (
          <IoMdClose size={35} color="#a0a0a0" />
        ) : (
          <IoMdMenu size={35} color="#a0a0a0" />
        )}
      </button>

      <div className={`nav-menu ${menuVisible ? "open" : ""}`}>
        <Link to="#">
          <span>
            <IoBookmarkOutline size={20} /> Minha Lista
          </span>
        </Link>
        <Link to="#">
          <span>
            <IoIosSearch size={24} />
            Buscar
          </span>
        </Link>
        <Link to="#">
          <span>
            <FaRegUser size={19} />
            Perfil
          </span>
        </Link>
        <Link to="/login" onClick={handleLogout}>
          <span>
            <MdLogout size={23} /> Sair
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
