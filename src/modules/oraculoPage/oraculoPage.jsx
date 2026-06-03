import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import DecorativeBackground from "../../components/DecorativeBackground";

export default function OraculoPage() {
  const navigate = useNavigate();

  const [inputOpcao, setInputOpcao] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const listaEndRef = useRef(null);
  const fileImgRef = useRef(null);
  const fileCsvRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [statusRitual, setStatusRitual] = useState("preparando");
  const [opcaoEmbaralhada, setOpcaoEmbaralhada] = useState(null);
  const [opcaoEscolhida, setOpcaoEscolhida] = useState(null);

  const modoAtual = opcoes.length === 0 ? "livre" : opcoes[0].tipo;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const isTelaSorteio =
      statusRitual === "transicao" ||
      statusRitual === "invocando" ||
      statusRitual === "revelado";

    document.body.style.overflow = isTelaSorteio ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [statusRitual]);

  useEffect(() => {
    if (listaEndRef.current && statusRitual === "preparando") {
      listaEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [opcoes, statusRitual]);

  const handleAdicionarTexto = (e) => {
    e.preventDefault();

    if (!inputOpcao.trim() || modoAtual === "imagem") return;

    const novaOpcao = {
      id: crypto.randomUUID(),
      tipo: "texto",
      conteudo: inputOpcao.trim(),
    };

    setOpcoes((prev) => [...prev, novaOpcao]);
    setInputOpcao("");
  };

  const handleCSVUpload = (e) => {
    if (modoAtual === "imagem") return;

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;

      const rows = text
        .split("\n")
        .map((row) => row.trim())
        .filter(Boolean);

      const novasOpcoes = rows.map((r) => ({
        id: crypto.randomUUID(),
        tipo: "texto",
        conteudo: r,
      }));

      setOpcoes((prev) => [...prev, ...novasOpcoes]);
    };

    reader.readAsText(file);

    if (fileCsvRef.current) fileCsvRef.current.value = "";
  };

  const handleImageUpload = (e) => {
    if (modoAtual === "texto") return;

    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const novasImagens = files.map((file) => ({
      id: crypto.randomUUID(),
      tipo: "imagem",
      conteudo: URL.createObjectURL(file),
    }));

    setOpcoes((prev) => [...prev, ...novasImagens]);

    if (fileImgRef.current) fileImgRef.current.value = "";
  };

  const handleRemover = (idParaRemover) => {
    setOpcoes((prev) => prev.filter((opcao) => opcao.id !== idParaRemover));
  };

  const executarSorteio = () => {
    let contagem = 0;

    const embaralharInterval = setInterval(() => {
      setOpcaoEmbaralhada(opcoes[contagem % opcoes.length]);
      contagem++;
    }, 120);

    setTimeout(() => {
      clearInterval(embaralharInterval);

      const indiceSorteado = Math.floor(Math.random() * opcoes.length);

      setOpcaoEscolhida(opcoes[indiceSorteado]);
      setStatusRitual("revelado");
    }, 5000);
  };

  const iniciarRitual = () => {
    if (opcoes.length < 2) return;

    setStatusRitual("transicao");

    setTimeout(() => {
      setStatusRitual("invocando");
      executarSorteio();
    }, 700);
  };

  const recalcularDestino = () => {
    setStatusRitual("transicao");

    setTimeout(() => {
      setStatusRitual("invocando");
      setOpcaoEscolhida(null);
      executarSorteio();
    }, 600);
  };

  const reiniciarTudo = () => {
    setStatusRitual("transicao");

    setTimeout(() => {
      setOpcoes([]);
      setInputOpcao("");
      setOpcaoEscolhida(null);
      setOpcaoEmbaralhada(null);
      setStatusRitual("preparando");
    }, 600);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-black text-white font-sans px-4 selection:bg-zinc-800 transition-all duration-700 ease-in-out ${
        statusRitual === "preparando"
          ? "py-8 sm:py-10"
          : "h-screen py-0 overflow-hidden"
      }`}
    >
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up {
          animation: fade-in-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @keyframes rotate-cw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes rotate-ccw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        .ring-cw-slow {
          animation: rotate-cw 20s linear infinite;
        }

        .ring-ccw-medium {
          animation: rotate-ccw 15s linear infinite;
        }

        .ring-cw-fast {
          animation: rotate-cw 8s linear infinite;
        }

        @keyframes scan-line {
          0% { top: 5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }

        .animate-scan {
          animation: scan-line 2s ease-in-out infinite;
        }

        @keyframes text-focus-in {
          0% {
            filter: blur(12px);
            transform: scale(1.1);
            opacity: 0;
            letter-spacing: 0.1em;
          }

          100% {
            filter: blur(0px);
            transform: scale(1);
            opacity: 1;
            letter-spacing: normal;
          }
        }

        .animate-text-focus {
          animation: text-focus-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes shockwave {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
            border-width: 10px;
          }

          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
            border-width: 1px;
          }
        }

        .animate-shockwave {
          animation: shockwave 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .letter-spacing-widest {
          letter-spacing: 0.3em;
        }

        .letter-spacing-extreme {
          letter-spacing: 0.5em;
        }
      `}</style>

      <DecorativeBackground />

      <div
        className={`relative z-10 w-full max-w-4xl mx-auto flex items-center justify-center transition-all duration-700 ease-in-out ${
          statusRitual === "preparando"
            ? "min-h-[70vh] mt-4 sm:mt-6"
            : "h-full mt-0"
        }`}
      >
        <div
          className={`w-full flex flex-col items-center transition-all duration-700 ease-in-out ${
            visible && statusRitual === "preparando"
              ? "relative opacity-100 scale-100 pointer-events-auto z-10 translate-y-0"
              : "absolute inset-0 h-0 overflow-hidden opacity-0 scale-95 pointer-events-none -z-10 -translate-y-8"
          }`}
        >
          <div className="text-center w-full mb-8 sm:mb-10">
            <p className="text-zinc-500 text-[9px] sm:text-[10px] letter-spacing-extreme uppercase font-medium mb-3 sm:mb-4">
              Parâmetros de Convergência
            </p>

            <h1
              className="text-4xl sm:text-6xl font-light tracking-[0.2em] ml-[0.2em] uppercase text-white cursor-pointer hover:text-zinc-300 transition-colors"
              onClick={() => navigate("/")}
            >
              Oráculo
            </h1>

            <div className="h-[1px] w-12 mx-auto mt-4 sm:mt-6 bg-zinc-800" />
          </div>

          <div className="relative w-full border border-zinc-800/80 bg-black/80 backdrop-blur-xl p-5 sm:p-10 shadow-2xl">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileImgRef}
              onChange={handleImageUpload}
              className="hidden"
            />

            <input
              type="file"
              accept=".csv"
              ref={fileCsvRef}
              onChange={handleCSVUpload}
              className="hidden"
            />

            <div className="mb-6 sm:mb-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-zinc-600 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2">
                  {modoAtual === "livre" && (
                    <>
                      <i className="ri-lock-unlock-line"></i> Aguardando Dados
                    </>
                  )}

                  {modoAtual === "texto" && (
                    <>
                      <i className="ri-text"></i> Modo Texto
                    </>
                  )}

                  {modoAtual === "imagem" && (
                    <>
                      <i className="ri-image-2-line"></i> Modo Visual
                    </>
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative">
                {modoAtual !== "imagem" && (
                  <form
                    onSubmit={handleAdicionarTexto}
                    className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-4"
                  >
                    <div className="relative flex-1">
                      <i className="ri-keyboard-line absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-lg sm:text-xl"></i>

                      <input
                        type="text"
                        value={inputOpcao}
                        onChange={(e) => setInputOpcao(e.target.value)}
                        placeholder="Inserir variável..."
                        className="w-full pl-12 pr-6 py-4 bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none text-zinc-200 placeholder-zinc-600 text-sm sm:text-base font-light tracking-wide transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-zinc-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                      disabled={!inputOpcao.trim()}
                    >
                      <i className="ri-add-line text-lg"></i>
                    </button>
                  </form>
                )}

                {modoAtual === "imagem" && (
                  <button
                    type="button"
                    onClick={() => fileImgRef.current?.click()}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-3 w-full px-8 py-4 bg-zinc-950 border border-dashed border-zinc-600 text-white font-light text-xs sm:text-sm uppercase tracking-widest transition-all hover:bg-zinc-900 hover:border-white active:scale-95"
                  >
                    <i className="ri-image-add-line text-xl"></i> Adicionar
                    Imagens
                  </button>
                )}
              </div>

              <div className="flex justify-start gap-4 sm:gap-6 border-t border-zinc-900 pt-4 mt-1 sm:mt-2">
                <button
                  type="button"
                  onClick={() => fileCsvRef.current?.click()}
                  disabled={modoAtual === "imagem"}
                  className={`flex items-center gap-1 sm:gap-2 text-[9px] sm:text-[10px] uppercase tracking-widest transition-colors font-medium ${
                    modoAtual === "imagem"
                      ? "text-zinc-800 cursor-not-allowed"
                      : "text-zinc-500 hover:text-white cursor-pointer"
                  }`}
                >
                  <i className="ri-file-list-3-line text-sm sm:text-base"></i>{" "}
                  CSV
                </button>

                <span className="text-zinc-900">|</span>

                <button
                  type="button"
                  onClick={() => fileImgRef.current?.click()}
                  disabled={modoAtual === "texto"}
                  className={`flex items-center gap-1 sm:gap-2 text-[9px] sm:text-[10px] uppercase tracking-widest transition-colors font-medium ${
                    modoAtual === "texto"
                      ? "text-zinc-800 cursor-not-allowed"
                      : "text-zinc-500 hover:text-white cursor-pointer"
                  }`}
                >
                  <i className="ri-image-add-fill text-sm sm:text-base"></i>{" "}
                  Imagem
                </button>
              </div>
            </div>

            <div className="max-h-[35vh] sm:max-h-[300px] overflow-y-auto pr-2 mb-6 sm:mb-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {opcoes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 border border-dashed border-zinc-800 bg-zinc-950/30">
                  <i className="ri-qr-code-line text-zinc-800 text-3xl sm:text-4xl mb-3 sm:mb-4"></i>

                  <p className="text-[9px] sm:text-[10px] letter-spacing-extreme uppercase text-zinc-600 font-medium text-center">
                    Sistema Vazio
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  {opcoes.map((opcao, idx) => (
                    <div
                      key={opcao.id}
                      className="animate-fade-up relative flex flex-col items-center justify-center h-20 sm:h-24 p-4 border border-zinc-800 bg-zinc-950 hover:border-zinc-500 transition-all group overflow-hidden"
                    >
                      {opcao.tipo === "imagem" && (
                        <>
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-luminosity"
                            style={{
                              backgroundImage: `url(${opcao.conteudo})`,
                            }}
                          />

                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        </>
                      )}

                      <span className="absolute top-2 left-2 text-[8px] sm:text-[9px] text-zinc-600 font-mono z-10 bg-black/80 px-1">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>

                      {opcao.tipo === "texto" && (
                        <span className="w-full text-center text-zinc-300 text-xs font-light truncate px-2 z-10">
                          {opcao.conteudo}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemover(opcao.id)}
                        className="absolute top-2 right-2 cursor-pointer text-zinc-500 hover:text-white bg-black/80 hover:bg-red-900 rounded w-6 h-6 flex items-center justify-center transition-all opacity-100 sm:opacity-0 group-hover:opacity-100 z-20"
                      >
                        <i className="ri-close-line text-sm"></i>
                      </button>
                    </div>
                  ))}

                  <div ref={listaEndRef} />
                </div>
              )}
            </div>

            <div className="text-center pt-5 sm:pt-6 border-t border-zinc-900">
              <button
                type="button"
                onClick={iniciarRitual}
                disabled={opcoes.length < 2}
                className={`w-full px-6 py-4 sm:px-16 sm:py-5 font-medium text-[10px] sm:text-xs uppercase letter-spacing-widest transition-all duration-500 border flex items-center justify-center gap-2 sm:gap-3 mx-auto ${
                  opcoes.length >= 2
                    ? "bg-white text-black border-white hover:bg-transparent hover:text-white hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] cursor-pointer"
                    : "bg-transparent text-zinc-700 border-zinc-800 cursor-not-allowed"
                }`}
              >
                <i className="ri-fingerprint-line text-base sm:text-lg"></i>

                {opcoes.length < 2
                  ? "Dados Insuficientes"
                  : "Iniciar Convergência"}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`w-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
            statusRitual === "invocando" || statusRitual === "revelado"
              ? "relative opacity-100 scale-100 pointer-events-auto z-10"
              : "absolute inset-0 h-0 overflow-hidden opacity-0 scale-110 pointer-events-none -z-10"
          }`}
        >
          <div className="relative flex items-center justify-center w-[82vw] h-[82vw] max-w-[20rem] max-h-[20rem] sm:w-[32rem] sm:h-[32rem] sm:max-w-none sm:max-h-none">
            <div className="absolute top-1/2 left-1/2 w-full h-full rounded-full border border-dashed border-zinc-800 ring-cw-slow" />

            <div className="absolute top-1/2 left-1/2 w-[85%] h-[85%] rounded-full border border-dotted border-zinc-600 ring-ccw-medium opacity-50" />

            <div className="absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full border-t border-b border-white ring-cw-fast opacity-30 shadow-[0_0_20px_rgba(255,255,255,0.1)]" />

            {statusRitual === "revelado" && (
              <div className="absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full border-white animate-shockwave pointer-events-none" />
            )}

            <div
              className={`relative w-[70%] h-[70%] rounded-full overflow-hidden bg-black flex flex-col items-center justify-center transition-all duration-1000 ${
                statusRitual === "revelado"
                  ? "shadow-[0_0_60px_rgba(255,255,255,0.15)] sm:shadow-[0_0_80px_rgba(255,255,255,0.15)] border border-white/40"
                  : "shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] sm:shadow-[inset_0_0_60px_rgba(255,255,255,0.05)] border border-zinc-800"
              }`}
            >
              {statusRitual === "invocando" && (
                <div className="absolute left-0 w-full h-[2px] bg-white/50 shadow-[0_0_15px_rgba(255,255,255,1)] animate-scan z-20" />
              )}

              {((statusRitual === "invocando" &&
                opcaoEmbaralhada?.tipo === "imagem") ||
                (statusRitual === "revelado" &&
                  opcaoEscolhida?.tipo === "imagem")) && (
                <img
                  src={
                    statusRitual === "invocando"
                      ? opcaoEmbaralhada.conteudo
                      : opcaoEscolhida.conteudo
                  }
                  alt="Processando"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                    statusRitual === "invocando"
                      ? "opacity-30 blur-sm scale-110 grayscale"
                      : "opacity-100 blur-0 scale-100 animate-text-focus"
                  }`}
                />
              )}

              {statusRitual === "invocando" &&
                opcaoEmbaralhada?.tipo === "texto" && (
                  <div className="text-center px-6 sm:px-10 z-10 w-full">
                    <p className="text-zinc-600 text-[8px] sm:text-[9px] letter-spacing-widest uppercase mb-2 sm:mb-4 animate-pulse">
                      Descriptografando
                    </p>

                    <h3 className="text-xl sm:text-4xl font-light text-zinc-400 truncate px-2 blur-[1px] opacity-70">
                      {opcaoEmbaralhada.conteudo}
                    </h3>
                  </div>
                )}

              {statusRitual === "revelado" &&
                opcaoEscolhida?.tipo === "texto" && (
                  <div className="text-center px-4 sm:px-12 w-full z-10 flex flex-col items-center justify-center h-full bg-black/40 backdrop-blur-[2px]">
                    <span
                      className="text-zinc-400 text-[8px] sm:text-[10px] letter-spacing-extreme uppercase block mb-3 sm:mb-6 font-medium animate-fade-up text-center w-full"
                      style={{ animationDelay: "0.2s", opacity: 0 }}
                    >
                      Análise Concluída
                    </span>

                    <h3 className="text-2xl sm:text-5xl font-normal text-white tracking-wide break-words leading-tight w-full line-clamp-4 overflow-hidden drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] animate-text-focus">
                      {opcaoEscolhida.conteudo}
                    </h3>
                  </div>
                )}
            </div>
          </div>

          {statusRitual === "revelado" && (
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:max-w-md justify-center animate-fade-up"
              style={{ animationDelay: "0.8s", opacity: 0 }}
            >
              <button
                type="button"
                onClick={recalcularDestino}
                className="w-full sm:flex-1 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 px-6 py-4 bg-white text-black font-semibold text-[9px] sm:text-[10px] uppercase letter-spacing-widest transition-all hover:bg-zinc-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <i className="ri-restart-line text-sm sm:text-base"></i>{" "}
                Recalcular
              </button>

              <button
                type="button"
                onClick={reiniciarTudo}
                className="w-full sm:flex-1 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 px-6 py-4 bg-transparent border border-zinc-700 text-zinc-400 font-medium text-[9px] sm:text-[10px] uppercase letter-spacing-widest transition-all hover:border-white hover:text-white"
              >
                <i className="ri-logout-circle-r-line text-sm sm:text-base"></i>{" "}
                Voltar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
