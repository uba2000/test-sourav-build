import { useMemo, useState } from "react"
import type { IAddToBuildProps, IBuildComponent, IBuildStages } from "../../types/context-types"

import CPUIcon from '../../../assets/component-icons/cpu.svg?react'
import GPUIcon from '../../../assets/component-icons/gpu.svg?react'
import ChipIcon from '../../../assets/component-icons/chipset.svg?react'
import MemoryIcon from '../../../assets/component-icons/memory.svg?react'
import MemoryStorageIcon from '../../../assets/component-icons/memory-storage.svg?react'
import ServerIcon from '../../../assets/component-icons/server.svg?react'
import CPUCoolerIcon from '../../../assets/component-icons/cpu-cooler.svg?react'
import BatteryIcon from '../../../assets/component-icons/battery.svg?react'
import WindowsIcon from '../../../assets/component-icons/windows-11.svg?react'
import ProcessorImg from '../../../assets/processor-i9.svg'
import _ from "lodash"



function useBuildByComponentContext() {
  const cpuItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])
  const gpuItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])
  const motherboardItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])
  const memoryItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])
  const memoryStorageItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])
  const serverItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])
  const cpuCoolerItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])
  const batteryItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])
  const windowsItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
      image: ProcessorImg,
    },
  ], [])

  const [buildStages, setBuildStages] = useState<IBuildStages[]>([
    {
      icon: <CPUIcon />,
      title: 'Processor',
      short_name: 'Processor',
      slug: 'processor',
      component: '',
      items: cpuItems,
      selectedItem: null,
    },
    {
      icon: <GPUIcon />,
      title: 'Graphics Card',
      short_name: 'GPU',
      slug: 'graphics-card',
      component: '',
      canCompare: true,
      items: gpuItems,
      selectedItem: null,
    },
    {
      icon: <ChipIcon />,
      title: 'Motherboard',
      short_name: 'Motherboard',
      slug: 'motherboard',
      component: '',
      items: motherboardItems,
      selectedItem: null,
    },
    {
      icon: <MemoryIcon />,
      title: 'Memory',
      short_name: 'Memory',
      slug: 'memory',
      component: '',
      items: memoryItems,
      selectedItem: null,
    },
    {
      icon: <MemoryStorageIcon />,
      title: 'Memory Storage',
      short_name: 'Memory Storage',
      slug: 'memory-storage',
      component: '',
      items: memoryStorageItems,
      selectedItem: null,
    },
    {
      icon: <ServerIcon />,
      title: 'Server',
      short_name: 'Server',
      slug: 'server',
      component: '',
      items: serverItems,
      selectedItem: null,
    },
    {
      icon: <CPUCoolerIcon />,
      title: 'CPU Cooler',
      short_name: 'CPU Cooler',
      slug: 'cpu-cooler',
      component: '',
      items: cpuCoolerItems,
      selectedItem: null,
    },
    {
      icon: <BatteryIcon />,
      title: 'Battery',
      short_name: 'Battery',
      slug: 'battery',
      component: '',
      items: batteryItems,
      selectedItem: null,
    },
    {
      icon: <WindowsIcon />,
      title: 'Windows',
      short_name: 'Windows',
      slug: 'windows',
      component: '',
      items: windowsItems,
      selectedItem: null,
    },
  ])

  const [currentBuild, setCurrentBuild] = useState<IBuildComponent[]>([])

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
        _current_component.category_slug = _current_build_category.slug as string;
        console.log([
            ...currentBuild,
            _current_component
          ]);
        

        setCurrentBuild(
          (prev) => [
            ...prev,
            _current_component
          ]
        )
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

  return {
    buildStages,
    currentBuild,

    addComponentToBuild: addToBuild
  }
}

export default useBuildByComponentContext