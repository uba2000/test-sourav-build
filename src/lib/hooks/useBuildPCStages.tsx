import React, { useMemo } from 'react'

import CPUIcon from '../../assets/component-icons/cpu.svg'
import GPUIcon from '../../assets/component-icons/gpu.svg'
import ChipIcon from '../../assets/component-icons/chipset.svg'
import MemoryIcon from '../../assets/component-icons/memory.svg'
import MemoryStorageIcon from '../../assets/component-icons/memory-storage.svg'
import ServerIcon from '../../assets/component-icons/server.svg'
import CPUCoolerIcon from '../../assets/component-icons/cpu-cooler.svg'
import BatteryIcon from '../../assets/component-icons/battery.svg'
import WindowsIcon from '../../assets/component-icons/windows-11.svg'
import ProcessorImg from '../../assets/processor-i9.svg'

export interface IBuildStages {
  icon: string;
  title: string;
  slug: string;
  canCompare?: boolean;
  component: React.ReactNode;
}

function useBuildPCStages() {
  const cpuItems = useMemo(() => [
    {
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])

  const buildStages = useMemo<IBuildStages[]>(() => [
    {
      icon: CPUIcon,
      title: 'Processor',
      slug: 'processor',
      component: '',
      items: cpuItems,
    },
    {
      icon: GPUIcon,
      title: 'Graphics Card',
      slug: 'graphics-card',
      component: '',
      canCompare: true,
    },
    {
      icon: ChipIcon,
      title: 'Motherboard',
      slug: 'motherboard',
      component: '',
    },
    {
      icon: MemoryIcon,
      title: 'Memory',
      slug: 'memory',
      component: '',
    },
    {
      icon: MemoryStorageIcon,
      title: 'Memory Storage',
      slug: 'memory-storage',
      component: '',
    },
    {
      icon: ServerIcon,
      title: 'Server',
      slug: 'server',
      component: '',
    },
    {
      icon: CPUCoolerIcon,
      title: 'CPU Cooler',
      slug: 'cpu-cooler',
      component: '',
    },
    {
      icon: BatteryIcon,
      title: 'Battery',
      slug: 'battery',
      component: '',
    },
    {
      icon: WindowsIcon,
      title: 'Windows',
      slug: 'windows',
      component: '',
    },
  ], [cpuItems])

  function getStageData(_slug: string): IBuildStages {
    const _stage = buildStages.find((d) => d.slug === _slug);
    return _stage as IBuildStages;
  }

  return { buildStages, getStageData }
}

export default useBuildPCStages