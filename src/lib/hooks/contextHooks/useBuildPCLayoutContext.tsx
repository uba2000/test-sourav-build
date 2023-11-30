import { useState } from "react"

function useBuildPCLayoutContext() {
  const [currentModelOnStage, setCurrentModelOnStage] = useState<string | null>(null);
  const [showCurrentModelSpecs, setShowCurrentModelSpecs] = useState<boolean>(false);
  const [viewingCurrentComponentModel, setViewingCurrentComponentModel] = useState<boolean>(false);

  function handleSetCurrentModelOnStage(model: string) {
    setCurrentModelOnStage(model)
  }

  function toggleShowSpecs() {
    setShowCurrentModelSpecs((prev) => !prev);
  }

  function toggleViewingComponentModel() {
    setViewingCurrentComponentModel((prev) => !prev);
  }

  return {
    currentModelOnStage,
    showCurrentModelSpecs,
    viewingCurrentComponentModel,

    toggleShowSpecs,
    toggleViewingComponentModel,
    setCurrentModelOnStage: handleSetCurrentModelOnStage
  }
}

export default useBuildPCLayoutContext