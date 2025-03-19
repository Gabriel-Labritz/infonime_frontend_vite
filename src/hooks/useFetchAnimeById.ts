import { useState, useEffect } from "react";
import api from "../utils/api";
import { AnimeData } from "../utils-types/anime-data";

export function useFetchAnimeById(id: string | undefined) {

    const [anime ,setAnime] = useState<AnimeData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAnimeById();
    }, [id]);

    async function fetchAnimeById() {
        try {
            if(!id) return;
            
            const response = await api.get(`/animes/${id}`);
            setAnime(response.data.anime);
        } catch (error) {
            setError('Erro ao buscar anime!');
            console.error('Erro na requisição:', error);
        }
    }

    return { anime, error };
}