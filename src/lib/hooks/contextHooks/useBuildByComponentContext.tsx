import { useMemo, useState } from "react"
import _ from "lodash"

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
import GPUImg from '../../../assets/component-products/gpus.svg'
import MotherboardImg from '../../../assets/component-products/motherboard.svg'
import MemoryImg from '../../../assets/component-products/memory.svg'
import StorageImg from '../../../assets/component-products/storage.svg'
import WindowsImg from '../../../assets/component-products/windows.png'
import PowerSupplyImg from '../../../assets/component-products/powersupply.png'
import CoolingImg from '../../../assets/component-products/cooling.png'
import CaseImg from '../../../assets/component-products/case.png'
// import { matchRoutes, useLocation } from "react-router-dom"

// const componentBuildRoutes = [
//   { path: "/build-pc/choose-component/:category_slug" },
// ]

function useBuildByComponentContext() {
  // const location = useLocation()
  // const isOnBuildRoutes = matchRoutes(componentBuildRoutes, location)

  const cpuItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Intel® Core™ i9-14900KF processor',
      rating: 5,
      image: ProcessorImg,
      model: ProcessorImg,
      category_slug: 'processor',
      specs: [
        {
          spec_title: 'Cores',
          spec_value: '24',
        },
        {
          spec_title: 'GHz',
          spec_value: '6.0',
        },
        {
          spec_title: 'Watts',
          spec_value: '125',
        },
      ]
    },
  ], [])
  const gpuItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'MSI GeForce RTX 4090 Gaming X Trio',
      rating: 5,
      image: GPUImg,
      model: GPUImg,
      category_slug: 'graphics-card',
      specs: [
          {
            spec_title: 'GB GDDR6',
            spec_value: '12',
          },
          {
            spec_title: 'MHz',
            spec_value: '2100',
          },
          {
            spec_title: 'cm Wide',
            spec_value: '11.5',
          },
        ]
    },
  ], [])
  const motherboardItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'ASUS ROG Maximus Z790 Hero Gaming',
      rating: 5,
      image: MotherboardImg,
      model: MotherboardImg,
      category_slug: 'motherboard',
      specs: [
          {
            spec_title: 'LGA Socket',
            spec_value: '1700',
          },
          {
            spec_title: 'PCIe',
            spec_value: '5.0',
          },
          {
            spec_title: 'Memory',
            spec_value: 'DDR5',
          },
        ]
    },
  ], [])
  const memoryItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Corsair Vengeance 64GB',
      rating: 5,
      image: MemoryImg,
      model: MemoryImg,
      category_slug: 'memory',
      specs: [
          {
            spec_title: 'memory',
            spec_value: 'DDR5',
          },
          {
            spec_title: 'GB DIMMS',
            spec_value: '2x 16',
          },
          {
            spec_title: 'MHz',
            spec_value: '6200',
          },
        ]
    },
  ], [])
  const memoryStorageItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Samsung 970 EVO Plus 1TB Internal SSD',
      rating: 5,
      image: StorageImg,
      model: StorageImg,
      category_slug: 'storage',
      specs: [
          {
            spec_title: 'storage',
            spec_value: 'NVMe',
          },
          {
            spec_title: 'PCIe Gen',
            spec_value: '4.0',
          },
        ]
    },
  ], [])
  const caseItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Corsair iCUE 5000X RGB Mid-Tower ATX',
      rating: 5,
      image: CaseImg,
      model: CaseImg,
      category_slug: 'case',
      specs: [
          {
            spec_title: 'A units',
            spec_value: 'AAAA',
          },
          {
            spec_title: 'B units',
            spec_value: 'BBBB',
          },
          {
            spec_title: 'C units',
            spec_value: 'CCCC',
          },
        ]
    },
  ], [])
  const cpuCoolerItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Corsair iCUE H150i Elite Capellix XT',
      rating: 5,
      image: CoolingImg,
      model: CoolingImg,
      category_slug: 'cooling',
      specs: [
          {
            spec_title: 'A units',
            spec_value: 'AAAA',
          },
          {
            spec_title: 'B units',
            spec_value: 'BBBB',
          },
          {
            spec_title: 'C units',
            spec_value: 'CCCC',
          },
        ]
    },
  ], [])
  const batteryItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Corsair RM 1000-Watt ATX Modular Power Supply',
      rating: 5,
      image: PowerSupplyImg,
      model: PowerSupplyImg,
      category_slug: 'power-supply',
      specs: [
          {
            spec_title: 'Watt',
            spec_value: '1000',
          },
          {
            spec_title: 'mm fan',
            spec_value: '135',
          },
          {
            spec_title: 'modular',
            spec_value: 'ATX',
          },
        ]
    },
  ], [])
  const windowsItems = useMemo<IBuildComponent[]>(() => [
    {
      _id: _.uniqueId(),
      title: 'Microsoft Windows 11 Pro (PC) - English',
      rating: 5,
      image: WindowsImg,
      model: WindowsImg,
      category_slug: 'os',
      specs: [
          {
            spec_title: 'A units',
            spec_value: 'AAAA',
          },
          {
            spec_title: 'B units',
            spec_value: 'BBBB',
          },
          {
            spec_title: 'C units',
            spec_value: 'CCCC',
          },
        ]
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
      title: 'Storage',
      short_name: 'Storage',
      slug: 'storage',
      component: '',
      items: memoryStorageItems,
      selectedItem: null,
    },
    {
      icon: <ServerIcon />,
      title: 'Case',
      short_name: 'Case',
      slug: 'case',
      component: '',
      items: caseItems,
      selectedItem: null,
    },
    {
      icon: <CPUCoolerIcon />,
      title: 'CPU Cooling',
      short_name: 'CPU Cooling',
      slug: 'cooling',
      component: '',
      items: cpuCoolerItems,
      selectedItem: null,
    },
    {
      icon: <BatteryIcon />,
      title: 'Power Supply',
      short_name: 'Power Supply',
      slug: 'power-supply',
      component: '',
      items: batteryItems,
      selectedItem: null,
    },
    {
      icon: <WindowsIcon />,
      title: 'Operating System',
      short_name: 'OS',
      slug: 'os',
      component: '',
      items: windowsItems,
      selectedItem: null,
    },
  ])

  const [currentBuild, setCurrentBuild] = useState<IBuildComponent[]>([])
  const [currentBuildStage, setCurrentBuildStage] = useState<number>(-1);

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

  function resetPCBuild() {
    setCurrentBuild([]);
  }

  // useEffect(() => { 
  //   if (isOnBuildRoutes) {
  //     console.log('isOnBuildRoutes');
      
  //     // const _currentIndex = buildStages.findIndex(
  //     //   (d) => d.slug === isOnBuildRoutes[0].params.category_slug,
  //     // )
  //     // setCurrentBuildStage(_currentIndex)
  //     // setCurrentBuildStage(currentBuild.length)
  //   }
  // }, [isOnBuildRoutes])

  return {
    buildStages,
    currentBuild,
    currentBuildStage,

    addComponentToBuild: addToBuild,
    resetPCBuild,
  }
}

export default useBuildByComponentContext