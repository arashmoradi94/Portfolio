import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Suppress browser extension errors (MetaMask, etc.)
const originalError = console.error;
console.error = (...args) => {
  const errorMessage = args[0]?.toString() || '';
  // Filter out common browser extension errors
  if (
    errorMessage.includes('IN_PAGE_CHANNEL_NODE_ID') ||
    errorMessage.includes('inpage.js') ||
    errorMessage.includes('content-script') ||
    errorMessage.includes('extension')
  ) {
    return; // Suppress extension errors
  }
  originalError.apply(console, args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
