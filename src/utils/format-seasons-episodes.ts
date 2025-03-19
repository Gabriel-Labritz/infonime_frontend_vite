export function formatSeasonsEpisodes(seasons?: number, episodes?: number){
    return `${seasons && seasons > 1 ? `${seasons} temporadas` : `${seasons} temporada`} | 
            ${episodes && episodes > 1 ? `${episodes} episódios` : `${episodes} episódio`}`;
};