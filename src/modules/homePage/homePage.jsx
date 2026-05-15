import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RUNES = ["☽", "✦", "⟁", "⬡", "◈", "⍟", "⎊", "⌬", "⋆", "❋"];

function FloatingRune({ symbol, style }) {
  return (
    <span
      className="absolute select-none pointer-events-none text-indigo-300/20 font-light animate-float"
      style={style}
    >
      {symbol}
    </span>
  );
}

function Background({ runes }) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#3b1d8a33,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,#1e3a6e22,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_70%,#4c1d9522,transparent)]" />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {runes.map((r) => (
        <FloatingRune key={r.id} symbol={r.symbol} style={r.style} />
      ))}
    </>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [runes, setRunes] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    const generated = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      symbol: RUNES[i % RUNES.length],
      style: {
        left: `${Math.random() * 95}%`,
        top: `${Math.random() * 95}%`,
        fontSize: `${Math.random() * 2 + 0.8}rem`,
        animationDuration: `${Math.random() * 8 + 6}s`,
        animationDelay: `${Math.random() * 4}s`,
        opacity: Math.random() * 0.35 + 0.08,
      },
    }));
    setRunes(generated);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07060f] py-16 px-4">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>

      <Background runes={runes} />

      <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center">
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-8"}`}
        >
          <div
            className="relative group cursor-pointer animate-float-slow"
            onClick={() => navigate("/oraculo")}
          >
            <div className="absolute inset-0 bg-violet-600 rounded-full blur-2xl opacity-40 group-hover:opacity-70 group-hover:scale-125 transition-all duration-500" />

            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-violet-400/30 flex items-center justify-center bg-[radial-gradient(circle_at_30%_30%,#5b21b6,#020617)] shadow-[inset_0_0_30px_rgba(167,139,250,0.3),0_0_40px_rgba(124,58,237,0.4)] transition-all duration-500 overflow-hidden group-hover:border-violet-300/60 group-hover:shadow-[inset_0_0_50px_rgba(167,139,250,0.5),0_0_60px_rgba(124,58,237,0.6)]">
              <div className="absolute top-2 left-4 right-4 h-12 bg-gradient-to-b from-white/20 to-transparent rounded-[100%] filter blur-[1px]" />
              <div className="absolute bottom-2 left-8 right-8 h-6 bg-gradient-to-t from-white/10 to-transparent rounded-[100%] filter blur-[2px]" />

              <span className="text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                🔮
              </span>
            </div>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-violet-500/40 rounded-[100%] blur-[2px] animate-ping" />
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h1
            className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-200 to-indigo-400 drop-shadow-[0_0_20px_rgba(167,139,250,0.3)] px-2 mb-2"
            style={{ fontFamily: "'Cinzel Decorative', Georgia, serif" }}
          >
            Oráculo de Decisão
          </h1>
          <p className="text-violet-300/70 text-xs sm:text-sm tracking-[0.4em] uppercase mt-4 font-medium">
            Deixe o destino guiar suas escolhas
          </p>
          <div className="h-[2px] w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent rounded-full" />
        </div>

        <div
          className={`mt-10 mb-10 transition-all duration-1000 delay-500 w-full ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-8 sm:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] hover:bg-white/[0.03] transition-colors duration-500 group">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/5 blur-md -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed mb-10 font-light">
              Diante da névoa da incerteza, as runas estão prontas para
              revelar o caminho. Seja para escolher o banquete da noite ou o
              rumo de uma grande jornada,
              <span className="text-violet-300 font-medium">
                {" "}
                deposite suas dúvidas no santuário{" "}
              </span>
              e ouça a resposta soberana.
            </p>

            <button
              onClick={() => navigate("/oraculo")}
              className="relative overflow-hidden group/btn inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-violet-950/40 border border-violet-400/30 text-white text-sm font-bold uppercase tracking-widest transition-all duration-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:-translate-y-1 hover:border-violet-300/60 active:translate-y-0"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite] skew-x-12" />

              <span className="relative z-10 transition-transform duration-500 group-hover/btn:rotate-180 text-violet-300 text-lg">
                ✦
              </span>
              <span className="relative z-10">Consultar o Destino</span>
              <span className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1 text-violet-300 text-lg">
                ➔
              </span>
            </button>
          </div>
        </div>

        <p
          className={`text-center text-slate-500/60 text-xs mt-4 tracking-wider transition-all duration-1000 delay-[800ms] ${visible ? "opacity-100" : "opacity-0"}`}
        >
          Interação Humano Computador · UFOP
        </p>
      </div>
    </div>
  );
}
