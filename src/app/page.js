// pages/index.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TiStarburst } from "react-icons/ti";
import SpinningWheel from "@/components/SpinningWheel";
import CoinCatcher from "@/components/CoinCatcher";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setShowNavbar(false); // Scrolling down
      } else {
        setShowNavbar(true); // Scrolling up
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-sans">
      {/* NAVBAR */}
      <header
        className={`flex justify-between items-center p-5 bg-black/60 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h1 className="text-2xl font-bold text-purple-400">🎰 NGL</h1>
        <nav className="space-x-6 text-sm sm:text-base">
          <a href="#" className="hover:text-amber-400">
            Home
          </a>
          <a href="#games" className="hover:text-amber-400">
            Games
          </a>
          <a href="#about" className="hover:text-amber-400">
            About
          </a>
        </nav>
        <button className="bg-amber-400 text-black px-4 py-2 rounded-full hover:bg-yellow-300 font-semibold">
          Login
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-5 pt-20 pb-32">
        <h2 className="text-4xl sm:text-6xl font-bold mb-4">Spin & Win</h2>
        <p className="text-lg text-gray-300 mb-6">
          Try your luck on the hottest slots and jackpot games 💸
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 shadow-lg">
          <TiStarburst className="text-xl" /> Play Now
        </button>
      </section>
      <SpinningWheel />
      <CoinCatcher />

      {/* GAME GRID */}
      <section id="games" className="px-6 sm:px-16 py-10">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          🔥 Ceracade Games
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-lg"
            >
              <Image
                src={`/games/game-${n}.png`}
                alt={`Game ${n}`}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">Slot Machine {n}</h4>
                <button className="text-sm text-amber-400 hover:underline">
                  Try Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="about"
        className="mt-20 px-8 py-10 bg-black/70 text-center text-sm text-gray-400"
      >
        <p>© 2025 Ceracade — All rights reserved.</p>
        <p>Built by ElBalor</p>
      </footer>
    </div>
  );
}
