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

  switch (slug) {
    case "processor":
      specs = [
        {
          spec_title: "Cores",
          spec_value: `${_product?.cores || ""}`,
        },
        {
          spec_title: "",
          spec_value: `${_product?.processor_speed || ""}`, // 'GHz
        },
      ];
      break;
    case "graphics-card":
      specs = [
        {
          spec_title: "",
          spec_value: `${_product?.product_weight || ""}`,
        },
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
    case "motherboard":
      // eslint-disable-next-line no-case-declarations
      const _memory = _product.memory_supported.split(", ");
      specs = [
        {
          spec_title: "LGA",
          spec_value: `${
            _product?.processor_supported?.replace("LGA ", "") || ""
          }`,
        },
        {
          spec_title: "Memory",
          spec_value: `${_memory[2] || ""}`, // 'GHz
        },
        // {
        //   spec_title: "Watts",
        //   spec_value: "125",
        // },
      ];
      break;
    case "memory":
      specs = [
        {
          spec_title: "Memory",
          spec_value: `${
            _product?.pricespider_passthrough["Internal memory type"] || ""
          }`,
        },
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
    case "storage":
      specs = [
        {
          spec_title: "PCIe Gen",
          spec_value: `${
            _product?.pricespider_passthrough?.Interface?.replace(
              "PCI Express ",
              "",
            ) || ""
          }`,
        },
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
    case "case":
      specs = [
        {
          spec_title: "",
          spec_value: "",
        },
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
    case "cooling":
      specs = [
        {
          spec_title: "",
          spec_value: "",
        },
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
    case "power-supply":
      specs = [
        {
          spec_title: "",
          spec_value: "",
        },
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
    case "os":
      specs = [
        {
          spec_title: "",
          spec_value: "",
        },
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
  fan: "cooling",
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
