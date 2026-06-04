// Oráculo de Decisão

// Disciplina: Interação Humano Computador
//
// Autores:
// - Patrick Peres Nicolini (MATRÍCULA: 22.1.8103)
// - Carlos Gabriel de Oliveira Frazão (MATRÍCULA: 22.1.8100)

import { useEffect, useState } from "react";

const DATA_SYMBOLS = ["+", "·", "::", "///", "—", "|", "■", "□"];

export default function DecorativeBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      symbol: DATA_SYMBOLS[Math.floor(Math.random() * DATA_SYMBOLS.length)],
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 25 + 15}s`,
      delay: `-${Math.random() * 20}s`,
      opacity: Math.random() * 0.3 + 0.05,
      size: `${Math.random() * 0.6 + 0.4}rem`,
    }));

    setParticles(generateParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30vw] md:w-[15vw] h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.02),transparent)]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.05),transparent)]" />

      <style>{`

        @keyframes data-rise {

          0% { transform: translateY(110vh); opacity: 0; }

          10% { opacity: 1; }

          90% { opacity: 1; }

          100% { transform: translateY(-10vh); opacity: 0; }

        }

        .animate-data-rise { animation: data-rise linear infinite; }

      `}</style>

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-white animate-data-rise font-mono"
          style={{
            left: p.left,
            fontSize: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
