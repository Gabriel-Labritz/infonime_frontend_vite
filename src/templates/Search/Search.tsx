import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimeSearch } from "../../hooks/useAnimeSearch";

import NavBar from "../../components/NavBar/NavBar";
import { AnimeCardSearch } from "../../components/AnimeCardSearch/AnimeCardSearch";
import Loading from "../../components/Loading/Loading";
import Footer from "../../components/Footer/Footer";

import "./Search.css";

function Search() {
  const { animes, error, isLoading, query } = useAnimeSearch();
  const [searchValue, setSearchValue] = useState(query || "");
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchValue.trim().length >= 3) {
        navigate(`/search?q=${searchValue}`);
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, navigate]);

  return (
    <>
      <NavBar />
      {isLoading && <Loading />}
      <div className="search-container">
        <div className="search-content">
          <div className="search-field-area">
            <div className="search-field-container">
              <div className="search-input">
                <input
                  type="search"
                  placeholder="Buscar"
                  name="q"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="search-not-found-area">
            <div className="search-error-content">
              <h3 className="error-title">{error}</h3>
              <p className="error-description">
                Tente procurar por outros títulos.
              </p>
            </div>
          </div>
        ) : (
          animes.length > 0 && (
            <>
              <div className="header-search">
                <h2 className="title-header-search">Melhores resultados!</h2>
              </div>

              <div className="list-anime-search">
                {animes.map((anime) => (
                  <AnimeCardSearch key={anime._id} anime={anime} />
                ))}
              </div>
            </>
          )
        )}
      </div>
      <Footer />
    </>
  );
}

export default Search;
