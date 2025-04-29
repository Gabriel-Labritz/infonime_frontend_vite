import { AnimeData } from "../../utils-types/anime-data";
import { truncate } from "../../utils/truncate";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

import "./AnimeBanner.css";

interface AnimeBannerProps {
  animes: AnimeData[];
}

function AnimeBanner({ animes }: AnimeBannerProps) {
  const randomAnime =
    animes.length > 0
      ? animes[Math.floor(Math.random() * animes.length)]
      : null;

  const BASE_URL = import.meta.env.VITE_baseUrlImg;
  const backdropUrl = randomAnime
    ? `${BASE_URL}${randomAnime.anime_backdrop}`
    : "";

  return (
    <div className="anime-banner-container">
      {randomAnime && (
        <div
          className="background-container"
          style={{
            backgroundImage: `url(${backdropUrl})`,
          }}
        >
          <div className="horizontal-opacity">
            <div className="vertical-opacity">
              <div className="banner-content">
                <h1 className="anime-title">{randomAnime.title}</h1>

                <div className="anime-seasons">
                  <span>
                    {randomAnime.seasons > 1
                      ? `${randomAnime.seasons} temporadas`
                      : `${randomAnime.seasons} temporada`}
                  </span>
                </div>

                <p className="anime-synopsis">
                  {truncate(randomAnime.synopsis, 400)}
                </p>

                <button className="btn-anime-details">
                  <Link to={`/anime/${randomAnime._id}`}>
                    <GoPlus size={30} />
                    Ver detalhes
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimeBanner;
