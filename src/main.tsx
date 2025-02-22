import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'normalize.css';
// Import Blueprint.js CSS
import '@blueprintjs/core/lib/css/blueprint.css';
// Import Blueprint Icons CSS
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
