// import React from 'react'

import { useContext } from "react"
import { BuildPCContext } from "../../context/BuildPCContext"
import { IBuildPCContext } from "../../types/context-types";

function useBuildPCContext() {
  const state = useContext<IBuildPCContext | null>(BuildPCContext)

  return state as IBuildPCContext;
}

export default useBuildPCContext