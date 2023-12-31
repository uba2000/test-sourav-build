import axios from "axios";

const preferenceAPI = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_BASE_URL
    : import.meta.env.BASE_URL,
});

export const preferenceUrlEndpoint = "/json-data.json";

export const getPreferencesData = async () => {
  const response = await preferenceAPI.get(preferenceUrlEndpoint);
  return response.data;
};
