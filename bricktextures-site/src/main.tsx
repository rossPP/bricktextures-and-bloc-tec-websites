import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ComingSoonApp from './ComingSoonApp.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComingSoonApp />
  </StrictMode>,
)
