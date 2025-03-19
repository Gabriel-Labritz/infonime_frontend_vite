import { FiPlay } from "react-icons/fi";
import { LuBookmarkPlus } from "react-icons/lu";
import { AnimeData } from "../../utils-types/anime-data";
import { truncate } from "../../utils/truncate";

import "./AnimeBanner.css";
import { Link } from "react-router-dom";

interface AnimeBannerProps {
  data: AnimeData[];
}

function AnimeBanner({ data }: AnimeBannerProps) {
  const randomAnime =
    data.length > 0 ? data[Math.floor(Math.random() * data.length)] : null;

  const BASE_URL = import.meta.env.VITE_baseUrlImg;
  const imageUrl = randomAnime
    ? `${BASE_URL}${randomAnime.anime_backdrop}`
    : "";

  return (
    <div className="anime-banner-container">
      {randomAnime ? (
        <div
          className="background-container"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <div className="horizontal-opacity">
            <div className="vertical-opacity">
              <div className="banner-content">
                <h1 className="anime-title">{randomAnime.title}</h1>
                <div className="anime-seasons">
                  <span>
                    {parseInt(randomAnime.seasons) > 1
                      ? `${randomAnime.seasons} temporadas`
                      : `${randomAnime.seasons} temporada`}{" "}
                  </span>
                </div>

                <p className="anime-synopsis">
                  {truncate(randomAnime.synopsis, 400)}
                </p>

                <div className="buttons-area">
                  <button className="btn-anime-details">
                    <Link to={`/anime/${randomAnime._id}`}>
                      <FiPlay size={22} />
                      Ver detalhes
                    </Link>
                  </button>

                  <button className="btn-anime-addlist">
                    <LuBookmarkPlus size={22} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default AnimeBanner;
