import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BagProvider } from './providers/bagProvider.tsx'
import { AppRoutes } from './Routes.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BagProvider>
        <AppRoutes />
      </BagProvider>
  </StrictMode>,
)
