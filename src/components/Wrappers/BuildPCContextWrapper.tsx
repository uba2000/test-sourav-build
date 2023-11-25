import React, { useMemo } from 'react'
import { BuildPCContext } from '../../lib/context/BuildPCContext'
import usePreferencContext from '../../lib/hooks/contextHooks/usePreferencContext';

function BuildPCContextWrapper({ children }: { children: React.ReactNode }) {

  const preferenceState = usePreferencContext();

  const buildPCState = useMemo(() => {
    return {
      ...preferenceState,
    }
  }, [preferenceState]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <BuildPCContext.Provider value={buildPCState as any}>{children}</BuildPCContext.Provider>
  )
}

export default BuildPCContextWrapper