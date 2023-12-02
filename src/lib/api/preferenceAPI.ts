import axios from "axios";

const preferenceAPI = axios.create({
  baseURL: "http://localhost:3500",
});

export const preferenceUrlEndpoint = "/data";

export const getPreferencesData = async () => {
  const response = await preferenceAPI.get(preferenceUrlEndpoint);
  return response.data;
};
