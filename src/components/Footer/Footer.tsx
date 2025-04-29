import { FaGithub, FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";

import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-header">
        Projeto desenvolvido por @gabriel-labritz
      </div>

      <div className="social-media-area">
        <a href="https://github.com/Gabriel-Labritz">
          <span>
            <FaGithub size={22} /> GitHub
          </span>
        </a>

        <a href="https://br.linkedin.com/in/gabriel-labritz-199499229">
          <span>
            <IoLogoLinkedin size={25} /> Linkedin
          </span>
        </a>

        <a href="https://www.instagram.com/litz_gabriel/">
          <span>
            <FaInstagram size={22} /> Instagram
          </span>
        </a>
      </div>
    </div>
  );
}
