import { useFetchAnimes } from "../../hooks/useFetchAnimes";
import { useFetchAnimesByCategory } from "../../hooks/useFetchAnimesByCategory";
import { categories } from "../../api/categories";

// components
import AnimeBanner from "../../components/AnimeBanner/AnimeBanner";
import NavBar from "../../components/NavBar/NavBar";
import AnimeRow from "../../components/AnimeRow/AnimeRow";

import "./Home.css";

function Home() {
  const { animes } = useFetchAnimes();

  return (
    <div>
      <NavBar />
      <AnimeBanner data={animes} />
      {categories.map((category) => {
        const { animes } = useFetchAnimesByCategory(category);

        return (
          <AnimeRow
            key={category.displayName}
            categoryDisplayName={category.displayName}
            animes={animes}
          />
        );
      })}
    </div>
  );
}

export default Home;
