import { useLayoutEffect, useState } from 'react'
import useBuildPCContext from './contextHooks/useBuildPCContext';
import { IFPSTypesItem } from '../types/context-types';

function useFPSItemDisability(d: IFPSTypesItem) {
  const { initialMinMaxFPS: minMaxFPS } = useBuildPCContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDisabled, setIsDisabled] = useState(false);
  const max = typeof d.range.max === 'number' ? d.range.max : parseInt(d.range.max);

  useLayoutEffect(() => {
    if (minMaxFPS.min && minMaxFPS.max) {
      // const _disabled = (parseInt(d.range.min) > minMaxFPS.max && max > minMaxFPS.max) 
      //   || (parseInt(d.range.min) < minMaxFPS.min && max < minMaxFPS.min)
      // setIsDisabled(_disabled);
    }
  }, [d.fps, d.range, max, minMaxFPS]);

  return { isDisabled }
}

export default useFPSItemDisability