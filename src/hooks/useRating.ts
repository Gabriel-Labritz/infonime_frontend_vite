import { useState } from "react";
import api from "../utils/api";

interface RateAnimeResponse {
  message: string;
  anime: {
    _id: string;
    title: string;
    rating: number;
    ratingCount: number;
  };
}

export function useRating() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function rateAnime(
    animeId: string,
    rating: number
  ): Promise<number | undefined> {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Usuário não autenticado!");
        return;
      }

      const response = await api.post<RateAnimeResponse>(
        `/users/rate/${animeId}`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
      return response.data.anime.rating;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Erro ao avaliar esse anime !";
      setError(errorMsg);
      return;
    }
  }

  return { rateAnime, successMessage, setSuccessMessage, error };
}
