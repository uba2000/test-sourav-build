import { useState } from "react"

function useBuildPCLayoutContext() {
  const [currentModelOnStage, setCurrentModelOnStage] = useState<string | null>(null);
  const [showCurrentModelSpecs, setShowCurrentModelSpecs] = useState<boolean>(false);
  const [viewingCurrentComponentModel, setViewingCurrentComponentModel] = useState<boolean>(false);

  const [thankYouModalOpen, setThankYouModalOpen] = useState<boolean>(false);

  function handleSetCurrentModelOnStage(model: string) {
    setCurrentModelOnStage(model)
  }

  function toggleShowSpecs(_toggle?: boolean) {

    setShowCurrentModelSpecs((prev) => _toggle === undefined ? !prev : _toggle);
  }

  function toggleViewingComponentModel(_toggle?: boolean) {
    setViewingCurrentComponentModel((prev) => _toggle === undefined ? !prev : _toggle);
  }

  return {
    thankYouModalOpen,
    currentModelOnStage,
    showCurrentModelSpecs,
    viewingCurrentComponentModel,

    toggleShowSpecs,
    setThankYouModalOpen,
    toggleViewingComponentModel,
    setCurrentModelOnStage: handleSetCurrentModelOnStage
  }
}

export default useBuildPCLayoutContext