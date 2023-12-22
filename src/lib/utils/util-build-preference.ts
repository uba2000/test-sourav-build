import type {
  IAPortinosProductInFeed,
  IBuildComponentSpec,
  IBuildStagesSlugs,
  IPortinosProductPresetKeys,
  ProductPredefinedPresets,
} from "./../types/context-types";

export interface IFormatPreferencesDataProps {
  _data: {
    [key in string]: {
      cpu: string;
      gpu: string;
      gameTitles: {
        [name in string]: {
          fhd: string;
          qhd: string;
          "4kuhd": string;
        };
      };
    };
  };
}

export interface IFormatPreferencesDataReturn {
  cpu_gpu_key: string;
  cpu: string;
  gpu: string;
  gameTitles: {
    [name in string]: {
      fhd: string;
      qhd: string;
      "4kuhd": string;
    };
  };
}

export function formatPreferencesData({
  _data,
}: IFormatPreferencesDataProps): IFormatPreferencesDataReturn[] {
  const _all_keys = Object.keys(_data);
  const _formatted_data = _all_keys.map((d) => {
    return {
      cpu_gpu_key: d,
      ..._data[d],
    };
  });

  return _formatted_data;
}

export function determineProductSpecs(
  _product: IAPortinosProductInFeed,
  slug: IBuildStagesSlugs,
) {
  let specs: IBuildComponentSpec[] = [];
  const _pricespider_passthrough = _product?.pricespider_passthrough;
  console.log({ _pricespider_passthrough });

  switch (slug) {
    case "processor":
      specs = [
        {
          spec_title: "",
          spec_value: `${
            _pricespider_passthrough?.processor_boost_frequency || ""
          }`,
        },
        {
          spec_title: _pricespider_passthrough?.processor_cores ? "Cores" : "",
          spec_value: `${_pricespider_passthrough?.processor_cores || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.processor_socket || ""}`,
        },
      ];
      break;
    case "graphics-card":
      specs = [
        {
          spec_title: "",
          spec_value: `${
            _pricespider_passthrough?.discrete_graphics_card_memory || ""
          } ${_pricespider_passthrough?.graphics_card_memory_type || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.hdmi_version || ""}`,
        },
        {
          spec_title: _pricespider_passthrough?.number_of_slots ? "Slots" : "",
          spec_value: `${_pricespider_passthrough?.number_of_slots || ""}`,
        },
      ];
      break;
    case "motherboard":
      // eslint-disable-next-line no-case-declarations
      specs = [
        {
          spec_title: "",
          spec_value: `${
            _pricespider_passthrough?.motherboard_form_factor || ""
          }`,
        },
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.processor_socket || ""}`,
        },
        {
          spec_title: _pricespider_passthrough?.supported_memory_types
            ? "Memory"
            : "",
          spec_value: `${
            _pricespider_passthrough?.supported_memory_types || ""
          }`,
        },
      ];
      break;
    case "memory":
      specs = [
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.internal_memory || ""} ${
            _pricespider_passthrough?.internal_memory_type || ""
          }`,
        },
        {
          spec_title: "",
          spec_value: `${
            _pricespider_passthrough?.memory_layout_modules_x_size || ""
          }`,
        },
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.memory_clock_speed || ""}`,
        },
      ];
      break;
    case "storage":
      specs = [
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.ssd_form_factor || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${_product?.storage_capacity || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.interface || ""}`,
        },
      ];
      break;
    case "case":
      specs = [
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.form_factor || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${
            _pricespider_passthrough?.supported_motherboard_form_factors || ""
          }`,
        },
        {
          spec_title: "",
          spec_value: `${
            _pricespider_passthrough?.number_of_expansion_slots || ""
          }`,
        },
      ];
      break;
    case "cooling":
      specs = [
        {
          spec_title: "",
          spec_value: `${
            _pricespider_passthrough?.supported_processor_sockets || ""
          }`,
        },
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.type || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.maximum_airflow || ""}`,
        },
      ];
      break;
    case "power-supply":
      specs = [
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.total_power || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${
            _pricespider_passthrough?.power_supply_unit_psu_form_factor || ""
          }`,
        },
        {
          spec_title: "",
          spec_value: `${
            _pricespider_passthrough?.["80_plus_certification"] || ""
          }`,
        },
      ];
      break;
    case "fan":
      specs = [
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.fan_diameter || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.bearing_type || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${_pricespider_passthrough?.maximum_airflow || ""}`,
        },
      ];
      break;
    case "os":
      specs = [
        // {
        //   spec_title: "",
        //   spec_value: "",
        // },
        // {
        //   spec_title: "",
        //   spec_value: `${_product?.processor_speed || ""}`, // 'GHz
        // },
        // {
        //   spec_title: "Watts",
        //   spec_value: "125",
        // },
      ];
      break;

    default:
      break;
  }

  return specs;
}

type IPreferenceBuildSegmentWeight = {
  [k in ProductPredefinedPresets]: number;
};

export const preferenceBuildSegmentWeight: IPreferenceBuildSegmentWeight = {
  enthusiast: 3,
  mainstream: 2,
  entry: 1,
};

type BuildSlugMapType = {
  [k in IPortinosProductPresetKeys]: IBuildStagesSlugs;
};

export const buildSlugMap: BuildSlugMapType = {
  cpu: "processor",
  gpu: "graphics-card",
  psu: "power-supply",
  os: "os",
  fan: "fan",
  case: "case",
  cooler: "cooling",
  ram: "memory",
  storage: "storage",
  motherboard: "motherboard",
};

type PreconfigedTitlesType = {
  [k in ProductPredefinedPresets]: string;
};

export const preconfigedBuildTitles: PreconfigedTitlesType = {
  enthusiast: "Enthusiast gaming PC",
  mainstream: "Mainstream gaming PC",
  entry: "Entry gaming PC",
};

export function getNextRoundFigure(_value: number): number {
  return Math.ceil(_value / 10) * 10;
}

export function getPreviousRoundFigure(_value: number): number {
  return Math.floor(_value / 10) * 10;
}
