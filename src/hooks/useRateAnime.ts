import { useState } from "react";
import api from "../utils/api";

interface RateAnimeResponseProps {
  message: string;
  anime: {
    _id: string;
    title: string;
    rating: number;
    ratingCount: number;
  };
}

export function useRateAnime() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function rateAnime(animeId: string, rating: number) {
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");
      const headers = token
        ? { Authorization: `Bearer ${JSON.parse(token)}` }
        : {};

      const response = await api.post<RateAnimeResponseProps>(
        `/users/rate/${animeId}`,
        { rating },
        {
          headers,
        }
      );

      setSuccessMessage(response.data.message);
      return response.data.anime;
    } catch (error: any) {
      setError(error.response?.data?.message || "Erro ao enviar avaliação.");
    }
  }

  return { rateAnime, successMessage, setSuccessMessage, error };
}
