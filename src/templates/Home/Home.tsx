import { useFetchAnimes } from "../../hooks/useFetchAnimes";
import { useFetchAnimesByCategory } from "../../hooks/useFetchAnimesByCategory";
import { categories } from "../../api/categories";

// components
import AnimeBanner from "../../components/AnimeBanner/AnimeBanner";
import NavBar from "../../components/NavBar/NavBar";
import AnimeRow from "../../components/AnimeRow/AnimeRow";
import AnimeCard from "../../components/AnimeCard/AnimeCard";

import "./Home.css";

function Home() {
  const { animes, error } = useFetchAnimes();

  return (
    <div>
      <NavBar />
      <AnimeBanner data={animes} />
      {categories.map((category) => {
        const { animes } = useFetchAnimesByCategory(category);

        return (
          <AnimeRow
            key={category.category}
            categoryDisplayName={category.displayName}
            animes={animes}
          />
          // {animes?.map((anime) => (
          //   <AnimeCard key={anime._id} animeData={anime} />
          // ))}
        );
      })}
    </div>
  );
}

export default Home;
