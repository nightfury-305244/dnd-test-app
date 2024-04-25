import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./index.css";

const root = createRoot(document.getElementById('root')!);

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

root.render(
  <React.StrictMode>
    <DndProvider backend={backend}>
      <App />
    </DndProvider>
  </React.StrictMode>
);
