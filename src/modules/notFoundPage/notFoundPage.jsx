import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import DecorativeBackground from "../../components/DecorativeBackground";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white font-sans px-4 selection:bg-zinc-800">
      <style>{`

        @keyframes fade-in-up {

          from { opacity: 0; transform: translateY(20px); }

          to { opacity: 1; transform: translateY(0); }

        }

        .animate-fade-up { animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }



        @keyframes flicker {

          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; filter: drop-shadow(0 0 15px rgba(255,255,255,0.4)); }

          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.2; filter: none; }

        }

        .animate-flicker { animation: flicker 4s infinite alternate; }



        @keyframes rotate-dead {

          from { transform: translate(-50%, -50%) rotate(0deg); }

          to { transform: translate(-50%, -50%) rotate(360deg); }

        }

        .animate-rotate-dead { animation: rotate-dead 40s linear infinite; }



        .letter-spacing-extreme { letter-spacing: 0.5em; }

        .letter-spacing-widest { letter-spacing: 0.3em; }

      `}</style>

      <DecorativeBackground />
      <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] md:w-[50rem] md:h-[50rem] rounded-full border border-zinc-900 border-dashed opacity-30 animate-rotate-dead pointer-events-none -z-0" />

      <div className="absolute top-1/2 left-1/2 w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem] rounded-full border-[0.5px] border-zinc-800 opacity-20 pointer-events-none -z-0 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        <div
          className={`w-full transition-all duration-1000 ease-out flex flex-col items-center ${
            visible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="flex items-center gap-3 text-zinc-600 mb-8">
            <i className="ri-prohibited-line text-xl"></i>

            <p className="text-[10px] letter-spacing-extreme uppercase font-medium">
              Vazio de Dados
            </p>
          </div>

          <h1 className="text-8xl sm:text-[12rem] font-light text-white tracking-widest animate-flicker leading-none mb-6 ml-[0.1em] select-none">
            404
          </h1>

          <div className="h-[1px] w-24 mx-auto mb-10 bg-zinc-800" />

          <h2 className="text-sm sm:text-lg font-normal text-zinc-300 mb-4 tracking-[0.3em] uppercase">
            Coordenada Inexistente
          </h2>

          <p className="text-zinc-500 text-xs sm:text-sm leading-loose mb-16 uppercase tracking-widest font-light max-w-md">
            As linhas de convergência não alcançam este setor.{" "}
            <br className="hidden sm:block" />
            <span className="text-zinc-400">O Monolito não vê esta rota.</span>
          </p>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center justify-center gap-4 px-10 py-5 bg-transparent border border-zinc-700 text-zinc-300 font-bold text-[10px] sm:text-xs uppercase letter-spacing-widest transition-all duration-500 hover:border-white hover:text-white hover:bg-white/5 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <i className="ri-arrow-left-line text-lg transition-transform group-hover:-translate-x-1"></i>
            Retornar ao Eixo Central
          </button>
        </div>
      </div>
    </div>
  );
}
