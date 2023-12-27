const ASSET_BASEURL = "https://d209lqx5jyogny.cloudfront.net";

export function getGameTitlesImage(
  _game_title: string,
  options: { res: "2x" | "1x"; screen: "desktop" | "mobile" } = {
    res: "2x",
    screen: "desktop",
  },
) {
  return decodeURIComponent(
    `${ASSET_BASEURL}/game-titles/game–${_game_title}-${options.screen}-${options.res}.png`,
  );
}

export function getSpecDetailsImage(
  _id: string,
  slug: string,
  screen: "desktop" | "mobile" = "desktop",
) {
  return `${ASSET_BASEURL}/spec-detail-pages-3x/${_id}_${slug}_${screen}@3x.png`;
}

export function getFPSVideos(_fps_name: string) {
  return `${ASSET_BASEURL}/video-asserts-compressed/${_fps_name}.mp4`;
}
