import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchAnimeById } from "../../hooks/useFetchAnimeById";
import { useAnimeListContext } from "../../hooks/useAnimeListContext";
import { formatSeasonsEpisodes } from "../../utils/format-seasons-episodes";

// Components
import NavBar from "../../components/NavBar/NavBar";
import { AnimeBackground } from "../../components/AnimeBackground/AnimeBackground";
import AnimeRateModal from "../../components/AnimeRateModal/AnimeRateModal";
import AnimeCategoriesMeta from "../../components/AnimeCategorieMeta/AnimeCategoriesMeta";
import AnimeDetailsTable from "../../components/AnimeDetailsTable/AnimeDetailsTable";
import Comments from "../../components/Comments/Comments";
import { LuBookmarkPlus } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaStar, FaTrash } from "react-icons/fa";

import "./Anime.css";
import PageNotFound from "../404/404";

function Anime() {
  const { id } = useParams();
  const { anime, error } = useFetchAnimeById(id);
  const { addToList, removeFromList, isAnimeAlreadyInList, fetchAnimeList } =
    useAnimeListContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_baseUrlImg;
  const imageUrl = `${BASE_URL}${anime?.anime_backdrop}`;
  const imageUrlPoster = `${BASE_URL}${anime?.anime_poster}`;

  const isInList = anime ? isAnimeAlreadyInList(anime._id) : false;

  useEffect(() => {
    fetchAnimeList();
  }, []);

  const handleListAction = async () => {
    if (!anime) return;

    if (isInList) {
      await removeFromList(anime._id);
    } else {
      await addToList(anime._id, anime);
    }

    await fetchAnimeList();
  };

  return (
    <>
      {error ? (
        <PageNotFound error={error} />
      ) : (
        <>
          <NavBar />
          <div className="anime-page-container">
            <AnimeBackground
              animeTitle={anime?.title}
              animeBackdrop={imageUrl}
            />

            <div className="anime-body-area">
              <div className="anime-content">
                <div className="animes-infos-container">
                  <h2 className="anime-title-info">{anime?.title}</h2>

                  <div className="rating-info">
                    <h4>
                      <FaStar size={30} color="#FFD300" />{" "}
                      {anime?.rating?.toFixed(1) || "N/A"}
                      <span
                        className="rate-anime"
                        onClick={() => setIsModalOpen(true)}
                      >
                        avaliar
                      </span>
                    </h4>
                  </div>

                  {anime && (
                    <AnimeRateModal
                      animeId={anime._id}
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                    />
                  )}

                  <div className="anime-seasons-infos">
                    {formatSeasonsEpisodes(anime?.seasons, anime?.episodes)}
                  </div>

                  {isInList ? (
                    <button
                      className="button-add-list"
                      onClick={handleListAction}
                    >
                      <FaTrash size={18} />
                      Remover da lista
                    </button>
                  ) : (
                    <button
                      className="button-add-list"
                      onClick={handleListAction}
                    >
                      <LuBookmarkPlus size={23} />
                      Adicionar a lista
                    </button>
                  )}

                  <div
                    className={`anime-synopsis-wrapper ${
                      isExpanded ? "expanded" : ""
                    }`}
                  >
                    <p className="anime-synopsis-info">
                      {anime?.synopsis || "Sinopse Indisponível"}
                    </p>
                    {!isExpanded && <div className="fade-overlay"></div>}
                  </div>

                  <div className="see-more-details">
                    <button
                      className="button-show-more"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Mostrar menos" : "Mostrar mais"}
                      {isExpanded ? (
                        <IoIosArrowUp size={20} />
                      ) : (
                        <IoIosArrowDown size={20} />
                      )}
                    </button>

                    {isExpanded && anime && (
                      <div className="anime-extra-details">
                        <AnimeCategoriesMeta
                          categories={anime?.category || []}
                        />

                        <AnimeDetailsTable animeData={anime} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="anime-poster-area">
                  <img src={imageUrlPoster} alt={anime?.title} />
                </div>
              </div>

              {anime && (
                <Comments animeId={anime?._id} animeTitle={anime?.title} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Anime;
