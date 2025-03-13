import { useEffect, useState} from 'react';
import api from '../utils/api';

interface AnimeData {
    _id: string;
    title: string;
    synopsis: string;
    episodes: string;
    seasons: string;
    category: Array<string>;
    release_date: number;
    anime_poster: string;
    anime_backdrop: string;
    distributor: string;
    audio: string;
    content_classification: string;
    rating: number
}

export function useFetchAnimes() {
    const [animes, setAnimes] = useState<AnimeData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAnimes();
    }, []);

    async function fetchAnimes() {
        try {
            const response = await api.get('/animes/all');

            if(response.data && Array.isArray(response.data.animes)) {
                setAnimes(response.data.animes);
            } else {
                setError('Nenhum anime foi encontrado!');
            }
         } catch (error: any) {
            setError('erro ao buscar animes');
            console.error('Erro na requisição', error);
         }
    }

    return { animes, error }
}