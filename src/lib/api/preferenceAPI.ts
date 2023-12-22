import axios from "axios";

const preferenceAPI = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_BASE_URL
    : "http://localhost:5173",
});

export const preferenceUrlEndpoint = "/json-data.json";

export const getPreferencesData = async () => {
  const response = await preferenceAPI.get(preferenceUrlEndpoint);
  return response.data;
};
