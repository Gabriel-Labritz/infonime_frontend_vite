import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchAnimeById } from "../../hooks/useFetchAnimeById";
import { useAnimeListContext } from "../../hooks/useAnimeListContext";
import { formatSeasonsEpisodes } from "../../utils/format-seasons-episodes";

// Components
import NavBar from "../../components/NavBar/NavBar";
import AnimeBackground from "../../components/AnimeBackground/AnimeBackground";
import AnimeRateModal from "../../components/AnimeRateModal/AnimeRateModal";
import AnimeCategoriesMeta from "../../components/AnimeCategorieMeta/AnimeCategoriesMeta";
import AnimeDetailsTable from "../../components/AnimeDetailsTable/AnimeDetailsTable";
import Comments from "../../components/Comments/Comments";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import RatingInfo from "../../components/RatingInfo/RatingInfo";
import ListActionButton from "../../components/ListActionButton/ListActionButton";
import SynopsisSection from "../../components/SynopsisSection/SynopsisSection";

import "./Anime.css";

function Anime() {
  const { id } = useParams();
  const { anime, error, isLoading } = useFetchAnimeById(id);
  const { addToList, removeFromList, isAnimeAlreadyInList, fetchAnimeList } =
    useAnimeListContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_baseUrlImg;
  const imageUrlBackdrop = `${BASE_URL}${anime?.anime_backdrop}`;
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

    // ⚠️ Aguarde o setAnimeList atualizar antes de refazer a lista
    await fetchAnimeList();
  };

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && anime && (
        <>
          <NavBar />
          <div className="anime-page-container">
            <AnimeBackground
              animeTitle={anime.title}
              animeBackdrop={imageUrlBackdrop}
            />

            <div className="anime-body-area">
              <div className="anime-content">
                <div className="animes-infos-container">
                  <h2 className="anime-title-info">{anime.title}</h2>

                  <RatingInfo
                    rating={anime.rating}
                    onOpenModal={() => setIsModalOpen(true)}
                  />

                  <AnimeRateModal
                    animeId={anime._id}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />

                  <div className="anime-seasons-infos">
                    {formatSeasonsEpisodes(anime.seasons, anime.episodes)}
                  </div>

                  <ListActionButton
                    isInList={isInList}
                    onClick={handleListAction}
                  />

                  <SynopsisSection
                    synopsis={anime.synopsis}
                    isExpanded={isExpanded}
                    onToggle={() => setIsExpanded(!isExpanded)}
                  />

                  {isExpanded && (
                    <div className="anime-extra-details">
                      <AnimeCategoriesMeta categories={anime.category} />
                      <AnimeDetailsTable anime={anime} />
                    </div>
                  )}
                </div>

                <div className="anime-poster-area">
                  <img src={imageUrlPoster} alt={anime.title} />
                </div>
              </div>

              <Comments animeId={anime._id} animeTitle={anime.title} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Anime;
