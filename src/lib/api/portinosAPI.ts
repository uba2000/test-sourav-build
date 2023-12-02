import axios from "axios";

const portinosAPI = axios.create({
  baseURL: "https://pcbuilder.staging.portinos.com/api/v1",
});

export const portinosInventoryEndpoint = "/inventory";

export const getPortinosInventory = async () => {
  const response = await portinosAPI.get(portinosInventoryEndpoint);
  return response.data;
};
