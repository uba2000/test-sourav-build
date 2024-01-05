import { useMemo, useState } from 'react'
import BuildGamePreferences, { BuildGameNoPreferenceFPSConfig, BuildGamePreferencesType, noPreferenceName } from '../../../pages/build-pc/preference/BuildGamePreferences'

import { getPreferencesData, preferenceUrlEndpoint as cacheKey } from "../../api/preferenceAPI"

import Desktop60FPSThumb from '../../../assets/fps/60fps-thumbnail.svg'
import Desktop120FPSThumb from '../../../assets/fps/120fps-thumbnail.svg'
import Desktop180FPSThumb from '../../../assets/fps/180fps-thumbnail.svg'

import Desktop4KResImage from '../../../assets/res/resolution-4k-desktop.svg?react'
import Desktop4KResFullImage from '../../../assets/res/resolution-4k-desktop.png'
import DesktopQHDResImage from '../../../assets/res/resolution-qhd-desktop.svg?react'
import DesktopQHDResFullImage from '../../../assets/res/resolution-qhd-desktop.png'
import DesktopFHDResImage from '../../../assets/res/resolution-hd-desktop.svg?react'
import DesktopFHDResFullImage from '../../../assets/res/resolution-hd-desktop.png'

import {
  BuildPCPreferenceType, IAllGamesMinMaxFPS, IFPSTypesItem,
  // IFPSTypesItemIDType,
  IMinMaxFPS, IPreferenceResolutions, PreferenceResolutionsTitleType
} from '../../types/context-types';
import {
  IFormatPreferencesDataReturn, formatPreferencesData,
  // getNextRoundFigure, getPreviousRoundFigure
} from '../../utils/util-build-preference';
import useSWR from 'swr';

const initialPreferences: BuildPCPreferenceType = {
  game_type_title: [],
  gaming_fps: null,
  gaming_resolution: null,
}

const initialMinMax: IMinMaxFPS = {
  min: 0,
  max: 0,
}

function usePreferencContext() {
  const preferenceGameTypes = useMemo<BuildGamePreferencesType[]>(() => BuildGamePreferences, []);

  const [preferences, setPreferences] = useState<BuildPCPreferenceType>(initialPreferences);

  const [minMaxFPS, setMinMaxFPS] = useState<IMinMaxFPS>(initialMinMax)
  const [initialMinMaxFPS, setInitialMinMaxFPS] = useState<IMinMaxFPS>(initialMinMax)
  const [allGamesMinMaxFPS, setAllGamesMinMaxFPS] = useState<IAllGamesMinMaxFPS>()

  const [preferenceFPSTypes] = useState<IFPSTypesItem[]>([
    {
      _id: 'max_high_range',
      fps: '175 and Up',
      range: {
        min: '175',
        max: Infinity,
      },
      video: 'FPS—ghostrunner2-timelapse—desktop—180',
      videoM: 'FPS—ghostrunner2-timelapse—mobile—180',
      thumbnail: Desktop180FPSThumb,
    },
    {
      _id: 'mid_range',
      fps: 'Up to 175 FPS',
      range: {
        min: '61',
        max: '174',
      },
      video: 'FPS—ghostrunner2-timelapse—desktop—120',
      videoM: 'FPS—ghostrunner2-timelapse—mobile—120',
      thumbnail: Desktop120FPSThumb,
    },
    {
      _id: 'min_low_range',
      fps: 'Up to 60 FPS',
      range: {
        min: '0',
        max: '60',
      },
      video: 'FPS—ghostrunner2-timelapse—desktop—60',
      videoM: 'FPS—ghostrunner2-timelapse—mobile—60',
      thumbnail: Desktop60FPSThumb,
    },
  ])

  const preferenceResolutions = useMemo<IPreferenceResolutions[]>(() => [
    {
      title: '4kuhd',
      res: '2160P',
      image: Desktop4KResImage,
      fullImage: Desktop4KResFullImage,
    },
    {
      title: 'qhd',
      res: '1440P',
      image: DesktopQHDResImage,
      fullImage: DesktopQHDResFullImage,
    },
    {
      title: 'fhd',
      res: '1080P',
      image: DesktopFHDResImage,
      fullImage: DesktopFHDResFullImage,
    },
  ], [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setGamingPreference(field: keyof BuildPCPreferenceType, value: string | string[] | IFPSTypesItem) {
    if (field) {
      setPreferences(prev => ({ ...prev, [field]: value }))
    }
  }

  function resetPreferences() {
    setPreferences(initialPreferences);
    setMinMaxFPS(initialMinMax);
    setInitialMinMaxFPS(initialMinMax);
  }

  const {
    data: preferences_feed,
  } = useSWR(cacheKey, getPreferencesData, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    refreshInterval: 30000,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // function handleFPSRangeUpdates(fps_id: IFPSTypesItemIDType, { min, max }: { min: string, max: string }) {
  //   const _preferenceFPSTypes = [...preferenceFPSTypes];
  //   console.log('before', _preferenceFPSTypes);
  //   const _index_fps = _preferenceFPSTypes.findIndex((d) => d._id === fps_id);
  //   if ((_index_fps >= 0) && (min && max)) {
  //     _preferenceFPSTypes[_index_fps].range.min = min;
  //     _preferenceFPSTypes[_index_fps].range.max = max;
  //     _preferenceFPSTypes[_index_fps].fps = `${min}-${max} FPS`;
  //   }
  //   console.log('after', _preferenceFPSTypes);
  //   setPreferenceFPSTypes(_preferenceFPSTypes);
  // }

  // filter out titles not choosen and returns estimate max-min fps
  function filterGameTitles(allowed_titles: string[]) {
    const _preferences_feed = formatPreferencesData({ _data: preferences_feed })

    let _allowed_titles = allowed_titles
    const is_no_preference = allowed_titles.includes(noPreferenceName);

    if (is_no_preference) {
      _allowed_titles = preferenceGameTypes.filter(d => d.title !== noPreferenceName).map(d => d.title)
    }

    const newData = [..._preferences_feed].map((item) => {
      const filteredGameTitles = Object.keys(item.gameTitles)
        .filter((title) => _allowed_titles.includes(title))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((obj: any, key) => {
          obj[key] = item.gameTitles[key];
          return obj;
        }, {});

      return {
        ...item,
        gameTitles: filteredGameTitles,
      };
    });

    const result: IAllGamesMinMaxFPS = { min: {}, max: {} };

    _allowed_titles.forEach((title) => {
      result.min[title] = Number.MAX_SAFE_INTEGER;
      result.max[title] = Number.MIN_SAFE_INTEGER;

      newData.forEach((item) => {
        const game = item.gameTitles[title];
        if (game) {
          result.min[title] = Math.min(
            result.min[title],
            parseInt(game.fhd),
            parseInt(game.qhd),
            parseInt(game["4kuhd"])
          );

          result.max[title] = Math.max(
            result.max[title],
            parseInt(game.fhd),
            parseInt(game.qhd),
            parseInt(game["4kuhd"])
          );
        }
      });
    });

    // Dynamic Minimum (Low) range
    // Max out of the min values
    // const _dmm_lower_bound = Math.max(...Object.values(result.min));
    // Next Round above _lower_bound
    // const _dmm_upper_bound = getNextRoundFigure(_dmm_lower_bound);

    // Dynamic Mid-Range
    // Average FPS of all max values
    // const max_values = Object.values(result.max);
    // const total_max_values = max_values.reduce((sum, value) => sum + value, 0);
    // const average_max_values = Math.round(total_max_values / max_values.length);
    // Lower Bound: Previous round figure below average_max_values
    // const _dmd_lower_bound = getPreviousRoundFigure(average_max_values);
    // Upper bound: Next round figure above average_max_values
    // const _dmd_upper_bound = getNextRoundFigure(average_max_values);

    // Dynamic Maximum (High) Range
    // Min out of max values
    // const _dmx_upper_bound = Math.min(...Object.values(result.max));
    // Previous Round below _dmx_upper_bound
    // const _dmx_lower_bound = getPreviousRoundFigure(_dmx_upper_bound);

    // const overallMin = _dmd_lower_bound;
    // const overallMax = _dmd_upper_bound;
    const overallMin = Math.min(...Object.values(result.min));
    const overallMax = Math.max(...Object.values(result.max));

    // handleFPSRangeUpdates('max_high_range',
    //   {
    //     min: `${_dmx_lower_bound}`,
    //     max: `${_dmx_upper_bound}`,
    //   }
    // );
    // handleFPSRangeUpdates('mid_range',
    //   {
    //     min: `${_dmd_lower_bound}`,
    //     max: `${_dmd_upper_bound}`,
    //   }
    // );
    // handleFPSRangeUpdates('min_low_range',
    //   {
    //     min: `${_dmm_lower_bound}`,
    //     max: `${_dmm_upper_bound}`,
    //   }
    // );

    // console.log({
    //   overallMin,
    //   overallMax,
    //   result,
    //   newData,
    //   // average_max_values,
    //   // min_low_range: { _dmm_upper_bound, _dmm_lower_bound }, // lowest FPS
    //   // mid_range: { _dmd_lower_bound, _dmd_upper_bound }, // mid FPS
    //   // max_high_range: { _dmx_lower_bound, _dmx_upper_bound }, // highest FPS
    // });

    setAllGamesMinMaxFPS(result);

    setMinMaxFPS({
      min: overallMin,
      max: overallMax
    });
    setInitialMinMaxFPS({
      min: overallMin,
      max: overallMax
    });

    if (is_no_preference) {
      return [..._preferences_feed];
    }

    return newData;
  }

  // adjust fps based on user input then filter res in those ranges
  function adjustFPSRange(preferenceFeed: IFormatPreferencesDataReturn[]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _preferenceFeed = [...preferenceFeed]
    const { max, min } = preferences.gaming_fps!.range;
    const allowedResolutionRange = {
      min: parseInt(min),
      max: typeof max === 'number' ? max : parseInt(max)
    }
    setMinMaxFPS(allowedResolutionRange);

    // const resolutionValues: PreferenceResolutionsTitleType[] = ["fhd", "qhd", "4kuhd"];
    const presentResolutions: {
      [k in PreferenceResolutionsTitleType]: string[]
    } = {
      "4kuhd": ['1'],
      fhd: ['1'],
      qhd: ['1']
    };

    if (preferences.game_type_title.includes(noPreferenceName)) {
      const _adjustedFPS = BuildGameNoPreferenceFPSConfig[(preferences.gaming_fps!).fps]
      return _adjustedFPS;
    }

    // resolutionValues.forEach(resolution => {
    //   presentResolutions[resolution] = _preferenceFeed
    //     .map(config =>
    //       Object.values(config.gameTitles)
    //         .map(title => title[resolution])
    //         .filter(value => {
    //           const _value = parseInt(value);
    //           return !(isNaN(_value) || _value < allowedResolutionRange.min || _value > allowedResolutionRange.max)
    //         })
    //     )
    //     .flat();
    // });

    // if the length is 0 then no values for it.
    return presentResolutions;
  }

  return {
    minMaxFPS,
    initialMinMaxFPS,
    preferences,
    allGamesMinMaxFPS,
    preferenceFPSTypes,
    preferenceGameTypes,
    preferenceResolutions,

    adjustFPSRange,
    setGamingPreference,
    filterGameTitles,
    resetPreferences,
  }
}

export default usePreferencContext