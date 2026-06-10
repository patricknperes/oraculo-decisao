// Oráculo de Decisão

// Disciplina: Interação Humano Computador
//
// Autores:
// - Patrick Peres Nicolini (MATRÍCULA: 22.1.8103)
// - Carlos Gabriel de Oliveira Frazão (MATRÍCULA: 22.1.8100)

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import DecorativeBackground from "../../components/DecorativeBackground";

export default function HomePage() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-black text-white font-sans selection:bg-red-900 selection:text-white">
      <DecorativeBackground />

      <style>{`

        .letter-spacing-extreme { letter-spacing: 0.5em; }

        .letter-spacing-ultra { letter-spacing: 0.8em; }

       

        @keyframes pulse-ring {

          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1); }

          70% { box-shadow: 0 0 0 40px rgba(255, 255, 255, 0); }

          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }

        }

        .animate-pulse-ring { animation: pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }

      `}</style>

      <header
        className={`relative z-10 w-full p-8 text-center transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-zinc-600 text-[10px] letter-spacing-ultra uppercase">
          Sistema de Decisão
        </p>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-5xl px-4">
        <div
          className={`transition-all duration-1000 delay-300 ease-out flex flex-col items-center ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <h1 className="text-5xl md:text-8xl font-light tracking-[0.3em] ml-[0.3em] uppercase text-white/90 mb-16">
            Oráculo
          </h1>

          <button
            onClick={() => navigate("/oraculo")}
            className="relative group flex cursor-pointer items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full bg-black border border-white/20 transition-all duration-700 hover:border-white hover:scale-105 animate-pulse-ring focus:outline-none"
          >
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(255,255,255,0.2)] group-hover:shadow-[inset_0_0_80px_rgba(255,255,255,0.6)] transition-shadow duration-700" />

            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-zinc-800 via-white to-red-900 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-1000 -z-10" />

            <div className="relative z-10 flex flex-col items-center text-white/50 group-hover:text-white transition-colors duration-500">
              <i className="ri-eye-line text-4xl md:text-5xl mb-2 font-light"></i>

              <span className="text-[9px] uppercase tracking-[0.4em] font-medium ml-[0.4em]">
                Revelar
              </span>
            </div>
          </button>

          <p className="mt-16 max-w-md text-center text-zinc-500 text-xs md:text-sm leading-relaxed letter-spacing-extreme uppercase font-light">
            A incerteza é uma ilusão. <br />
            <span className="text-zinc-300">Inicie a convergência.</span>
          </p>
        </div>
      </main>

      <footer
        className={`relative z-10 w-full p-8 text-center transition-all duration-1000 delay-700 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-[1px] w-12 bg-zinc-800" />

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-zinc-400 text-xs tracking-widest uppercase font-medium">
            <span>Patrick Peres Nicolini</span>

            <span className="hidden md:inline text-red-900/50">|</span>

            <span>Carlos Gabriel de Oliveira Frazão</span>
          </div>

          <p className="text-zinc-700 text-[9px] tracking-[0.3em] uppercase mt-2">
            Interação Humano Computador · UFOP
          </p>
        </div>
      </footer>
    </div>
  );
}
