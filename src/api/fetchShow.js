import axios from 'axios';
import stripTags from 'striptags';

const formatSeasons = (allEpisodes) => {
  const seasons = [
    {id:0, name: "Season 1", episodes: []},
    {id:1, name: "Season 2", episodes: []},
    {id:2, name: "Season 3", episodes: []},
    {id:3, name: "Season 4", episodes: []},
    {id:4, name: "Season 5", episodes: []},
  ];

  allEpisodes.forEach((episode) => {
    seasons[episode.season-1].episodes.push({
      ...episode,
      summary: stripTags(episode.summary),
      image: episode.image ? episode.image.medium : null
    });
  });

  return seasons;
};

//note: The index in the seasons array is determined by subtracting 1 from the season number because JavaScript arrays are zero-indexed (i.e. the first element of an array has an index of 0).


const fetchShow = () => {
  return axios
    .get("https://api.tvmaze.com/singlesearch/shows?q=stranger+things&embed=episodes")
    .then(res => {
      const { data } = res;

      return {
        name: data.name,
        image: data.image,
        summary: stripTags(data.summary),
        seasons: formatSeasons(data._embedded.episodes)
      };
    });
};

export default fetchShow;
