import { useFetchAnimes } from "../../hooks/useFetchAnimes";
import { categories } from "../../api/categories";

// components
import AnimeBanner from "../../components/AnimeBanner/AnimeBanner";
import NavBar from "../../components/NavBar/NavBar";
import AnimeRow from "../../components/AnimeRow/AnimeRow";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

function Home() {
  const { animes, isLoading, error } = useFetchAnimes();

  return (
    <>
      <NavBar />
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <>
          <AnimeBanner animes={animes} />
          {categories.map((category) => {
            return <AnimeRow key={category.displayName} category={category} />;
          })}
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
