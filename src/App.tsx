import { useState } from 'react';
import './App.css'

function App() {
  const [slots, setSlots] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  });

  const stageEmojis = {
    0: "🟫", // Empty dirt
    1: "🌱", // Sprout
    2: "🌿", // Growing
    3: "🌻", // Fully Grown (Max)
  };

  const growCrop = (id: number) => {
    setSlots(prevSlots => {
      const currentStage = prevSlots[id as keyof typeof prevSlots];

      if (currentStage >= 3) {
        return prevSlots;
      }

      return {
        ...prevSlots,
        [id]: currentStage + 1
      };
    });
  };

  return (
    <>
      <h1 className="game-title">My Garden</h1>

      <div className="game-container">

        <div className="garden-grid">
          {Object.keys(slots).map((key) => {
            const id = Number(key);
            const currentStage = slots[id as keyof typeof slots] as 0 | 1 | 2 | 3;

            return (
              <div key={id} className="garden-plot" onClick={() => growCrop(id)}>
                {stageEmojis[currentStage]}
              </div>
            );
          })}
        </div>

      </div>
    </>
  )
}

export default App