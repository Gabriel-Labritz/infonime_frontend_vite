import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

import "./404.css";

export default function NotFound() {
  return (
    <>
      <div className="not-found-container">
        <h2 className="not-found-title">404</h2>
        <p className="not-found-message">Oops! Página não encontrada.</p>
        <Link to={`/`} className="not-found-btn">
          Voltar
        </Link>

        <div className="not-found-img">
          <img src="../404.png" alt="Lost anime character" />
        </div>
      </div>
      <Footer />
    </>
  );
}
