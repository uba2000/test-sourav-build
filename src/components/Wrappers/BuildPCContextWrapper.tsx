import React, { useCallback, useMemo, useState } from 'react'
import { BuildPCContext } from '../../lib/context/BuildPCContext'
import usePreferencContext from '../../lib/hooks/contextHooks/usePreferencContext';
import useBuildByComponentContext from '../../lib/hooks/contextHooks/useBuildByComponentContext';
import { useNavigate } from 'react-router-dom';
import RouteNames from '../../lib/utils/routenames';
import { AddToRetailerUsersCartPropsType, IBuildPCContext } from '../../lib/types/context-types';
import useBuildPCLayoutContext from '../../lib/hooks/contextHooks/useBuildPCLayoutContext';
import usePixelStreamContext from '../../lib/hooks/contextHooks/usePixelStreamContext';

function BuildPCContextWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  const preferenceState = usePreferencContext();

  const buildState = useBuildByComponentContext();

  const buildLayoutState = useBuildPCLayoutContext();

  const pixel3DStreaming = usePixelStreamContext(buildState.currentBuild);

  const resetApp = useCallback(() => {
    preferenceState.resetPreferences();
    buildPCState.resetPCBuild();
    buildLayoutState.resetBuildPCLayout();
    pixel3DStreaming.resetPixelStream();
    // window.location.replace(`${import.meta.env.VITE_BASE_URL}${RouteNames.home}`);
    // window.location.reload();
    navigate(RouteNames.home);
  }, []);

  const [addToCartState, setAddToCartState] = useState<AddToRetailerUsersCartPropsType['state'] | null>(null)

  const addToRetailerUsersCart = useCallback(({ state, _toggleState }: AddToRetailerUsersCartPropsType) => {
    setAddToCartState(state)
    if (state === 'complete') {
      // navigate(RouteNames.resetSessionPage);
    }
    buildLayoutState.setThankYouModalOpen((prev) => _toggleState ? _toggleState : !prev)
  }, [])

  const buildPCState = useMemo(() => {
    return {
      ...preferenceState,
      ...buildState,
      ...buildLayoutState,
      ...pixel3DStreaming,
      resetApp,
      addToCartState,
      addToRetailerUsersCart,
    }
  }, [
    preferenceState, buildLayoutState,
    buildState, resetApp,
    addToCartState, pixel3DStreaming,
    addToRetailerUsersCart
  ]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <BuildPCContext.Provider value={buildPCState as IBuildPCContext}>{children}</BuildPCContext.Provider>
  )
}

export default BuildPCContextWrapper