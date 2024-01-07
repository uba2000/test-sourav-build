import axios from "axios";
import { DATA_API } from "../utils/util-constants";

const preferenceAPI = axios.create({
  baseURL: DATA_API,
});

export const preferenceUrlEndpoint = "/json-data.json";

export const getPreferencesData = async () => {
  const response = await preferenceAPI.get(preferenceUrlEndpoint);
  return response.data;
};
