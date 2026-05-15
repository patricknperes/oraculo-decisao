import { useEffect, useState, useRef } from "react";
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

export default function OraculoPage() {
    const navigate = useNavigate();
    const [runes, setRunes] = useState([]);
    const [inputOpcao, setInputOpcao] = useState("");
    const [opcoes, setOpcoes] = useState([]);
    const listaEndRef = useRef(null);

    const [visible, setVisible] = useState(false);

    const [statusRitual, setStatusRitual] = useState("preparando");
    const [textoEmbaralhado, setTextoEmbaralhado] = useState("");
    const [opcaoEscolhida, setOpcaoEscolhida] = useState("");

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 50);
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

    useEffect(() => {
        if (listaEndRef.current) {
            listaEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [opcoes]);

    const handleAdicionar = (e) => {
        e.preventDefault();
        if (!inputOpcao.trim()) return;
        setOpcoes([...opcoes, inputOpcao.trim()]);
        setInputOpcao("");
    };

    const handleRemover = (indexParaRemover) => {
        setOpcoes(opcoes.filter((_, index) => index !== indexParaRemover));
    };

    const iniciarRitual = () => {
        if (opcoes.length < 2) return;

        setStatusRitual("transicao");

        setTimeout(() => {
            setStatusRitual("invocando");

            let contagem = 0;
            const embaralharInterval = setInterval(() => {
                setTextoEmbaralhado(opcoes[contagem % opcoes.length]);
                contagem++;
            }, 90);

            setTimeout(() => {
                clearInterval(embaralharInterval);
                const indiceSorteado = Math.floor(Math.random() * opcoes.length);
                setOpcaoEscolhida(opcoes[indiceSorteado]);
                setStatusRitual("revelado");
            }, 4500);
        }, 1000);
    };

    const recalcularDestino = () => {
        setStatusRitual("invocando");
        setOpcaoEscolhida("");

        let contagem = 0;
        const embaralharInterval = setInterval(() => {
            setTextoEmbaralhado(opcoes[contagem % opcoes.length]);
            contagem++;
        }, 90);

        setTimeout(() => {
            clearInterval(embaralharInterval);
            const indiceSorteado = Math.floor(Math.random() * opcoes.length);
            setOpcaoEscolhida(opcoes[indiceSorteado]);
            setStatusRitual("revelado");
        }, 4500);
    };

    const reiniciarTudo = () => {
        setOpcoes([]);
        setInputOpcao("");
        setOpcaoEscolhida("");
        setStatusRitual("preparando");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07060f] py-16 px-4">
            <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes surprisePop {
          0% { opacity: 0; transform: scale(0.3) translateY(50px); filter: brightness(0); }
          60% { opacity: 1; transform: scale(1.05) translateY(-10px); filter: brightness(1.5); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: brightness(1); }
        }
        .animate-surprise { animation: surprisePop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow 20s linear infinite reverse; }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
      `}</style>

            <Background runes={runes} />

            <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
                <div
                    className={`text-center w-full transition-all duration-700 ease-in-out ${visible && statusRitual === "preparando"
                        ? "relative opacity-100 translate-y-0 mb-8 sm:mb-12"
                        : "absolute opacity-0 -translate-y-12 pointer-events-none"
                        }`}
                >
                    <h1
                        className="text-4xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-200 to-indigo-400 drop-shadow-[0_0_20px_rgba(167,139,250,0.3)] px-2 mb-2 sm:mb-4 cursor-pointer hover:scale-[1.02] transition-transform"
                        style={{ fontFamily: "'Cinzel Decorative', Georgia, serif" }}
                        onClick={() => navigate("/")}
                    >
                        O Altar do Destino
                    </h1>
                    <p className="text-violet-300/70 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase font-medium">
                        Deposite as alternativas no vazio
                    </p>
                    <div className="h-[2px] w-24 sm:w-40 mx-auto mt-4 sm:mt-6 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent rounded-full" />
                </div>

                <div
                    className={`w-full transition-all duration-700 ease-in-out ${visible && statusRitual === "preparando"
                        ? "relative opacity-100 scale-100 translate-y-0 delay-200"
                        : "absolute opacity-0 scale-90 translate-y-16 pointer-events-none delay-0"
                        }`}
                >
                    <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-5 sm:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
                        <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/5 blur-md -z-10" />

                        <form onSubmit={handleAdicionar} className="relative mb-8 sm:mb-10 group">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/30 to-indigo-600/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <input
                                    type="text"
                                    value={inputOpcao}
                                    onChange={(e) => setInputOpcao(e.target.value)}
                                    placeholder="Insira um caminho (ex: Pizza)..."
                                    className="flex-1 px-5 sm:px-8 py-4 sm:py-5 rounded-2xl bg-black/50 border border-white/10 focus:border-violet-400/60 focus:bg-black/70 focus:outline-none focus:ring-2 focus:ring-violet-400/30 text-white placeholder-slate-500 text-base sm:text-lg transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    className="relative overflow-hidden group/add inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-violet-900/60 border border-violet-400/30 text-white font-bold uppercase tracking-widest transition-all duration-300 hover:bg-violet-800/80 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:border-violet-300/60 active:scale-95"
                                >
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/add:animate-[shimmer_1.5s_infinite] skew-x-12" />
                                    <span className="relative z-10 text-violet-300 text-lg sm:text-xl transition-transform group-hover/add:rotate-90">
                                        ✦
                                    </span>
                                    <span className="relative z-10 text-xs sm:text-sm">Adicionar</span>
                                </button>
                            </div>
                        </form>

                        <div className="space-y-3 sm:space-y-4 max-h-[250px] sm:max-h-[320px] overflow-y-auto pr-2 mb-8 sm:mb-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {opcoes.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-slate-500/50 border border-dashed border-white/5 rounded-3xl bg-black/20">
                                    <span className="text-4xl sm:text-5xl mb-4 opacity-50 grayscale">
                                        ⚖️
                                    </span>
                                    <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-light text-center">
                                        A balança requer oferendas...
                                    </p>
                                </div>
                            ) : (
                                opcoes.map((opcao, idx) => (
                                    <div
                                        key={`${idx}-${opcao}`}
                                        className="animate-slide-in flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 rounded-2xl border border-white/5 bg-gradient-to-r from-white/[0.03] to-transparent hover:border-violet-400/20 hover:bg-white/[0.06] transition-all duration-300 group shadow-sm"
                                    >
                                        <span className="text-base sm:text-lg font-medium text-slate-200 flex items-center gap-3 sm:gap-5">
                                            <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-violet-950/50 text-violet-400/80 text-xs sm:text-sm font-mono border border-violet-700/30 shadow-inner shrink-0">
                                                {(idx + 1).toString().padStart(2, "0")}
                                            </span>
                                            <span className="truncate break-all">{opcao}</span>
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemover(idx)}
                                            className="text-slate-500 hover:text-white hover:bg-red-500/80 w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center transition-all opacity-100 sm:opacity-0 group-hover:opacity-100 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                                            title="Excluir"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))
                            )}
                            <div ref={listaEndRef} />
                        </div>

                        <div className="text-center relative z-20">
                            <button
                                type="button"
                                onClick={iniciarRitual}
                                disabled={opcoes.length < 2}
                                className={`relative overflow-hidden group/btn w-full py-5 sm:py-6 rounded-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.3em] text-sm sm:text-lg transition-all duration-500 flex items-center justify-center gap-2 sm:gap-4 ${opcoes.length >= 2
                                    ? "bg-violet-950/40 text-white border border-violet-400/40 hover:border-violet-300 hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] cursor-pointer hover:-translate-y-1"
                                    : "bg-black/50 text-slate-700 border border-white/5 cursor-not-allowed"
                                    }`}
                            >
                                {opcoes.length >= 2 && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet-800/80 via-indigo-600/80 to-cyan-700/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover/btn:animate-[shimmer_2s_infinite] skew-x-12" />
                                    </>
                                )}

                                <span
                                    className={`relative z-10 transition-transform duration-700 ${opcoes.length >= 2 ? "group-hover/btn:rotate-12 group-hover/btn:scale-125" : "grayscale opacity-30"}`}
                                >
                                    🔮
                                </span>
                                <span className="relative z-10">
                                    {opcoes.length < 2
                                        ? "Aguardando Opções"
                                        : "Invocar Resposta"}
                                </span>
                                <span
                                    className={`relative z-10 transition-transform duration-700 ${opcoes.length >= 2 ? "group-hover/btn:-rotate-12 group-hover/btn:scale-125" : "grayscale opacity-30"}`}
                                >
                                    🔮
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {(statusRitual === "invocando" || statusRitual === "revelado") && (
                    <div className="flex flex-col items-center justify-center w-full animate-surprise relative">
                        <div className="relative mb-12 sm:mb-16 mt-6 sm:mt-10 flex flex-col items-center">
                            {statusRitual === "invocando" && (
                                <>
                                    <div className="absolute -inset-4 sm:-inset-16 border border-cyan-500/20 rounded-full animate-spin-slow border-t-cyan-400/60 border-b-transparent" />
                                    <div className="absolute -inset-8 sm:-inset-24 border border-violet-500/20 rounded-full animate-spin-slow-reverse border-l-violet-400/60 border-r-transparent" />
                                </>
                            )}

                            <div
                                className={`absolute inset-0 rounded-full transition-all duration-1000 blur-[60px] sm:blur-[100px] -z-10 ${statusRitual === "invocando"
                                    ? "bg-violet-600 scale-[1.5] sm:scale-[2] opacity-60 animate-pulse"
                                    : "bg-amber-500 scale-[1.2] sm:scale-[1.5] opacity-50"
                                    }`}
                            />

                            <div className="relative animate-float-slow">
                                <div
                                    className={`w-64 h-64 sm:w-96 sm:h-96 rounded-full flex flex-col items-center justify-center relative transition-all duration-1000 overflow-hidden ${statusRitual === "invocando"
                                        ? "bg-[radial-gradient(circle_at_30%_30%,#3b0764,#020617)] shadow-[inset_0_0_50px_rgba(139,92,246,0.3),0_0_30px_rgba(124,58,237,0.5)] sm:shadow-[inset_0_0_80px_rgba(139,92,246,0.3),0_0_50px_rgba(124,58,237,0.5)] border border-violet-400/50"
                                        : "bg-[radial-gradient(circle_at_30%_30%,#451a03,#020617)] shadow-[inset_0_0_60px_rgba(251,191,36,0.4),0_0_40px_rgba(217,119,6,0.5)] sm:shadow-[inset_0_0_100px_rgba(251,191,36,0.4),0_0_60px_rgba(217,119,6,0.5)] border border-amber-400/60"
                                        }`}
                                >
                                    <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-4/5 h-20 sm:h-32 bg-gradient-to-b from-white/20 to-transparent rounded-[100%] filter blur-[1px]" />
                                    <div className="absolute bottom-4 sm:bottom-6 left-8 right-8 sm:left-12 sm:right-12 h-10 sm:h-16 bg-gradient-to-t from-white/10 to-transparent rounded-[100%] filter blur-[3px]" />

                                    {statusRitual === "invocando" && (
                                        <div className="text-center px-6 sm:px-10 z-10 w-full">
                                            <p className="text-violet-300/80 font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-6 animate-pulse">
                                                Vislumbrando Futuros
                                            </p>
                                            <h3 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] truncate px-2 sm:px-4">
                                                {textoEmbaralhado}
                                            </h3>
                                        </div>
                                    )}

                                    {statusRitual === "revelado" && (
                                        <div className="text-center px-6 sm:px-8 z-10 w-full animate-slide-in">
                                            <span className="text-amber-500/90 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase block mb-4 sm:mb-6 font-bold">
                                                O Destino Decretou
                                            </span>
                                            <h3
                                                className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-200 to-yellow-500 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)] px-2 break-words leading-tight"
                                                style={{
                                                    fontFamily: "'Cinzel Decorative', Georgia, serif",
                                                }}
                                            >
                                                {opcaoEscolhida}
                                            </h3>
                                        </div>
                                    )}
                                </div>

                                <div className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-4 sm:h-6 bg-black/80 border border-white/5 rounded-[100%] shadow-[0_-20px_40px_rgba(0,0,0,0.9)] blur-[2px]" />
                            </div>
                        </div>

                        {statusRitual === "revelado" && (
                            <div
                                className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full max-w-lg px-4 justify-center animate-slide-in"
                                style={{ animationDelay: "0.5s" }}
                            >
                                <button
                                    onClick={recalcularDestino}
                                    className="relative overflow-hidden group/btn flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:-translate-y-1 active:translate-y-0"
                                >
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite] skew-x-12" />
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <span className="text-lg">↻</span> Desafiar o Destino
                                    </span>
                                </button>

                                <button
                                    onClick={reiniciarTudo}
                                    className="relative flex-1 py-4 px-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-widest transition-all backdrop-blur-md hover:border-white/20 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <span className="text-violet-400 text-lg">✦</span> Retornar ao Altar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
