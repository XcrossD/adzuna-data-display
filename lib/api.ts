import axios from 'axios';

const BASE_URL = "https://api.adzuna.com/v1/api/jobs";
const APP_ID = "29c956c8";
const APP_KEY = "ee01a8404af0475eef09dd84c6329b08";

export async function getCategoriesData() {
  const url = `${BASE_URL}/us/categories?app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};

export async function getHistoricalData(jobType: string | string[]) {
  const url = `${BASE_URL}/us/history?app_id=${APP_ID}&app_key=${APP_KEY}&category=${jobType}`;
  const response = await axios.get(url);
  const historicalDataRaw = response.data;
  return Object.entries(historicalDataRaw.month)
    .map(([key, value]) => ({ month: Date.parse(key), average: value}))
    .sort((a, b) => {
      return a.month - b.month;
    });
}

export async function getHistogramData(jobType: string | string[]) {
  const url = `${BASE_URL}/us/histogram?app_id=${APP_ID}&app_key=${APP_KEY}&category=${jobType}`;
  const response = await axios.get(url);
  const histogramDataRaw = response.data;
  return Object.entries(histogramDataRaw.histogram)
    .map(([key, value]) => ({ bin: key, amount: value}))
    .sort((a, b) => +a.bin - +b.bin);
}