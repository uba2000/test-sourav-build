import React from "react";

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

export interface IBuildComponent {
  _id: string;
  title: string;
  cores?: string;
  rating: number;
  frequency?: string;
  powerConsumption?: string;
  image: string;
  category_slug?: IBuildStages["slug"];
  specs?: {
    spec_title: string;
    spec_value: string;
  }[];
}

export interface IBuildStages {
  icon: string | React.ReactNode;
  title: string;
  short_name: string;
  slug:
    | "processor"
    | "graphics-card"
    | "motherboard"
    | "memory"
    | "storage"
    | "case"
    | "cooling"
    | "power-supply"
    | "os";
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

export interface IAddToBuildProps {
  category_slug: IBuildStages["slug"];
  component_id: IBuildComponent["_id"];
}

export type IPreBuiltBuild = IBuildComponent;

export type AddToRetailerUsersCartPropsType = {
  state: "single" | "complete";
};
export interface IBuildPCContext {
  preferences: BuildPCPreferenceType;
  preferenceFPSTypes: IFPSTypesItem[];
  preferenceGameTypes: PreferenceGameType[];
  preferenceResolutions: IPreferenceResolutions[];

  currentBuildStage: number;
  buildStages: IBuildStages[];
  currentBuild: IBuildComponent[];

  setGamingPreference: (
    field: keyof BuildPCPreferenceType,
    value: string | string[],
  ) => void;

  addComponentToBuild: (props: IAddToBuildProps) => void;

  resetApp: () => void;
  addToRetailerUsersCart: (props: AddToRetailerUsersCartPropsType) => void;
}
