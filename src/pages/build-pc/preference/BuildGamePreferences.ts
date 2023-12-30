import type {
  IFPSTypesItemFPSTitle,
  PreferenceGameType,
  PreferenceResolutionsTitleType,
} from "../../../lib/types/context-types";

export const noPreferenceName = "No preference";
export const noPreferenceId = "no-preference";

export type BuildGamePreferencesType = PreferenceGameType;

const BuildGamePreferences: BuildGamePreferencesType[] = [
  {
    _id: "apex-legends",
    title: "Apex Legends",
  },
  {
    _id: "rainbow-six-seige",
    title: "Rainbow Six Siege",
  },
  {
    _id: "overwatch-2",
    title: "Overwatch 2",
  },
  {
    _id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
  },
  {
    _id: "rocket league",
    title: "Rocket League Season 12",
  },
  {
    _id: "halo",
    title: "Halo Infinite",
  },
  {
    _id: "fortnite",
    title: "Fortnite",
  },
  {
    _id: "hitman",
    title: "Hitman World of Assassination",
  },
  {
    _id: "minecraft",
    title: "Minecraft",
  },
  {
    _id: "assasins-creed-mirage",
    title: "Assassin's Creed Mirage",
  },
  {
    _id: "counter-strike-2",
    title: "Counter Strike 2 ",
  },
  {
    _id: "dauntless",
    title: "Dauntless",
  },
  {
    _id: "ghostrunner-2",
    title: "Ghost Runner 2",
  },
  {
    _id: "roblox",
    title: "Roblox",
  },
  // {
  //   _id: '',
  //   title: "League of Legends",
  //   image: LeaguLegend,
  // },
  // {
  //   _id: '',
  //   title: "Valorant",
  //   image: Valorant,
  // },
  // {
  //   _id: '',
  //   title: "Playerunknown’s Battlegrounds",
  //   image: Playrunners,
  // },
  // {
  //   _id: '',
  //   title: "World of Warcraft",
  //   image: WorldWarcraft,
  // },
  {
    _id: noPreferenceId,
    title: noPreferenceName,
    image: null,
  },
];

type BuildGameNoPreferenceConfigType = {
  [x in IFPSTypesItemFPSTitle]: {
    [y in PreferenceResolutionsTitleType]: number[];
  };
};

export const BuildGameNoPreferenceFPSConfig: BuildGameNoPreferenceConfigType = {
  "Up to 60 FPS": {
    fhd: [1],
    "4kuhd": [1],
    qhd: [1],
  },
  "Up to 175 FPS": {
    fhd: [1],
    "4kuhd": [],
    qhd: [1],
  },
  "175 and Up": {
    fhd: [1],
    "4kuhd": [],
    qhd: [],
  },
};

export default BuildGamePreferences;
