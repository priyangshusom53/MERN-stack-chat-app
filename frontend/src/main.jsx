import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route } from 'react-router-dom'
import { Provider } from "@/components/ui/provider"
import './index.css'
import App, {ChatApp} from './App.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <ChatApp />
    </Provider>
  </StrictMode>
)
