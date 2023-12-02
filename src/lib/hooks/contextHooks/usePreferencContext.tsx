import { useMemo, useState } from 'react'
import BuildGamePreferences from '../../../pages/build-pc/preference/BuildGamePreferences'
import _ from 'lodash';

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

import { BuildPCPreferenceType, IFPSTypesItem, IPreferenceResolutions } from '../../types/context-types';

const initialPreferences: BuildPCPreferenceType = {
  game_type_title: [],
  gaming_fps: null,
  gaming_resolution: null,
}

function usePreferencContext() {
  const preferenceGameTypes = useMemo(() => BuildGamePreferences, []);

  const [preferences, setPreferences] = useState<BuildPCPreferenceType>(initialPreferences);

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
  }

  return {
    preferences,
    preferenceFPSTypes,
    preferenceGameTypes,
    preferenceResolutions,

    setGamingPreference,
    resetPreferences,
  }
}

export default usePreferencContext