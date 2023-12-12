import { useMemo } from "react"
import type { IPreconfigedBuild } from "../../types/context-types"
import _ from "lodash"

import ProcessorImg from '../../../assets/processor-i9.svg'
import GPUImg from '../../../assets/component-products/gpus.svg'
import MotherboardImg from '../../../assets/component-products/motherboard.svg'
import MemoryImg from '../../../assets/component-products/memory.svg'
import StorageImg from '../../../assets/component-products/storage.svg'
import WindowsImg from '../../../assets/component-products/windows.png'
import PowerSupplyImg from '../../../assets/component-products/powersupply.png'
import CoolingImg from '../../../assets/component-products/cooling.png'
import CaseImg from '../../../assets/component-products/case.png'

function usePreBuiltBuilds() {
  const enthusiast = useMemo<IPreconfigedBuild>(() => ({
    title: 'Enthusiast gaming PC',
    // buildModel: EnthusiastModel,
    build_segment: 'enthusiast',
    items: [
      {
        _id: _.uniqueId(),
        title: 'Intel® Core™ i9-14900KF processor',
        rating: 5,
        image: ProcessorImg,
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
      {
        _id: _.uniqueId(),
        title: 'MSI GeForce RTX 4090 Gaming X Trio',
        rating: 5,
        image: GPUImg,
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
      {
        _id: _.uniqueId(),
        title: 'ASUS ROG Maximus Z790 Hero Gaming',
        rating: 5,
        image: MotherboardImg,
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
      {
        _id: _.uniqueId(),
        title: 'Corsair Vengeance 64GB',
        rating: 5,
        image: MemoryImg,
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
      {
        _id: _.uniqueId(),
        title: 'Samsung 970 EVO Plus 1TB Internal SSD',
        rating: 5,
        image: StorageImg,
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
      {
        _id: _.uniqueId(),
        title: 'Corsair iCUE 5000X RGB Mid-Tower ATX',
        rating: 5,
        image: CaseImg,
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
      {
        _id: _.uniqueId(),
        title: 'Corsair iCUE H150i Elite Capellix XT',
        rating: 5,
        image: CoolingImg,
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
      {
        _id: _.uniqueId(),
        title: 'Corsair RM 1000-Watt ATX Modular Power Supply',
        rating: 5,
        image: PowerSupplyImg,
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
      {
        _id: _.uniqueId(),
        title: 'Microsoft Windows 11 Pro (PC) - English',
        rating: 5,
        image: WindowsImg,
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
    ]
  }), []);
  

  return {
    enthusiast,
  }
}

export default usePreBuiltBuilds