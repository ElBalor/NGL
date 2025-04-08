"use client";
import { useRef, useState } from "react";
import { FiRefreshCw } from "react-icons/fi"; // Optional: install react-icons

const prizes = [
  "💰 500 Coins",
  "🎉 Free Spin",
  "💎 Mega Jackpot",
  "❌ Lose Turn",
  "🔥 200 Coins",
  "🔁 Try Again",
  "🎲 Mystery Box",
  "🍀 Lucky Boost",
  "🪙 1000 Coins",
  "🧨 Bomb! Lose All",
  "💵 Double Winnings",
  "🎫 Free Game Pass",
];

export default function SpinningWheel() {
  const wheelRef = useRef(null);
  const [result, setResult] = useState(null);
  const [spun, setSpun] = useState(false);

  const spinWheel = () => {
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const angle = 3600 + randomIndex * (360 / prizes.length);
    setResult(null);
    setSpun(true);

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s ease-out";
      wheelRef.current.style.transform = `rotate(${angle}deg)`;
    }

    setTimeout(() => {
      setResult(prizes[randomIndex]);
    }, 4000);
  };

  const resetWheel = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(0deg)`;
    }
    setResult(null);
    setSpun(false);
  };

  return (
    <div className="flex flex-col items-center py-16">
      <div className="relative w-64 h-64 border-8 border-purple-500 rounded-full overflow-hidden">
        <div
          ref={wheelRef}
          className="absolute w-full h-full rounded-full bg-gradient-to-tr from-purple-600 via-black to-purple-900 flex items-center justify-center text-2xl font-bold text-white"
        >
          🎯
        </div>
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rotate-45 shadow-lg z-10"></div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={spinWheel}
          className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-full font-semibold text-white shadow-md"
        >
          Spin the Wheel
        </button>
        {spun && (
          <button
            onClick={resetWheel}
            className="text-white hover:text-amber-400 text-xl"
            title="Reset"
          >
            <FiRefreshCw />
          </button>
        )}
      </div>

      {result && (
        <p className="mt-4 text-lg text-amber-400 font-medium">
          You got: {result}
        </p>
      )}
    </div>
  );
}
