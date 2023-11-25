import React, { useMemo } from 'react'
import { BuildPCContext } from '../../lib/context/BuildPCContext'
import usePreferencContext from '../../lib/hooks/contextHooks/usePreferencContext';
import useBuildByComponentContext from '../../lib/hooks/contextHooks/useBuildByComponentContext';

function BuildPCContextWrapper({ children }: { children: React.ReactNode }) {

  const preferenceState = usePreferencContext();

  const buildState = useBuildByComponentContext();

  const buildPCState = useMemo(() => {
    return {
      ...preferenceState,

      ...buildState,
    }
  }, [preferenceState, buildState]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <BuildPCContext.Provider value={buildPCState as any}>{children}</BuildPCContext.Provider>
  )
}

export default BuildPCContextWrapper