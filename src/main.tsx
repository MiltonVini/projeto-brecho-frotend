import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BagProvider } from './providers/bagProvider.tsx'
import { AppRoutes } from './Routes.tsx'
import { EmailProvider } from './providers/emailProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmailProvider>
      <BagProvider>
        <AppRoutes />
      </BagProvider>
    </EmailProvider>
  </StrictMode>,
)
