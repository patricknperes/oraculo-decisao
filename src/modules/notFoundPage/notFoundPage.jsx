import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RUNES = ["☽", "✦", "⟁", "⬡", "◈", "⍟", "⎊", "⌬", "⋆", "❋"];

function FloatingRune({ symbol, style }) {
    return (
        <span
            className="absolute select-none pointer-events-none text-red-300/10 font-light animate-float"
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

export default function NotFoundPage() {
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
                opacity: Math.random() * 0.3 + 0.05,
            },
        }));
        setRunes(generated);
        return () => clearTimeout(t);
    }, []);

    return (

        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07060f] px-4">
            <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>


            <Background runes={runes} />

            <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
                <div className={`w-full relative transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}>

                    <div className="relative rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-10 sm:p-12 shadow-[0_30px_60px_-15px_rgba(225,29,72,0.2)] hover:bg-white/[0.03] transition-colors duration-500 group">
                        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-red-500/10 via-violet-500/5 to-transparent blur-md -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className={`flex justify-center mb-8 transition-all duration-1000 delay-200 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                            <div className="relative animate-float-slow">
                                <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 group-hover:scale-125 transition-all duration-500" />
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-red-400/20 flex items-center justify-center bg-[radial-gradient(circle_at_30%_30%,#881337,#020617)] shadow-[inset_0_0_20px_rgba(225,29,72,0.3),0_0_30px_rgba(159,18,57,0.4)] transition-all duration-500 overflow-hidden">
                                    <div className="absolute top-2 left-4 right-4 h-10 bg-gradient-to-b from-white/10 to-transparent rounded-[100%] filter blur-[1px]" />
                                    <span className="text-5xl opacity-80 grayscale mix-blend-luminosity">🔮</span>
                                </div>
                                <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping" style={{ animationDuration: '3s' }} />
                            </div>
                        </div>

                        <div className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                            <p
                                className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-red-200 to-rose-600 drop-shadow-[0_0_20px_rgba(225,29,72,0.3)] mb-2"
                                style={{ fontFamily: "'Cinzel Decorative', Georgia, serif" }}
                            >
                                404
                            </p>

                            <h2
                                className="text-lg sm:text-xl font-bold text-white/90 mb-4 tracking-wide"
                                style={{ fontFamily: "'Cinzel Decorative', Georgia, serif" }}
                            >
                                O Oráculo Não Vê Este Caminho
                            </h2>

                            <div className="h-[2px] w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-red-500/50 to-transparent rounded-full" />

                            <p className="text-slate-400/80 text-sm sm:text-base leading-relaxed mb-10 font-light">
                                As runas foram consultadas, mas esta página não existe no plano
                                mortal. O destino que você busca está <span className="text-red-300/80 font-medium">além do alcance</span> da visão.
                            </p>
                        </div>

                        <div className={`transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                            <button
                                onClick={() => navigate("/")}
                                className="relative overflow-hidden group/btn inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-900/60 to-rose-950/60 border border-violet-400/20 text-white text-sm font-bold uppercase tracking-widest transition-all duration-500 hover:shadow-[0_0_30px_rgba(159,18,57,0.4)] hover:-translate-y-1 hover:border-red-400/40 active:translate-y-0"
                            >
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite] skew-x-12" />

                                <span className="relative z-10 transition-transform duration-500 group-hover/btn:-translate-x-1 text-red-300 text-lg">☽</span>
                                <span className="relative z-10">Retornar ao Oráculo</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}