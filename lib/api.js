import axios from 'axios';

export async function getCategoriesData() {
  const url = "https://api.adzuna.com/v1/api/jobs/us/categories?app_id=29c956c8&app_key=ee01a8404af0475eef09dd84c6329b08"
  const response = await axios.get(url);
  return response.data.results;
};