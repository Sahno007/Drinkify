import axios from 'axios';

const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';

async function fetchCocktails(link, param, paramValue) {
  const resp = await axios.get(`${BASE_URL}${link}?${param}=${paramValue}`);

  return resp.data;
}

async function fetchIngredients(link, paramValue) {
  const resp = await axios.get(`${BASE_URL}${link}${paramValue}`);

  return resp.data;
}

export { fetchCocktails, fetchIngredients };
