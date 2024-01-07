import { useCallback, useState } from "react"

import type {
  BuildFlowType,
  BuildPCPreferenceType, IAPortinosProductInFeed, IAddToBuildProps, IBuildComponent,
  IBuildStages, IBuildStagesSlugs, ICleanPreferenceData, IPortinosProductFeed, IPortinosProductPresetKeys, IPreconfigedBuild, PreferenceGameType, ProductPredefinedPresets
} from "../../types/context-types"

import CPUIcon from '../../../assets/component-icons/cpu.svg?react'
import GPUIcon from '../../../assets/component-icons/gpu.svg?react'
import ChipIcon from '../../../assets/component-icons/chipset.svg?react'
import MemoryIcon from '../../../assets/component-icons/memory.svg?react'
import MemoryStorageIcon from '../../../assets/component-icons/memory-storage.svg?react'
import ServerIcon from '../../../assets/component-icons/server.svg?react'
import CPUCoolerIcon from '../../../assets/component-icons/cpu-cooler.svg?react'
import FanIcon from '../../../assets/component-icons/case-fan.svg?react'
import BatteryIcon from '../../../assets/component-icons/battery.svg?react'
import WindowsIcon from '../../../assets/component-icons/windows-11.svg?react'

import useSWR from "swr"
import { buildSlugMap, determineProductSpecs, formatPreferencesData, preconfigedBuildTitles, preferenceBuildSegmentWeight } from "../../utils/util-build-preference"
import { getPreferencesData, preferenceUrlEndpoint as cacheKey } from "../../api/preferenceAPI"
import { getPortinosInventory, portinosInventoryEndpoint as portinosCacheKey } from "../../api/portinosAPI"
import { noPreferenceName } from "../../../pages/build-pc/preference/BuildGamePreferences"
// import { matchRoutes, useLocation } from "react-router-dom"

// const componentBuildRoutes = [
//   { path: "/build-pc/choose-component/:category_slug" },
// ]


const initialPredefinedBuilds: IPreconfigedBuild = {
  items: [],
  build_segment: '',
  // buildModel: '',
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
      icon: <FanIcon />,
      title: 'Case Fan',
      short_name: 'Case Fan',
      slug: 'fan',
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
  ]);

  // this is to know what flow the user chose to go with
  const [buildFlowType, setBuildTypeFlow] = useState<BuildFlowType>('build_components')

  const [predefinedBuilds, setPredefinedBuilds] = useState<IPreconfigedBuild>(initialPredefinedBuilds);

  const [currentBuild, setCurrentBuild] = useState<IBuildComponent[]>([])
  // const [currentBuildStage, setCurrentBuildStage] = useState<number>(-1);
  const [buildSegment, setBuildSegment] = useState<ProductPredefinedPresets | null>(null);
  // contains array of all Game titles with cpu/gpu, threshhold fps, threshhold res
  const [cleanGameInfoArray, setCleanGameInfoArray] = useState<ICleanPreferenceData[]>([])

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

  function removeFromBuild({ category_slug, component_id, cb }: IAddToBuildProps) {
    const _currentBuild = currentBuild.filter((d) => (d.category_slug !== category_slug && component_id !== d._id))

    const _buildStages = [...buildStages];
    const _current_build_category = _buildStages.find((d) => d.slug === category_slug);

    if (_current_build_category) {
      const _current_component = _current_build_category.items.find((d) => d._id === component_id)
      const _current_component_index = _current_build_category.items.findIndex((d) => d._id === component_id)

      if (_current_component) {
        _current_component.category_slug = _current_build_category.slug;

        setCurrentBuild([
          ..._currentBuild,
        ]);

        setCurrentBuild((prev) => {
          if (cb) {
            cb([
              ..._currentBuild,
            ]);
          }
          return prev;
        })
      }

      if (_current_component_index >= 0 && _current_component && _current_build_category) {
        const _currrent_index_build = buildStages.findIndex((d) => d.slug === _current_build_category?.slug)
        _buildStages[_currrent_index_build].selectedItem = null;
      }
    }

    setBuildStages(_buildStages);
  }

  function addToBuild({ category_slug, component_id, cb }: IAddToBuildProps) {
    const is_in_build = currentBuild.find((d) => d.category_slug === category_slug)
    let _currentBuild = [...currentBuild];
    if (is_in_build) {
      _currentBuild = _currentBuild.filter((d) => d.category_slug !== category_slug)
    }
    const _buildStages = [...buildStages];
    const _current_build_category = _buildStages.find((d) => d.slug === category_slug);

    if (_current_build_category) {
      // add componenet to build array
      const _current_component = _current_build_category.items.find((d) => d._id === component_id)
      const _current_component_index = _current_build_category.items.findIndex((d) => d._id === component_id)

      // add component to build
      if (_current_component && _current_build_category) {
        _current_component.category_slug = _current_build_category.slug;

        setCurrentBuild([
          _current_component,
          ..._currentBuild,
        ]);
        setCurrentBuild((prev) => {
          if (cb) {
            cb([
              _current_component,
              ..._currentBuild,
            ]);
          }
          return prev;
        })
      }

      if (_current_component_index >= 0 && _current_component && _current_build_category) {
        const _currrent_index_build = buildStages.findIndex((d) => d.slug === _current_build_category?.slug)
        _buildStages[_currrent_index_build].selectedItem = {
          _id: _current_component?._id,
          index: _currrent_index_build,
          slug: _current_build_category?.slug,
        }
      }
    }

    setBuildStages(_buildStages);
  }

  function _highestSegmentCPUGPU({ cpu_id, gpu_id, }: { cpu_id: string; gpu_id: string; }) {
    const _portinos_product_feed = portinos_product_feed as IPortinosProductFeed;

    const cpu_product = _portinos_product_feed.products.find(
      (pf) => pf.id === parseInt(cpu_id, 10)
    );
    const gpu_product = _portinos_product_feed.products.find(
      (pf) => pf.id === parseInt(gpu_id, 10)
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

    return {
      highest_segment,
      cpu_product,
      cpu_product_segment,
      gpu_product,
      gpu_product_segment,
    }
  }

  function handleCleanGameTitlesData(preferenceGameTypes: string[], preferences: BuildPCPreferenceType): ICleanPreferenceData[] {
    const _preferences_feed = formatPreferencesData({ _data: preferences_feed })
    // const _portinos_product_feed = portinos_product_feed as IPortinosProductFeed;
    let all_data: ICleanPreferenceData[] = [];
    const _preferenceGameTypes = preferenceGameTypes

    const selected_res = preferences.gaming_resolution?.title;
    const selected_fps_range = preferences.gaming_fps!.range;

    let _fps_above_range_max: ICleanPreferenceData['data'] = null; // minimum above max range
    let _fps_below_range_max: ICleanPreferenceData['data'] = null; // maximum below max range
    if (selected_res) {
      all_data = _preferenceGameTypes.map((game_title) => {
        _fps_above_range_max = null;
        _fps_below_range_max = null;
        const game_products_in_range: ICleanPreferenceData['data'][] = [];

        _preferences_feed.forEach((product) => {
          const current_game_value = product.gameTitles[game_title];
          const _fps_value = parseInt(current_game_value[selected_res], 10);
          const _max_value = typeof selected_fps_range?.max === 'number' ? selected_fps_range?.max : parseInt(selected_fps_range?.max, 10);

          const { highest_segment } = _highestSegmentCPUGPU({ cpu_id: product.cpu, gpu_id: product.gpu });

          if ((_fps_below_range_max?.fps && _fps_value < _max_value && _fps_value >= parseInt(_fps_below_range_max?.fps, 10))
            || !_fps_below_range_max?.fps) {

            let _final_obj = {
              cpu: product.cpu,
              cpu_gpu_key: product.cpu_gpu_key,
              gpu: product.gpu,
              res: selected_res,
              fps: `${_fps_value}`,
              segment: highest_segment,
            }

            if (_fps_below_range_max && _fps_value === parseInt(_fps_below_range_max?.fps as string, 10) && _fps_below_range_max?.segment) {

              if (preferenceBuildSegmentWeight[highest_segment!] > preferenceBuildSegmentWeight[_fps_below_range_max.segment]) {
                _final_obj = _fps_below_range_max as typeof _final_obj
              }
            }

            _fps_below_range_max = _final_obj;
          }
          if (_fps_value >= parseInt(selected_fps_range?.min, 10)) {

            if (_fps_value <= _max_value) {
              game_products_in_range.push({
                cpu: product.cpu,
                cpu_gpu_key: product.cpu_gpu_key,
                gpu: product.gpu,
                res: selected_res,
                fps: `${_fps_value}`,
                segment: highest_segment,
              });
            } else if (_fps_value > _max_value) {
              // current fps value is higher than the max fps range,
              // there is initial fps value and the initial fps value is less than current fps value
              // OR there is no initial fps value
              if ((_fps_above_range_max?.fps && _fps_value < parseInt(_fps_above_range_max?.fps, 10)) || !_fps_above_range_max?.fps) {
                let _final_obj = {
                  cpu: product.cpu,
                  cpu_gpu_key: product.cpu_gpu_key,
                  gpu: product.gpu,
                  res: selected_res,
                  fps: `${_fps_value}`,
                  segment: highest_segment,
                }

                if (_fps_above_range_max && _fps_value === parseInt(_fps_above_range_max?.fps as string, 10) && _fps_above_range_max?.segment) {
                  if (preferenceBuildSegmentWeight[highest_segment!] > preferenceBuildSegmentWeight[_fps_above_range_max.segment]) {
                    _final_obj = _fps_above_range_max as typeof _final_obj;
                  }
                }

                _fps_above_range_max = _final_obj;
              }
            }
          }
        })

        let _data: ICleanPreferenceData['data'] = null;

        if (game_products_in_range.length > 0) {
          game_products_in_range.forEach((_d) => {
            if (!_data) {
              _data = _d;
            } else if (_data) {
              if (parseInt(_d?.fps as string, 10) <= parseInt(_data.fps!, 10)) {
                if (_d?.segment && _data.segment) {
                  if (preferenceBuildSegmentWeight[_d.segment!] < preferenceBuildSegmentWeight[_data.segment]) {
                    _data = _d;
                  }
                } else {
                  _data = _d;
                }
              }
            }
          })
        } else {
          // get the next highest after max
          _data = _fps_above_range_max ? _fps_above_range_max : _fps_below_range_max;
        }

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
      const { cpu_product,
        gpu_product,
        highest_segment,
      } = _highestSegmentCPUGPU({ cpu_id: a_d.data?.cpu as string, gpu_id: a_d.data?.gpu as string })

      a_d = {
        ...a_d,
        cpu_product: cpu_product || null,
        gpu_product: gpu_product || null,
        highest_segment,
      }

      return a_d
    })

    return all_data;
  }

  function analyzeNoPreferenceForBuild(preferences: BuildPCPreferenceType, preferenceGameTypes: PreferenceGameType[]) {
    const _preferenceGameTypes = preferenceGameTypes.filter((d) => d.title !== noPreferenceName)

    let _highest_segment: ProductPredefinedPresets | null = null;

    if (preferences.gaming_fps?.fps === 'Up to 60 FPS' && preferences.gaming_resolution?.res === '1080P') {
      // only entry level
      _highest_segment = 'entry';
    } else if (
      (preferences.gaming_fps?.fps === 'Up to 175 FPS' && preferences.gaming_resolution?.res === '1080P')
      || (preferences.gaming_fps?.fps === 'Up to 60 FPS' && preferences.gaming_resolution?.res === '1440P')
    ) {
      // only maistream level
      _highest_segment = 'mainstream';
    } else if (
      (preferences.gaming_fps?.fps === '175 and Up' && preferences.gaming_resolution?.res === '1080P')
      || (preferences.gaming_fps?.fps === '175 and Up' && preferences.gaming_resolution?.res === '2160P')
      || (preferences.gaming_fps?.fps === '175 and Up' && preferences.gaming_resolution?.res === '1440P')
      || (preferences.gaming_fps?.fps === 'Up to 175 FPS' && preferences.gaming_resolution?.res === '1440P')
      || (preferences.gaming_fps?.fps === 'Up to 175 FPS' && preferences.gaming_resolution?.res === '2160P')
      || (preferences.gaming_fps?.fps === 'Up to 60 FPS' && preferences.gaming_resolution?.res === '2160P')
    ) {
      // only enthusiast
      _highest_segment = 'enthusiast';
    }

    if (_highest_segment) {
      const all_data = handleCleanGameTitlesData(_preferenceGameTypes.map(d => d.title), preferences)

      setCleanGameInfoArray(all_data)
      setBuildSegment(_highest_segment)
      getPredefineBuilds(_highest_segment!)
      mapOutEligibleProducts(_highest_segment!)
    }
  }

  function analyzePreferencesForBuild(preferences: BuildPCPreferenceType) {
    const all_data = handleCleanGameTitlesData(preferences.game_type_title, preferences)
    console.log({ all_data });

    let _highest_segment: ProductPredefinedPresets | null = null;
    // check the segments
    all_data.forEach((a_d) => {
      if (a_d.highest_segment) {
        if (!_highest_segment) {
          _highest_segment = a_d.highest_segment;
        } else if (preferenceBuildSegmentWeight[a_d.highest_segment] < preferenceBuildSegmentWeight[_highest_segment]) {
          _highest_segment = a_d.highest_segment;
        }
      }
    })

    // console.log({ all_data, _highest_segment });
    setCleanGameInfoArray(all_data)
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
      // buildModel: '',
      build_segment,
      items: [],
    }

    Array.from(Object.keys(pre_set)).forEach((ps: string) => {
      const _id = pre_set[ps as keyof (typeof pre_set)]
      const _product = _portinos_product_feed.products.find((ppf) => ppf.id === _id)
      if (_product) {
        const category_slug = buildSlugMap[ps as keyof (typeof pre_set)];
        const specs = determineProductSpecs(_product, category_slug);
        predefined_pre_sets.items.push({
          original_slug: ps as IPortinosProductPresetKeys,
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
    // 20240104 / 20240114

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

      // upsell only one level
      if ((preferenceBuildSegmentWeight[_current_segment] === preferenceBuildSegmentWeight[build_segment]) // current level
        || (preferenceBuildSegmentWeight[_current_segment] === (preferenceBuildSegmentWeight[build_segment] + 1))) { // one level above
        eligible_products.push(ppf)
        const category_slug = buildSlugMap[ppf.category!];
        const specs = determineProductSpecs(ppf, category_slug);

        formatted_products[`${buildSlugMap[ppf.category!]}`]?.push({
          original_slug: ppf.category!,
          _id: `${ppf.id}`,
          image: ppf.picture,
          price: ppf.price,
          rating: 5,
          title: ppf.model_name,
          category_slug,
          specs,
        })
      }

      // upsell to highest level
      // if (preferenceBuildSegmentWeight[_current_segment] >= preferenceBuildSegmentWeight[build_segment]) {
      // }
    })

    setBuildStages((prev) => prev.map((pv) => ({
      ...pv,
      items: formatted_products[pv.slug]
    })))
  }

  const togglePreBuildToCurrentBuildForPreview = useCallback((action: 'add' | 'remove') => {
    switch (action) {
      case 'add':
        setBuildStages((prev) => prev.map((pv) => {
          const _item = predefinedBuilds.items.find((d) => d.category_slug === pv.slug) || null;

          return {
            ...pv,
            selectedItem: _item
          } as IBuildStages
        }))
        setBuildStages((prev) => {
          const _current_build: IBuildComponent[] = [];
          prev.map((_prev) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _current_build.push(_prev.selectedItem! as any)
          });
          setCurrentBuild(_current_build);
          return prev;
        })
        // setCurrentBuild(predefinedBuilds.items);
        setBuildTypeFlow('preconfiged_build')
        break;

      case 'remove':
        setCurrentBuild([]);
        setBuildStages((prev) => prev.map((pv) => ({
          ...pv,
          selectedItem: null
        })))
        setBuildTypeFlow('build_components')
        break;

      default:
        break;
    }
  }, [predefinedBuilds.items])

  function resetPCBuild() {
    setCurrentBuild([]);
    setBuildSegment(null)
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
    buildFlowType,
    cleanGameInfoArray,
    // currentBuildStage,

    togglePreBuildToCurrentBuildForPreview,
    addComponentToBuild: addToBuild,
    removeComponentToBuild: removeFromBuild,
    resetPCBuild,
    analyzeNoPreferenceForBuild,
    analyzePreferencesForBuild,
  }
}

export default useBuildByComponentContext