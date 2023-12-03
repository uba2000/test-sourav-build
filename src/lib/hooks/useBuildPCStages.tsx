import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { IBuildStages } from '../types/context-types'
import useBuildPCContext from './contextHooks/useBuildPCContext';
import { useMatches } from 'react-router-dom';

function useBuildPCStages() {
  const matches = useMatches();
  const _category_slug = useMemo(() => matches[0].params?.category_slug, [matches])
  const { buildStages, currentBuild } = useBuildPCContext()

  // to know the next build stages
  const [nextToBuildIndex, setNextToBuildIndex] = useState<number>(-1)
  const [currentBuildStageIndex, setCurrentBuildStageIndex] = useState(currentBuild.length);

  function getStageData(_slug: string): IBuildStages {
    const _stage = buildStages.find((d) => d.slug === _slug);
    return _stage as IBuildStages;
  }

  useEffect(() => {
    if (_category_slug) {
      const _next_index_to_build = buildStages.findIndex((d) => d.selectedItem === null)
      setCurrentBuildStageIndex(_next_index_to_build)
    }
  }, [_category_slug, buildStages, currentBuild, currentBuild.length])

  useLayoutEffect(() => { 
    const _next_index_to_build = buildStages.findIndex((d) => d.selectedItem === null)
    // console.log({_next_index_to_build, buildStages});
    setNextToBuildIndex(_next_index_to_build);
  }, [buildStages])

  return {
    buildStages, getStageData,
    currentBuildStageIndex, nextToBuildIndex
  }
}

export default useBuildPCStages