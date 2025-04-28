import React from 'react';
import { useVisibility } from './App';

const VisibilityControls = () => {
  const { brightness, contrast, zoom, setBrightness, setContrast, setZoom } = useVisibility();
  // Backend for Contrast, Brightness, and Zoom
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white/90 shadow p-4 rounded-lg z-50 space-y-3 w-60">
      <div>
        <label className="block text-sm font-semibold">Brightness</label>
        <input
          type="range"
          min="50"
          max="150"
          value={brightness}
          onChange={(e) => setBrightness(+e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Contrast</label>
        <input
          type="range"
          min="50"
          max="150"
          value={contrast}
          onChange={(e) => setContrast(+e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Zoom</label>
        <input
          type="range"
          min="100"
          max="200"
          value={zoom}
          onChange={(e) => setZoom(+e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default VisibilityControls;
