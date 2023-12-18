import React from "react";
import { type IFormatPreferencesDataReturn } from "../utils/util-build-preference";

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

export interface IBuildComponentSpec {
  spec_title: string;
  spec_value: string;
}

export interface IBuildComponent {
  _id: string;
  title: string;
  price?: number;
  cores?: string;
  rating: number;
  frequency?: string;
  powerConsumption?: string;
  image: string;
  model?: string;
  category_slug?: IBuildStages["slug"];
  original_slug?: IPortinosProductPresetKeys;
  specs?: IBuildComponentSpec[];
}

export type IBuildStagesSlugs =
  | "processor"
  | "graphics-card"
  | "motherboard"
  | "memory"
  | "storage"
  | "case"
  | "cooling"
  | "power-supply"
  | "os"
  | "fan";
export interface IBuildStages {
  icon: string | React.ReactNode;
  title: string;
  short_name: string;
  slug: IBuildStagesSlugs;
  canCompare?: boolean;
  items: IBuildComponent[];
  // contains id/index of selected item on the build array
  selectedItem?: {
    index: number; // index in build array
    _id: IBuildComponent["_id"]; // id of component
    slug: IBuildStages["slug"]; // build stage slug
  } | null;
  component: React.ReactNode;
}

export type ProductPredefinedPresets = "entry" | "mainstream" | "enthusiast";

export interface IPreconfigedBuild {
  title: string;
  // buildModel: string; // !Deprecated, model gotten in useBuildPlaceholders
  build_segment: ProductPredefinedPresets | "";
  items: IPreBuiltBuild[];
}

export interface IMinMaxFPS {
  min: number;
  max: number;
}
export interface IAllGamesMinMaxFPS {
  min: Record<string, number>;
  max: Record<string, number>;
}

export type IFPSTypesItemIDType =
  | "max_high_range"
  | "mid_range"
  | "min_low_range";

export interface IFPSTypesItem {
  _id: IFPSTypesItemIDType;
  fps: string;
  range: {
    min: string;
    max: string | number;
  };
  video: string;
  videoM: string; // Mobile video
  thumbnail: string;
}

export type BuildPCPreferenceType = {
  game_type_title: string[];
  gaming_fps: IFPSTypesItem | null;
  gaming_resolution: IPreferenceResolutions | null;
};

export type PreferenceResolutionsTitleType = "4kuhd" | "qhd" | "fhd";

export interface IPreferenceResolutions {
  title: PreferenceResolutionsTitleType;
  res: string;
  image: string;
  fullImage: string;
}

export interface IAddToBuildProps {
  category_slug: IBuildStages["slug"];
  component_id: IBuildComponent["_id"];
}

export type IPreBuiltBuild = IBuildComponent;

export type AddToRetailerUsersCartPropsType = {
  state: "single" | "complete";
  _toggleState?: boolean | undefined;
};

export type BuildFlowType = "preconfiged_build" | "build_components";

export interface IBuildPCContext {
  minMaxFPS: IMinMaxFPS;
  initialMinMaxFPS: IMinMaxFPS;
  preferences: BuildPCPreferenceType;
  allGamesMinMaxFPS: IAllGamesMinMaxFPS;
  preferenceFPSTypes: IFPSTypesItem[];
  preferenceGameTypes: PreferenceGameType[];
  preferenceResolutions: IPreferenceResolutions[];

  // currentBuildStage: number;
  buildSegment: ProductPredefinedPresets | null;
  predefinedBuilds: IPreconfigedBuild;
  buildStages: IBuildStages[];
  currentBuild: IBuildComponent[];
  buildFlowType: BuildFlowType;
  cleanGameInfoArray: ICleanPreferenceData[];

  adjustFPSRange: (preferenceFeed: IFormatPreferencesDataReturn[]) => {
    [k in PreferenceResolutionsTitleType]: string[];
  };
  setGamingPreference: (
    field: keyof BuildPCPreferenceType,
    value: string | string[] | IFPSTypesItem | IPreferenceResolutions,
  ) => void;
  analyzePreferencesForBuild: (preferences: BuildPCPreferenceType) => void;
  filterGameTitles: (
    allowed_titles: string[],
  ) => IFormatPreferencesDataReturn[];
  togglePreBuildToCurrentBuildForPreview: (action: "add" | "remove") => void;
  addComponentToBuild: (props: IAddToBuildProps) => void;

  resetApp: () => void;
  addToRetailerUsersCart: (props: AddToRetailerUsersCartPropsType) => void;

  thankYouModalOpen: boolean;
  currentModelOnStage: string;
  showCurrentModelSpecs: boolean;
  viewingCurrentComponentModel: boolean;
  canViewSpecs: boolean;
  toggleCanViewSpecs: (_toggle?: boolean) => void;
  toggleShowSpecs: (_toggle?: boolean) => void;
  toggleViewingComponentModel: (_toggle?: boolean) => void;
  setCurrentModelOnStage: (model: string) => void;
}

export type IPortinosProductPresetKeys =
  | "cpu"
  | "gpu"
  | "psu"
  | "os"
  | "fan"
  | "case"
  | "cooler"
  | "ram"
  | "storage"
  | "motherboard";

export interface IAPortinosProductInFeed {
  id: number;
  hatch_id: number;
  mpn: string[];
  model: string;
  model_name: string;
  brand: string;
  link: string;
  model_3d_status: null;
  currency: string;
  price: number;
  picture: string;
  description: string;
  brand_logo: string;
  stock: boolean;
  segment: ProductPredefinedPresets;
  compatible_components: null[];
  edition: string;
  category?: IPortinosProductPresetKeys;

  // CPU
  generation?: string;
  series?: string;
  processor?: string;
  processor_speed?: string;
  max_boost_clock_speed?: string;
  cores?: number;
  number_of_threads?: number;
  integrated_graphics?: boolean;

  // OS
  software_format?: string;
  device_installations?: number;
  number_of_users?: number;

  // Memory/Graphics card/Storage
  storage_capacity?: string;
  dimensions_cm?: string;
  dimensions_in?: string;
  // Case
  product_weight?: string | null;

  // Motherboard
  processor_supported?: string;
  memory_supported: string;

  pricespider_passthrough: {
    "Internal memory type": string;

    // storage
    Interface: string;
  };
}

export interface IPortinosProductFeed {
  products: IAPortinosProductInFeed[];
  pre_set: {
    [k in ProductPredefinedPresets]: {
      [kp in IPortinosProductPresetKeys]: number;
    };
  };
}

export interface ICleanPreferenceData {
  title: string;
  cpu_product: IAPortinosProductInFeed | null;
  gpu_product: IAPortinosProductInFeed | null;
  highest_segment: ProductPredefinedPresets | null;
  data: {
    cpu: string; // id of cpu
    cpu_gpu_key: string; // cpu/gpu id combination
    fps: string; // fps score
    gpu: string; // id of gpu
    res: string; // resolution
  } | null;
}

export type BuildComponentPlaceholderType = {
  build_components: {
    [k in IBuildStagesSlugs]: string;
  };
  preconfiged_build: {
    [k in ProductPredefinedPresets]: string;
  };
};
