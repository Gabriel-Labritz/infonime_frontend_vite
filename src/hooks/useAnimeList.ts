import { useState, useEffect } from "react";
import api from "../utils/api";

interface AnimeItem {
  _id: string;
  title: string;
  anime_backdrop: string;
  seasons: number;
  episodes: number;
}

interface AnimeListResponse {
  animeList: { anime: AnimeItem }[];
}

interface ApiResponseMessage {
  message: string;
}

export function useAnimeList() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    fetchAnimeList();
  }, []);

  async function fetchAnimeList(): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get<AnimeListResponse>(`/users/mylist`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      const userCurrentAnimeList = response.data.animeList.map(
        (item) => item.anime
      );

      setAnimeList(userCurrentAnimeList);
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message);
    }
  }

  async function addToList(animeId: string): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.post<ApiResponseMessage>(
        `/users/add-to-list/${animeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      const newAnime: AnimeItem = {
        _id: animeId,
        title: "",
        anime_backdrop: "",
        seasons: 0,
        episodes: 0,
      };

      setAnimeList((prevList) => [...prevList, newAnime]);
      setSuccessMessage(response?.data?.message);
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message);
    }
  }

  async function removeFromList(animeId: string): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.post<ApiResponseMessage>(
        `/users/remove-to-list/${animeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      setAnimeList((prevList) =>
        prevList.filter((anime) => anime._id !== animeId)
      );
      setSuccessMessage(response.data?.message);
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message);
    }
  }

  function isAnimeAlreadyInList(animeId: string): boolean {
    return animeList.some((anime) => anime._id === animeId);
  }

  return {
    addToList,
    removeFromList,
    isAnimeAlreadyInList,
    animeList,
    error,
    successMessage,
  };
}
