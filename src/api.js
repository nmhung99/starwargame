import axios from "axios";

// Call API to get all carrd starwar
export const getStarShips = async () => {
    let apiUrl = "https://swapi.dev/api/starships";
    let getDataCard = [];

    do {
      const fetchStarShips = await axios.get(apiUrl);
      apiUrl = fetchStarShips.data.next;

      const dataStarShips = await fetchStarShips.data.results;
      getDataCard = [...getDataCard, ...dataStarShips];
    } while (apiUrl);

    // setStarShips(getDataCard);
    return getDataCard;
  };