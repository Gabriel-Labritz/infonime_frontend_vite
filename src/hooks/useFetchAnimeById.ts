import { useState, useEffect } from "react";
import { AnimeData } from "../utils-types/anime-data";
import api from "../utils/api";

interface AnimeResponseData {
  anime: AnimeData;
}

export function useFetchAnimeById(id: string | undefined) {
  const [anime, setAnime] = useState<AnimeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnimeById();
  }, [id]);

  async function fetchAnimeById() {
    if (!id) return;

    try {
      const response = await api.get<AnimeResponseData>(`/animes/${id}`);
      setAnime(response.data.anime);
      setError(null);
    } catch (error) {
      setError(
        (error as any)?.response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro tente novamente mais tarde.")
      );
    }
  }

  return { anime, error };
}
