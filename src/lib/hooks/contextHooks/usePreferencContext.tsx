import { useMemo, useState } from 'react'
import BuildGamePreferences from '../../../pages/build-pc/preference/BuildGamePreferences'
import _ from 'lodash';

import { getPreferencesData, preferenceUrlEndpoint as cacheKey } from "../../api/preferenceAPI"

import Desktop60FPS from '../../../assets/fps/FPS—ghostrunner2-timelapse—desktop—60.mp4'
import Desktop60FPSThumb from '../../../assets/fps/60fps-thumbnail.svg'
import Desktop120FPS from '../../../assets/fps/FPS—ghostrunner2-timelapse—desktop—120.mp4'
import Desktop120FPSThumb from '../../../assets/fps/120fps-thumbnail.svg'
import Desktop180FPS from '../../../assets/fps/FPS—ghostrunner2-timelapse—desktop—180.mp4'
import Desktop180FPSThumb from '../../../assets/fps/180fps-thumbnail.svg'

import Desktop4KResImage from '../../../assets/res/resolution-4k-desktop.svg'
import Desktop4KResFullImage from '../../../assets/res/resolution-4k-desktop.png'
import DesktopQHDResImage from '../../../assets/res/resolution-qhd-desktop.svg'
import DesktopQHDResFullImage from '../../../assets/res/resolution-qhd-desktop.png'
import DesktopFHDResImage from '../../../assets/res/resolution-hd-desktop.svg'
import DesktopFHDResFullImage from '../../../assets/res/resolution-hd-desktop.png'

import { BuildPCPreferenceType, IFPSTypesItem, IMinMaxFPS, IPreferenceResolutions, PreferenceResolutionsTitleType } from '../../types/context-types';
import { IFormatPreferencesDataReturn, formatPreferencesData } from '../../utils/util-build-preference';
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
  const preferenceGameTypes = useMemo(() => BuildGamePreferences, []);

  const [preferences, setPreferences] = useState<BuildPCPreferenceType>(initialPreferences);
  
  const [minMaxFPS, setMinMaxFPS] = useState<IMinMaxFPS>(initialMinMax)
  const preferenceFPSTypes = useMemo<IFPSTypesItem[]>(() => [
    {
      _id: _.uniqueId(),
      fps: '180+ FPS',
      range: {
        min: '180',
        max: Infinity,
      },
      video: Desktop180FPS,
      thumbnail: Desktop180FPSThumb,
    },
    {
      _id: _.uniqueId(),
      fps: '120-179 FPS',
      range: {
        min: '120',
        max: '179',
      },
      video: Desktop120FPS,
      thumbnail: Desktop120FPSThumb,
    },
    {
      _id: _.uniqueId(),
      fps: '60-119 FPS',
      range: {
        min: '60',
        max: '119',
      },
      video: Desktop60FPS,
      thumbnail: Desktop60FPSThumb,
    },
  ], [])

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
      setPreferences(prev => ({...prev, [field]: value}))
    }
  }

  function resetPreferences() {
    setPreferences(initialPreferences);
    setMinMaxFPS(initialMinMax);
  }

  const {
    data: preferences_feed,
  } = useSWR(cacheKey, getPreferencesData)

  // filter out titles not choosen and returns estimate max-min fps
  function filterGameTitles(allowed_titles: string[]) {
    const _preferences_feed = formatPreferencesData({ _data: preferences_feed })

    const newData = [..._preferences_feed].map((item) => {
      const filteredGameTitles = Object.keys(item.gameTitles)
        .filter((title) => allowed_titles.includes(title))
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

    const result: {
      min: Record<string, number>;
      max: Record<string, number>;
    } = { min: {}, max: {} };

    allowed_titles.forEach((title) => {
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

    const overallMin = Math.min(...Object.values(result.min));
    const overallMax = Math.max(...Object.values(result.max));

    setMinMaxFPS({
      min: overallMin,
      max: overallMax
    });

    return newData;
  }

  // adjust fps based on user input then filter res in those ranges
  function adjustFPSRange(preferenceFeed: IFormatPreferencesDataReturn[]) {
    const _preferenceFeed = [...preferenceFeed]
    const { max, min } = preferences.gaming_fps!.range;
    const allowedResolutionRange = {
      min: parseInt(min),
      max: typeof max === 'number' ? max : parseInt(max)
    }
    setMinMaxFPS(allowedResolutionRange);

    const resolutionValues: PreferenceResolutionsTitleType[] = ["fhd", "qhd", "4kuhd"];
    const presentResolutions: {
      [k in PreferenceResolutionsTitleType]: string[]
    } = {
      "4kuhd": [],
      fhd: [],
      qhd: []
    };

    resolutionValues.forEach(resolution => {
      presentResolutions[resolution] = _preferenceFeed
        .map(config =>
          Object.values(config.gameTitles)
            .map(title => title[resolution])
            .filter(value => {
              const _value = parseInt(value);
              return !(isNaN(_value) || _value < allowedResolutionRange.min || _value > allowedResolutionRange.max)
            })
        )
        .flat();
    });

    // if the length is 0 then no values for it.
    return presentResolutions;
  }

  return {
    minMaxFPS,
    preferences,
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