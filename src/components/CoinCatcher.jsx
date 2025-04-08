// components/CoinCatcher.jsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function CoinCatcher() {
  const [position, setPosition] = useState(50); // percentage left
  const [bombs, setBombs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const gameAreaRef = useRef(null);
  const gameInterval = useRef(null);

  const movePlayer = (direction) => {
    setPosition((prev) => {
      const newPos = direction === "left" ? prev - 10 : prev + 10;
      return Math.max(0, Math.min(90, newPos));
    });
  };

  const dropBomb = () => {
    setBombs((prev) => [
      ...prev,
      {
        id: Date.now(),
        left: Math.floor(Math.random() * 90),
        top: 0,
      },
    ]);
  };

  const updateBombs = () => {
    setBombs((prev) =>
      prev
        .map((bomb) => {
          const newTop = bomb.top + 5;
          return { ...bomb, top: newTop };
        })
        .filter((bomb) => {
          const collision =
            bomb.top > 85 &&
            bomb.left >= position - 5 &&
            bomb.left <= position + 5;

          if (collision) {
            clearInterval(gameInterval.current);
            setIsRunning(false);
            alert("💥 Game Over!");
          }

          return bomb.top < 100 && !collision;
        })
    );
  };

  useEffect(() => {
    if (isRunning) {
      gameInterval.current = setInterval(() => {
        setScore((s) => s + 1);
        dropBomb();
        updateBombs();
      }, 300);
    }

    return () => clearInterval(gameInterval.current);
  }, [isRunning]);

  return (
    <div
      ref={gameAreaRef}
      className="relative w-full h-[400px] bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-lg overflow-hidden p-4"
    >
      <h2 className="text-xl font-bold text-blue-700 mb-2">🏃 Bomb Dodge</h2>
      <div className="text-blue-900 font-semibold mb-2">Score: {score}</div>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          onClick={() => movePlayer("left")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
        >
          ◀️
        </button>
        <button
          onClick={() => movePlayer("right")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
        >
          ▶️
        </button>
      </div>

      {!isRunning && (
        <button
          onClick={() => {
            setScore(0);
            setBombs([]);
            setIsRunning(true);
          }}
          className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Start
        </button>
      )}

      {/* Player */}
      <div
        className="absolute bottom-2 w-8 h-8 bg-yellow-500 rounded-full shadow-lg"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />

      {/* Bombs */}
      {bombs.map((bomb) => (
        <div
          key={bomb.id}
          className="absolute w-6 h-6 bg-red-900 rounded-full"
          style={{
            top: `${bomb.top}%`,
            left: `${bomb.left}%`,
            transform: "translateX(-50%)",
          }}
        />
      ))}
    </div>
  );
}
