import { useMemo } from 'react'

import type { BuildComponentPlaceholderType } from '../types/context-types'

import GraphicsCard from '../../assets/builds/Select-component-01-gpu.webp'
import PSU from '../../assets/builds/Select-component-07-power.webp'
import Case from '../../assets/builds/Select-component-05-case.webp'
import Cooling from '../../assets/builds/Select-component-06-cooling.webp'
import Memory from '../../assets/builds/Select-component-03-memory.webp'
import Motherboard from '../../assets/builds/Select-component-02-motherboard.webp'
import Processor from '../../assets/builds/Select-component-00-processor.webp'
import Storage from '../../assets/builds/Select-component-04-storage.webp'
import Entry from '../../assets/builds/PreConfigured-entry-level.webp'
import Enthusiast from '../../assets/builds/PreConfigured-enthusiast.webp'
import Mainstream from '../../assets/builds/PreConfigured-mainstream.webp'

function useBuildPlaceholders() {
  const placeholderImages = useMemo<BuildComponentPlaceholderType>(() => ({
    build_components: {
      "graphics-card": GraphicsCard,
      "power-supply": PSU,
      case: Case,
      cooling: Cooling,
      fan: Cooling,
      memory: Memory,
      motherboard: Motherboard,
      os: "",
      processor: Processor,
      storage: Storage,
    },
    preconfiged_build: {
      entry: Entry,
      enthusiast: Enthusiast,
      mainstream: Mainstream
    }
  }), [])

  return {
    placeholderImages
  }
}

export default useBuildPlaceholders