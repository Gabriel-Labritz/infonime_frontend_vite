import { useEffect, useState } from "react";
import { AnimeData } from "../utils-types/anime-data";
import api from "../utils/api";

interface AnimesResponseData {
  animes: AnimeData[];
}

export function useFetchAnimes() {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnimes();
  }, []);

  async function fetchAnimes() {
    try {
      const response = await api.get<AnimesResponseData>("/animes/all");

      if (!response.data || !Array.isArray(response.data.animes)) {
        throw new Error("Nenhum anime foi encontrado!");
      }

      setAnimes(response.data.animes);
      setError(null);
    } catch (error) {
      setError(
        (error as any).response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro tente novamente mais tarde.")
      );
    }
  }

  return { animes, error };
}
