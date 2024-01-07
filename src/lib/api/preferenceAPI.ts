import axios from "axios";
import { DATA_API } from "../utils/util-constants";

const preferenceAPI = axios.create({
  baseURL: import.meta.env.PROD ? DATA_API : import.meta.env.BASE_URL,
});

export const preferenceUrlEndpoint = "/json-data.json";

export const getPreferencesData = async () => {
  const response = await preferenceAPI.get(preferenceUrlEndpoint);
  return response.data;
};
