export type PreferenceGameType =
  | {
      _id: string;
      title: string;
      image: string;
    }
  | {
      _id: string;
      title: string;
      image: null;
    };

export type BuildPCPreferenceType = {
  game_type_title: string[];
  gaming_fps: string;
  gaming_resolution: string;
};

export interface IFPSTypesItem {
  _id: string;
  fps: string;
  video: string;
  thumbnail: string;
}

export interface IPreferenceResolutions {
  title: string;
  res: string;
  image: string;
  fullImage: string;
}

export interface IBuildPCContext {
  preferences: BuildPCPreferenceType;
  preferenceFPSTypes: IFPSTypesItem[];
  preferenceResolutions: IPreferenceResolutions[];
  preferenceGameTypes: PreferenceGameType[];
  setGamingPreference: (
    field: keyof BuildPCPreferenceType,
    value: string | string[],
  ) => void;
}
