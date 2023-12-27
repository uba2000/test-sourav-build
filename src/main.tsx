import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { preload } from 'swr'
import { preferenceUrlEndpoint as cacheKey, getPreferencesData } from './lib/api/preferenceAPI.ts'
import {
  getPortinosInventory, portinosInventoryEndpoint as portinosCacheKey,
  getPortinosRatings, portinosRatingEndpoint as portinosRatingCacheKey
} from './lib/api/portinosAPI.ts'

preload(cacheKey, getPreferencesData)
preload(portinosCacheKey, getPortinosInventory)
preload(portinosRatingCacheKey, getPortinosRatings)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
