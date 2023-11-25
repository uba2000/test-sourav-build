import { useEffect, useState } from 'react';
import type { IBuildStages } from '../types/context-types'
import useBuildPCContext from './contextHooks/useBuildPCContext';

function useBuildPCStages() {
  const { buildStages, currentBuild } = useBuildPCContext()
  const [currentBuildStage, setCurrentBuildStage] = useState(buildStages[currentBuild.length]);
  const [currentBuildStageIndex, setCurrentBuildStageIndex] = useState(currentBuild.length);

  function getStageData(_slug: string): IBuildStages {
    const _stage = buildStages.find((d) => d.slug === _slug);
    return _stage as IBuildStages;
  }

  useEffect(() => { 
    setCurrentBuildStage(buildStages[currentBuild.length])
    setCurrentBuildStageIndex(currentBuild.length)
  }, [buildStages, currentBuild, currentBuild.length])

  return {
    buildStages, getStageData, currentBuildStage,
    currentBuildStageIndex
  }
}

export default useBuildPCStages