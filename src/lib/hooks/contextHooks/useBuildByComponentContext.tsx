import { useState } from "react"

import type {
  BuildPCPreferenceType, IAPortinosProductInFeed, IAddToBuildProps, IBuildComponent,
  IBuildStages, IBuildStagesSlugs, ICleanPreferenceData, IPortinosProductFeed, IPreconfigedBuild, ProductPredefinedPresets
} from "../../types/context-types"

import CPUIcon from '../../../assets/component-icons/cpu.svg?react'
import GPUIcon from '../../../assets/component-icons/gpu.svg?react'
import ChipIcon from '../../../assets/component-icons/chipset.svg?react'
import MemoryIcon from '../../../assets/component-icons/memory.svg?react'
import MemoryStorageIcon from '../../../assets/component-icons/memory-storage.svg?react'
import ServerIcon from '../../../assets/component-icons/server.svg?react'
import CPUCoolerIcon from '../../../assets/component-icons/cpu-cooler.svg?react'
import BatteryIcon from '../../../assets/component-icons/battery.svg?react'
import WindowsIcon from '../../../assets/component-icons/windows-11.svg?react'

import useSWR from "swr"
import { buildSlugMap, determineProductSpecs, formatPreferencesData, preconfigedBuildTitles, preferenceBuildSegmentWeight } from "../../utils/util-build-preference"
import { getPreferencesData, preferenceUrlEndpoint as cacheKey } from "../../api/preferenceAPI"
import { getPortinosInventory, portinosInventoryEndpoint as portinosCacheKey } from "../../api/portinosAPI"
// import { matchRoutes, useLocation } from "react-router-dom"

// const componentBuildRoutes = [
//   { path: "/build-pc/choose-component/:category_slug" },
// ]


const initialPredefinedBuilds = {
  items: [],
  buildModel: '',
  title: ''
}

function useBuildByComponentContext() {
  const [buildStages, setBuildStages] = useState<IBuildStages[]>([
    {
      icon: <CPUIcon />,
      title: 'Processor',
      short_name: 'Processor',
      slug: 'processor',
      component: '',
      items: [],
      selectedItem: null,
    },
    {
      icon: <GPUIcon />,
      title: 'Graphics Card',
      short_name: 'GPU',
      slug: 'graphics-card',
      component: '',
      canCompare: true,
      items: [],
      selectedItem: null,
    },
    {
      icon: <ChipIcon />,
      title: 'Motherboard',
      short_name: 'Motherboard',
      slug: 'motherboard',
      component: '',
      items: [],
      selectedItem: null,
    },
    {
      icon: <MemoryIcon />,
      title: 'Memory',
      short_name: 'Memory',
      slug: 'memory',
      component: '',
      items: [],
      selectedItem: null,
    },
    {
      icon: <MemoryStorageIcon />,
      title: 'Storage',
      short_name: 'Storage',
      slug: 'storage',
      component: '',
      items: [],
      selectedItem: null,
    },
    {
      icon: <ServerIcon />,
      title: 'Case',
      short_name: 'Case',
      slug: 'case',
      component: '',
      items: [],
      selectedItem: null,
    },
    {
      icon: <CPUCoolerIcon />,
      title: 'CPU Cooling',
      short_name: 'CPU Cooling',
      slug: 'cooling',
      component: '',
      items: [],
      selectedItem: null,
    },
    {
      icon: <BatteryIcon />,
      title: 'Power Supply',
      short_name: 'Power Supply',
      slug: 'power-supply',
      component: '',
      items: [],
      selectedItem: null,
    },
    {
      icon: <WindowsIcon />,
      title: 'Operating System',
      short_name: 'OS',
      slug: 'os',
      component: '',
      items: [],
      selectedItem: null,
    },
  ])

  const [predefinedBuilds, setPredefinedBuilds] = useState<IPreconfigedBuild>(initialPredefinedBuilds);

  const [currentBuild, setCurrentBuild] = useState<IBuildComponent[]>([])
  const [currentBuildStage, setCurrentBuildStage] = useState<number>(-1);
  const [buildSegment, setBuildSegment] = useState<ProductPredefinedPresets | null>(null);

  const {
    data: preferences_feed,
  } = useSWR(cacheKey, getPreferencesData, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    refreshInterval: 30000,
  })

  const {
    data: portinos_product_feed,
  } = useSWR(portinosCacheKey, getPortinosInventory, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    refreshInterval: 30000,
  })

  function addToBuild({ category_slug, component_id }: IAddToBuildProps) {
    const _buildStages = [...buildStages];
    const _current_build_category = _buildStages.find((d) => d.slug === category_slug);

    if (_current_build_category) {
      // add componenet to build array
      const _current_component = _current_build_category.items.find((d) => d._id === component_id)
      const _current_component_index = _current_build_category.items.findIndex((d) => d._id === component_id)
      
      // add component to build
      const _index_in_build = currentBuild.length;
      if (_current_component && _current_build_category) {
        _current_component.category_slug = _current_build_category.slug;
        // console.log([
        //   _current_component,
        //     ...currentBuild,
        //   ]);

        setCurrentBuild(
          (prev) => [
            _current_component,
            ...prev,
          ]
        )
        setCurrentBuildStage((prev) => prev + 1);
      }
      if (_current_component_index && _current_component && _current_build_category) {
        _buildStages[_current_component_index].selectedItem = {
          _id: _current_component?._id,
          index: _index_in_build,
          slug: _current_build_category?.slug,
        }
      }
    }

    setBuildStages(_buildStages);
  }

  function analyzePreferencesForBuild(preferences: BuildPCPreferenceType) {
    
    const _preferences_feed = formatPreferencesData({ _data: preferences_feed })
    const _portinos_product_feed = portinos_product_feed as IPortinosProductFeed;
    // console.log({preferences, _preferences_feed});

    const selected_res = preferences.gaming_resolution?.title;
    const selected_fps_range = preferences.gaming_fps!.range;

    let all_data: ICleanPreferenceData[] = [];

    if (selected_res) {
      all_data = preferences.game_type_title.map((game_title) => {
  
        const game_products_in_range: ICleanPreferenceData['data'][] = [];
          
        _preferences_feed.forEach((product) => {
          const current_game_value = product.gameTitles[game_title];
          
          const _fps_value = parseInt(current_game_value[selected_res], 10);
          
          if (_fps_value >= parseInt(selected_fps_range?.min, 10)) {
            if (
              (typeof selected_fps_range?.max === 'number' && _fps_value <= selected_fps_range?.max)
              || (typeof selected_fps_range?.max === 'string' && _fps_value <= parseInt(selected_fps_range?.max, 10))
            ) {
              game_products_in_range.push({
                cpu: product.cpu,
                cpu_gpu_key: product.cpu_gpu_key,
                gpu: product.gpu,
                res: selected_res,
                fps: `${_fps_value}`,
              });
            }
          }
        }) // at this point you can get which game has product for its specs

        let _data: ICleanPreferenceData['data'] = null;

        game_products_in_range.forEach((_d) => {
          if (!_data) {
            _data = _d;
          } else if (_data) {
            if (parseInt(_d?.fps as string, 10) < parseInt(_data.fps!, 10)) { 
              _data = _d;
            }
          }
        })
  
        // console.log({game_products_in_range});

        return {
          title: game_title,
          data: _data,
          cpu_product: null,
          gpu_product: null,
          highest_segment: null,
          // game_products_in_range,
        }
      })
    }

    // get products for each game title
    all_data = all_data.map((a_d) => {
      const cpu_product = _portinos_product_feed.products.find(
        (pf) => pf.id === parseInt(a_d.data?.cpu as string, 10)
      );
      const gpu_product = _portinos_product_feed.products.find(
        (pf) => pf.id === parseInt(a_d.data?.gpu as string, 10)
      );

      let highest_segment: ProductPredefinedPresets | null = null;
      let cpu_product_segment: ProductPredefinedPresets | null = null;
      let gpu_product_segment: ProductPredefinedPresets | null = null;

      if (cpu_product) {
        // get the segments for cpu product
        const cpu_segments = cpu_product.segment.split('|') as ProductPredefinedPresets[];

        if (cpu_segments.length === 1) { // a single cpu segment in string
          cpu_product_segment = cpu_segments[0];
        } else {
          // more than one segment in string "segment1|segment2"
          cpu_segments.forEach((cs) => {
            if (!cpu_product_segment) { // initial item
              cpu_product_segment = cs;
            } else if (preferenceBuildSegmentWeight[cs] > preferenceBuildSegmentWeight[cpu_product_segment]) {
              // weight of previous segment is less so update with higher segment
              cpu_product_segment = cs;
            }
          })
        }
      }

      if (gpu_product) {
        // get the segments for gpu product
        const gpu_segments = gpu_product.segment.split('|') as ProductPredefinedPresets[];

        if (gpu_segments.length === 1) { // a single gpu segment in string
          gpu_product_segment = gpu_segments[0];
        } else {
          // more than one segment in string "segment1|segment2"
          gpu_segments.forEach((gs) => {
            if (!gpu_product_segment) {
              gpu_product_segment = gs;
            } else if (preferenceBuildSegmentWeight[gs] > preferenceBuildSegmentWeight[gpu_product_segment]) {
              // weight of previous segment is less so update with higher segment
              gpu_product_segment = gs;
            }
          })
        }
      }

      if (cpu_product_segment && gpu_product_segment) {
        if (preferenceBuildSegmentWeight[cpu_product_segment] > preferenceBuildSegmentWeight[gpu_product_segment]) {
          highest_segment = cpu_product_segment;
        } else {
          highest_segment = gpu_product_segment;
        }
      }

      a_d = {
        ...a_d,
        cpu_product: cpu_product || null,
        gpu_product: gpu_product || null,
        highest_segment,
      }

      return a_d
    })

    let _highest_segment: ProductPredefinedPresets | null = null;
    // check the segments
    all_data.forEach((a_d) => {
      if (a_d.highest_segment) {
        if (!_highest_segment) {
          _highest_segment = a_d.highest_segment;
        } else if (preferenceBuildSegmentWeight[a_d.highest_segment] > preferenceBuildSegmentWeight[_highest_segment]) {
          _highest_segment = a_d.highest_segment;
        }
      }
    })

    // console.log({ _preferences_feed, _highest_segment, preferences, all_data, _portinos_product_feed });
    setBuildSegment(_highest_segment)
    getPredefineBuilds(_highest_segment!)
    mapOutEligibleProducts(_highest_segment!)
  }

  function getPredefineBuilds(build_segment: ProductPredefinedPresets) {
    const _portinos_product_feed = portinos_product_feed as IPortinosProductFeed;
    const pre_set = _portinos_product_feed.pre_set[build_segment]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const predefined_pre_sets: IPreconfigedBuild = {
      title: preconfigedBuildTitles[build_segment],
      buildModel: '',
      items: [],
    }

    Array.from(Object.keys(pre_set)).forEach((ps: string) => {
      const _id = pre_set[ps as keyof (typeof pre_set)]
      const _product = _portinos_product_feed.products.find((ppf) => ppf.id === _id)
      if (_product) {
        const category_slug = buildSlugMap[ps as keyof (typeof pre_set)];
        const specs = determineProductSpecs(_product, category_slug);
        predefined_pre_sets.items.push({
          _id: `${_product.id}`,
          image: _product.picture,
          rating: 5,
          title: _product.model_name,
          category_slug,
          specs,
          price: _product.price
        });
      }
    })

    // console.log({predefined_pre_sets});
    setPredefinedBuilds(predefined_pre_sets)
  }

  function mapOutEligibleProducts(build_segment: ProductPredefinedPresets) {
    const _portinos_product_feed = portinos_product_feed as IPortinosProductFeed;

    const eligible_products: IAPortinosProductInFeed[] = [];
    const formatted_products: { [k in IBuildStagesSlugs]: IBuildComponent[] } = {
      "graphics-card": [],
      "power-supply": [],
      case: [],
      cooling: [],
      fan: [],
      memory: [],
      motherboard: [],
      os: [],
      processor: [],
      storage: [],
    };

    _portinos_product_feed.products.forEach((ppf) => {
      let _current_segment: ProductPredefinedPresets = ppf.segment as ProductPredefinedPresets;

      if (_current_segment.includes('|')) {
        const segment_arrays = _current_segment.split('|') as ProductPredefinedPresets[];
        if (segment_arrays.length === 1 || preferenceBuildSegmentWeight[segment_arrays[0]] > preferenceBuildSegmentWeight[segment_arrays[1]]) {
          _current_segment = segment_arrays[0];
        } else if (preferenceBuildSegmentWeight[segment_arrays[0]] < preferenceBuildSegmentWeight[segment_arrays[1]]) {
          _current_segment = segment_arrays[1];
        }
      }
      
      if (preferenceBuildSegmentWeight[_current_segment] >= preferenceBuildSegmentWeight[build_segment]) {
        eligible_products.push(ppf)
        // console.log(buildSlugMap[ppf.category!]);
        const category_slug = buildSlugMap[ppf.category!];
        const specs = determineProductSpecs(ppf, category_slug);

        formatted_products[`${buildSlugMap[ppf.category!]}`]?.push({
          _id: `${ppf.id}`,
          image: ppf.picture,
          price: ppf.price,
          rating: 5,
          title: ppf.model_name,
          category_slug,
          specs,
        })
      }
    })

    setBuildStages((prev) => prev.map((pv) => ({
      ...pv,
      items: formatted_products[pv.slug]
    })))
    // console.log({
    //   eligible_products, _portinos_product_feed, formatted_products,
    //   buildStages: buildStages.map((pv) => ({
    //     ...pv,
    //     items: formatted_products[pv.slug]
    //   }))
    // });
  }

  function resetPCBuild() {
    setCurrentBuild([]);
    setBuildSegment(null)
    setCurrentBuildStage(-1)
    setBuildStages((prev) => prev.map((pv) => ({
      ...pv,
      items: []
    })))
    setPredefinedBuilds(initialPredefinedBuilds)
  }

  return {
    buildStages,
    buildSegment,
    predefinedBuilds,
    currentBuild,
    currentBuildStage,

    addComponentToBuild: addToBuild,
    resetPCBuild,
    analyzePreferencesForBuild,
  }
}

export default useBuildByComponentContext