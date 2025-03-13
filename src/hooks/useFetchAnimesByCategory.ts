import { useState, useEffect } from "react";
import api from "../utils/api";
import { AnimeData } from "../utils-types/anime-data";
import { CategoriesInterface } from "../utils-types/categories-interface";

export function useFetchAnimesByCategory(category: CategoriesInterface) {

    const [animes, setAnimes] = useState<AnimeData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAnimesCategory();
    }, [category]);

    async function fetchAnimesCategory() {
        try {
            const response = await api.get(`/animes/category/${category.category}`);
            setAnimes(response.data.animes);
        } catch (error) {
            setError('erro ao buscar anime!');
            console.error('Erro na requisição', error);
        }
    }

    return { animes, error }
}