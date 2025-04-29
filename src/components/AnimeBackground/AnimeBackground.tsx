import "./AnimeBackground.css";

interface AnimeBackgroundProps {
  animeTitle: string;
  animeBackdrop: string;
}

export default function AnimeBackground({
  animeTitle,
  animeBackdrop,
}: AnimeBackgroundProps) {
  return (
    <div className="anime-background-area">
      <img
        className="anime-background-img"
        src={animeBackdrop}
        alt={animeTitle}
      />
      <img
        className="anime-backdrop-img"
        src={animeBackdrop}
        alt={animeTitle}
      />
    </div>
  );
}
