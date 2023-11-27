import React, { useCallback, useMemo } from 'react'
import { BuildPCContext } from '../../lib/context/BuildPCContext'
import usePreferencContext from '../../lib/hooks/contextHooks/usePreferencContext';
import useBuildByComponentContext from '../../lib/hooks/contextHooks/useBuildByComponentContext';
import { useNavigate } from 'react-router-dom';
import RouteNames from '../../lib/utils/routenames';
import { AddToRetailerUsersCartPropsType, IBuildPCContext } from '../../lib/types/context-types';

function BuildPCContextWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  const preferenceState = usePreferencContext();

  const buildState = useBuildByComponentContext();

  const resetApp = useCallback(() => {
    preferenceState.resetPreferences();
    buildPCState.resetPCBuild();
    navigate(RouteNames.home);
  }, []);

  const addToRetailerUsersCart = useCallback(({ state }: AddToRetailerUsersCartPropsType) => {
    if (state === 'complete') {
      navigate(RouteNames.resetSessionPage);
    }
  }, [])

  const buildPCState = useMemo(() => {
    return {
      ...preferenceState,

      ...buildState,
      resetApp,
      addToRetailerUsersCart,
    }
  }, [preferenceState, buildState, resetApp, addToRetailerUsersCart]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <BuildPCContext.Provider value={buildPCState as IBuildPCContext}>{children}</BuildPCContext.Provider>
  )
}

export default BuildPCContextWrapper