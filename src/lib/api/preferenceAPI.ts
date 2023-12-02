import axios from "axios";

const preferenceAPI = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://dev.d26ohjimvrz87s.amplifyapp.com/"
    : "http://localhost:5173",
});

export const preferenceUrlEndpoint = "/json-data.json";

export const getPreferencesData = async () => {
  const response = await preferenceAPI.get(preferenceUrlEndpoint);
  return response.data;
};
