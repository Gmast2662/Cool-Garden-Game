import { useState } from 'react';
import './App.css';

type Tool = 'water' | 'remove' | null;

// ==========================================
// ⚙️ CONFIGURATION
// ==========================================
const TOTAL_SLOTS = 9;

const STAGE_EMOJIS: Record<number, string> = {
  0: "🟫", // Dirt
  1: "🌱", // Sprout
  2: "🌿", // Growing
  3: "🌻" // fully grown
};
// ==========================================

// Automatically finds the highest stage number available in your config (e.g., 4)
const MAX_STAGE = Object.keys(STAGE_EMOJIS).length - 1;

function App() {
  // Generates an array of 0s based on your TOTAL_SLOTS config
  const [slots, setSlots] = useState<number[]>(Array(TOTAL_SLOTS).fill(0));
  const [activeTool, setActiveTool] = useState<Tool>('water');

  const columns = Math.ceil(Math.sqrt(TOTAL_SLOTS));

  const clickCrop = (clickedIndex: number) => {
    setSlots(prev =>
      prev.map((stage, idx) => {
        if (idx !== clickedIndex) return stage;

        // If it IS the clicked box, check the tool
        if (activeTool === 'water') return Math.min(stage + 1, MAX_STAGE);
        if (activeTool === 'remove') return 0;

        return stage;
      })
    );
  };

  return (
    <>
      <h1 className="game-title">My Garden</h1>
      <div className="game-container">

        <div
          className="garden-grid"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {slots.map((stage, index) => (
            <div key={index} className="garden-plot" onClick={() => clickCrop(index)}>
              {STAGE_EMOJIS[stage]}
            </div>
          ))}
        </div>

        <div className="toolbar-sidebar">
          <h3>Tools</h3>
          <button
            className={`tool-btn ${activeTool === 'water' ? 'active' : ''}`}
            onClick={() => setActiveTool('water')}
          >
            💧 Water
          </button>
          <button
            className={`tool-btn ${activeTool === 'remove' ? 'active' : ''}`}
            onClick={() => setActiveTool('remove')}
          >
            🪓 Remove Plants
          </button>
        </div>

      </div>
    </>
  );
}

export default App;