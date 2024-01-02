import axios from "axios";

// const portinosAPI = axios.create({
//   baseURL: "https://pcbuilder.staging.portinos.com/api/v1",
// });

const portinosAPI = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://dev.d26ohjimvrz87s.amplifyapp.com"
    : import.meta.env.BASE_URL,
});

export const portinosInventoryEndpoint = "/portinos-feed.json";
export const portinosRatingEndpoint = "/product_ratings.json";

export const getPortinosInventory = async () => {
  const response = await portinosAPI.get(portinosInventoryEndpoint);
  return response.data;
};

export const getPortinosRatings = async () => {
  const response = await portinosAPI.get(portinosRatingEndpoint);
  return response.data;
};
