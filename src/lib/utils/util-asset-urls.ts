const ASSET_BASEURL = "https://d209lqx5jyogny.cloudfront.net";

export function getGameTitlesImage(_game_title: string) {
  return `${ASSET_BASEURL}/game-titles/${_game_title}.png`;
}

export function getSpecDetailsImage(_spec_details_title: string) {
  return `${ASSET_BASEURL}/spec-detail-pages-3x/${_spec_details_title}@3x.png`;
}
