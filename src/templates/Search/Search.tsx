import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimeSearch } from "../../hooks/useAnimeSearch";

import NavBar from "../../components/NavBar/NavBar";
import { AnimeCardSearch } from "../../components/AnimeCardSearch/AnimeCardSearch";
import { BiMessageRoundedError } from "react-icons/bi";

import "./Search.css";

function Search() {
  const { animes, error, query } = useAnimeSearch();
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
              <h3 className="error-title">
                {error} <BiMessageRoundedError size={30} />
              </h3>
              <p className="error-description">
                Tente procurar por outros títulos.
              </p>
            </div>
          </div>
        ) : animes.length > 0 ? (
          <>
            <div className="header-search">
              <h2 className="title-header-search">Melhores resultados!</h2>
            </div>

            <div className="list-anime-search">
              {animes.map((anime) => (
                <AnimeCardSearch key={anime._id} animeData={anime} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Search;
