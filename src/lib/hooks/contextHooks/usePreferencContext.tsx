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

import { BuildPCPreferenceType, IFPSTypesItem } from '../../types/context-types';

function usePreferencContext() {
  const preferenceGameTypes = useMemo(() => BuildGamePreferences, []);

  const [preferences, setPreferences] = useState<BuildPCPreferenceType>({
    game_type_title: [],
    gaming_fps: '',
    gaming_resolution: '',
  });

  const preferenceFPSTypes = useMemo<IFPSTypesItem[]>(() => [
    {
      _id: _.uniqueId(),
      fps: '180+ FPS',
      video: Desktop180FPS,
      thumbnail: Desktop180FPSThumb,
    },
    {
      _id: _.uniqueId(),
      fps: '120-179 FPS',
      video: Desktop120FPS,
      thumbnail: Desktop120FPSThumb,
    },
    {
      _id: _.uniqueId(),
      fps: '60-119 FPS',
      video: Desktop60FPS,
      thumbnail: Desktop60FPSThumb,
    },
  ], [])

  const preferenceResolutions = useMemo(() => [
    {
      title: '4K UHD=',
      res: '2160P',
      image: Desktop4KResImage,
      fullImage: Desktop4KResFullImage,
    },
    {
      title: 'QHD=',
      res: '1440P',
      image: DesktopQHDResImage,
      fullImage: DesktopQHDResFullImage,
    },
    {
      title: 'FHD=',
      res: '1080P',
      image: DesktopFHDResImage,
      fullImage: DesktopFHDResFullImage,
    },
  ], [])

  function setGamingPreference(field: keyof (typeof preferences), value: string) {
    if (field) {
      setPreferences(prev => ({...prev, [field]: value}))
    }
  }

  return {
    preferences,
    preferenceFPSTypes,
    preferenceGameTypes,
    preferenceResolutions,

    setGamingPreference,
  }
}

export default usePreferencContext