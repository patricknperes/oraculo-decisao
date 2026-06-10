import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function RitualSection({
  statusRitual,
  estaNoModoSacrificio,
  estaNoModoImagem,
  opcoes,
  opcaoEmbaralhada,
  opcaoEscolhida,
  opcaoEliminada,
  eliminados,
  sobreviventes,
  getLabelOpcao,
  recalcularDestino,
  reiniciarTudo,
  pularSacrificio,
  iniciarAceleracaoSacrificio,
  pararAceleracaoSacrificio,
  velocidadeSacrificio,
}) {
  const [historicoAberto, setHistoricoAberto] = useState(false);

  return (
    <div
      className={`w-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${statusRitual === "invocando" || statusRitual === "revelado"
        ? "relative opacity-100 scale-100 pointer-events-auto z-10"
        : "absolute inset-0 h-0 overflow-hidden opacity-0 scale-110 pointer-events-none -z-10"
        }`}
    >
      <RitualProgress
        statusRitual={statusRitual}
        estaNoModoSacrificio={estaNoModoSacrificio}
        estaNoModoImagem={estaNoModoImagem}
        eliminados={eliminados}
        sobreviventes={sobreviventes}
        opcoes={opcoes}
      />

      <SacrificeControls
        statusRitual={statusRitual}
        estaNoModoSacrificio={estaNoModoSacrificio}
        velocidadeSacrificio={velocidadeSacrificio}
        pularSacrificio={pularSacrificio}
        iniciarAceleracaoSacrificio={iniciarAceleracaoSacrificio}
        pararAceleracaoSacrificio={pararAceleracaoSacrificio}
      />

      <RitualCircle
        statusRitual={statusRitual}
        estaNoModoSacrificio={estaNoModoSacrificio}
        opcaoEmbaralhada={opcaoEmbaralhada}
        opcaoEscolhida={opcaoEscolhida}
        opcaoEliminada={opcaoEliminada}
        getLabelOpcao={getLabelOpcao}
      />

      <EliminatedList
        eliminados={eliminados}
        estaNoModoSacrificio={estaNoModoSacrificio}
        estaNoModoImagem={estaNoModoImagem}
        getLabelOpcao={getLabelOpcao}
      />

      {statusRitual === "revelado" && estaNoModoSacrificio && (
        <div
          className="mt-5 sm:mt-6 flex flex-col items-center gap-3 text-center animate-fade-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500">
            {opcaoEscolhida?.tipo === "texto"
              ? `Destino final: ${opcaoEscolhida.conteudo}`
              : "Imagem final selecionada."}
          </p>

          <button
            type="button"
            onClick={() => setHistoricoAberto(true)}
            className="cursor-pointer rounded-full border border-zinc-800 bg-black/40 px-4 py-2 text-[8px] uppercase tracking-[0.3em] text-zinc-500 transition-all hover:border-red-900/80 hover:text-red-200 hover:bg-red-950/10"
          >
            <i className="ri-history-line mr-2" />
            Ver histórico completo
          </button>
        </div>
      )}

      {statusRitual === "revelado" && (
        <ResultActions
          recalcularDestino={() => {
            setHistoricoAberto(false);
            recalcularDestino();
          }}
          reiniciarTudo={() => {
            setHistoricoAberto(false);
            reiniciarTudo();
          }}
        />
      )}

      {historicoAberto && (
        <SacrificeHistoryModal
          eliminados={eliminados}
          opcaoEscolhida={opcaoEscolhida}
          estaNoModoImagem={estaNoModoImagem}
          getLabelOpcao={getLabelOpcao}
          onClose={() => setHistoricoAberto(false)}
        />
      )}
    </div>
  );
}

function RitualProgress({
  statusRitual,
  estaNoModoSacrificio,
  estaNoModoImagem,
  eliminados,
  sobreviventes,
  opcoes,
}) {
  if (!estaNoModoSacrificio || statusRitual !== "invocando") return null;

  return (
    <div className="mb-4 sm:mb-6 w-full max-w-xl text-center animate-fade-up">
      <p className="text-red-200/80 text-[9px] sm:text-[10px] uppercase tracking-[0.4em] mb-3">
        {estaNoModoImagem ? "Ritual Visual" : "Ritual de Sacrifício"}
      </p>

      <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest text-zinc-500">
        <span>
          {eliminados.length} {estaNoModoImagem ? "removidas" : "eliminados"}
        </span>
        <span className="text-zinc-800">|</span>
        <span>
          {sobreviventes.length || opcoes.length}{" "}
          {estaNoModoImagem ? "restando" : "resistindo"}
        </span>
      </div>
    </div>
  );
}

function SacrificeControls({
  statusRitual,
  estaNoModoSacrificio,
  velocidadeSacrificio,
  pularSacrificio,
  iniciarAceleracaoSacrificio,
  pararAceleracaoSacrificio,
}) {
  if (!estaNoModoSacrificio || statusRitual !== "invocando") return null;

  const estaAcelerando = velocidadeSacrificio > 1;

  return (
    <div className="mb-5 flex w-full max-w-xl flex-col items-center gap-3 animate-fade-up">
      <div
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[8px] uppercase tracking-[0.28em] transition-all ${estaAcelerando
          ? "border-red-700/80 bg-red-950/30 text-red-100 shadow-[0_0_24px_rgba(127,29,29,0.25)] animate-accelerate-pulse"
          : "border-zinc-900 bg-black/30 text-zinc-600"
          }`}
      >
        <i className={estaAcelerando ? "ri-flashlight-fill" : "ri-timer-line"} />
        {estaAcelerando ? "Acelerando 4x" : "Segure para acelerar"}
      </div>

      <div className="grid w-full grid-cols-1 gap-2 px-2 sm:w-auto sm:grid-cols-2 sm:px-0">
        <button
          type="button"
          onMouseDown={iniciarAceleracaoSacrificio}
          onMouseUp={pararAceleracaoSacrificio}
          onMouseLeave={pararAceleracaoSacrificio}
          onTouchStart={iniciarAceleracaoSacrificio}
          onTouchEnd={pararAceleracaoSacrificio}
          onTouchCancel={pararAceleracaoSacrificio}
          className={`cursor-pointer select-none border px-5 py-3 text-[9px] uppercase tracking-[0.25em] transition-all active:scale-95 ${estaAcelerando
            ? "border-red-600 bg-red-950/40 text-red-100"
            : "border-zinc-800 bg-black/50 text-zinc-500 hover:border-red-900/80 hover:text-red-200"
            }`}
        >
          <i className="ri-speed-up-line mr-2" />
          Acelerar
        </button>

        <button
          type="button"
          onClick={pularSacrificio}
          className="cursor-pointer border border-zinc-800 bg-black/40 px-5 py-3 text-[9px] uppercase tracking-[0.25em] text-zinc-500 transition-all hover:border-white/50 hover:text-white active:scale-95"
        >
          <i className="ri-skip-forward-line mr-2" />
          Pular ritual
        </button>
      </div>
    </div>
  );
}

function RitualCircle({
  statusRitual,
  estaNoModoSacrificio,
  opcaoEmbaralhada,
  opcaoEscolhida,
  opcaoEliminada,
  getLabelOpcao,
}) {
  return (
    <div className="relative flex items-center justify-center w-[82vw] h-[82vw] max-w-[20rem] max-h-[20rem] sm:w-[32rem] sm:h-[32rem] sm:max-w-none sm:max-h-none">
      <RitualRings
        statusRitual={statusRitual}
        estaNoModoSacrificio={estaNoModoSacrificio}
      />

      <div
        className={`relative w-[70%] h-[70%] rounded-full overflow-hidden bg-black flex flex-col items-center justify-center transition-all duration-1000 ${statusRitual === "revelado"
          ? estaNoModoSacrificio
            ? "shadow-[0_0_70px_rgba(127,29,29,0.25)] border border-red-500/60"
            : "shadow-[0_0_60px_rgba(255,255,255,0.15)] sm:shadow-[0_0_80px_rgba(255,255,255,0.15)] border border-white/40"
          : "shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] sm:shadow-[inset_0_0_60px_rgba(255,255,255,0.05)] border border-zinc-800"
          }`}
      >
        {statusRitual === "invocando" && (
          <div
            className={`absolute left-0 w-full h-[2px] shadow-[0_0_15px_rgba(255,255,255,1)] animate-scan z-20 ${estaNoModoSacrificio ? "bg-red-500/70" : "bg-white/50"
              }`}
          />
        )}

        <RitualContent
          statusRitual={statusRitual}
          estaNoModoSacrificio={estaNoModoSacrificio}
          opcaoEmbaralhada={opcaoEmbaralhada}
          opcaoEscolhida={opcaoEscolhida}
          opcaoEliminada={opcaoEliminada}
          getLabelOpcao={getLabelOpcao}
        />
      </div>
    </div>
  );
}

function RitualRings({ statusRitual, estaNoModoSacrificio }) {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 w-full h-full rounded-full border border-dashed border-zinc-800 ring-cw-slow" />

      <div className="absolute top-1/2 left-1/2 w-[85%] h-[85%] rounded-full border border-dotted border-zinc-600 ring-ccw-medium opacity-50" />

      <div
        className={`absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full border-t border-b ring-cw-fast opacity-30 shadow-[0_0_20px_rgba(255,255,255,0.1)] ${estaNoModoSacrificio ? "border-red-500" : "border-white"
          }`}
      />

      {statusRitual === "revelado" && (
        <div
          className={`absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full animate-shockwave pointer-events-none ${estaNoModoSacrificio ? "border-red-500" : "border-white"
            }`}
        />
      )}
    </>
  );
}

function RitualContent({
  statusRitual,
  estaNoModoSacrificio,
  opcaoEmbaralhada,
  opcaoEscolhida,
  opcaoEliminada,
  getLabelOpcao,
}) {
  if (statusRitual === "invocando" && estaNoModoSacrificio) {
    return (
      <SacrificeContent
        opcaoEliminada={opcaoEliminada}
        getLabelOpcao={getLabelOpcao}
      />
    );
  }

  if (
    statusRitual === "invocando" &&
    !estaNoModoSacrificio &&
    opcaoEmbaralhada?.tipo === "imagem"
  ) {
    return <ImageShufflingContent opcaoEmbaralhada={opcaoEmbaralhada} />;
  }

  if (statusRitual === "revelado" && opcaoEscolhida?.tipo === "imagem") {
    return <ChosenImageContent opcaoEscolhida={opcaoEscolhida} />;
  }

  if (
    statusRitual === "invocando" &&
    !estaNoModoSacrificio &&
    opcaoEmbaralhada?.tipo === "texto"
  ) {
    return <TextShufflingContent opcaoEmbaralhada={opcaoEmbaralhada} />;
  }

  if (statusRitual === "revelado" && opcaoEscolhida?.tipo === "texto") {
    return (
      <ChosenTextContent
        estaNoModoSacrificio={estaNoModoSacrificio}
        opcaoEscolhida={opcaoEscolhida}
      />
    );
  }

  return null;
}

function SacrificeContent({ opcaoEliminada, getLabelOpcao }) {
  return (
    <div className="text-center px-5 sm:px-10 z-10 w-full h-full flex flex-col items-center justify-center bg-black/50">
      {opcaoEliminada?.tipo === "imagem" ? (
        <>
          <img
            src={opcaoEliminada.conteudo}
            alt="Imagem removida do sorteio"
            className="absolute inset-0 w-full h-full object-cover opacity-45 blur-sm grayscale scale-110"
          />

          <div className="relative z-10 flex flex-col items-center justify-center gap-3 rounded-full border border-red-500/40 bg-black/60 w-28 h-28 sm:w-36 sm:h-36 backdrop-blur-sm animate-sacrifice-pulse">
            <i className="ri-eye-off-line text-3xl sm:text-4xl text-red-300" />
            <span className="text-red-200 text-[8px] sm:text-[9px] uppercase tracking-[0.35em]">
              Fora
            </span>
          </div>
        </>
      ) : (
        <>
          <p className="text-red-300 text-[8px] sm:text-[9px] letter-spacing-widest uppercase mb-3 animate-sacrifice-pulse">
            Variável descartada
          </p>

          <h3 className="text-xl sm:text-4xl font-light text-white truncate px-2 w-full drop-shadow-[0_0_12px_rgba(248,113,113,0.7)]">
            {getLabelOpcao(opcaoEliminada) || "Selecionando sacrifício"}
          </h3>
        </>
      )}
    </div>
  );
}

function ImageShufflingContent({ opcaoEmbaralhada }) {
  return (
    <>
      <img
        src={opcaoEmbaralhada.conteudo}
        alt="Imagem sendo analisada"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 opacity-60 blur-md scale-110 grayscale"
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-3 rounded-full border border-white/20 bg-black/55 w-32 h-32 sm:w-40 sm:h-40 backdrop-blur-sm">
        <i className="ri-scan-2-line text-3xl sm:text-4xl text-white/80 animate-pulse" />
        <span className="text-zinc-300 text-[8px] sm:text-[9px] uppercase tracking-[0.35em]">
          Escolhendo
        </span>
      </div>
    </>
  );
}

function ChosenImageContent({ opcaoEscolhida }) {
  return (
    <>
      <img
        src={opcaoEscolhida.conteudo}
        alt="Imagem escolhida"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-100 blur-0 scale-100 animate-text-focus"
      />

      <div className="absolute bottom-4 left-1/2 z-20 flex max-w-[82%] -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 px-3 py-1.5 backdrop-blur-md animate-fade-up sm:bottom-6 sm:px-4 sm:py-2">
        <span className="truncate whitespace-nowrap text-white text-[7px] uppercase tracking-[0.28em] sm:text-[9px] sm:tracking-[0.35em]">
          Imagem escolhida
        </span>
      </div>
    </>
  );
}

function TextShufflingContent({ opcaoEmbaralhada }) {
  return (
    <div className="text-center px-6 sm:px-10 z-10 w-full">
      <p className="text-zinc-600 text-[8px] sm:text-[9px] letter-spacing-widest uppercase mb-2 sm:mb-4 animate-pulse">
        Descriptografando
      </p>

      <h3 className="text-xl sm:text-4xl font-light text-zinc-400 truncate px-2 blur-[1px] opacity-70">
        {opcaoEmbaralhada.conteudo}
      </h3>
    </div>
  );
}

function ChosenTextContent({ estaNoModoSacrificio, opcaoEscolhida }) {
  return (
    <div className="text-center px-4 sm:px-12 w-full z-10 flex flex-col items-center justify-center h-full bg-black/40 backdrop-blur-[2px]">
      <span
        className={`text-[8px] sm:text-[10px] letter-spacing-extreme uppercase block mb-3 sm:mb-6 font-medium animate-fade-up text-center w-full ${estaNoModoSacrificio ? "text-red-200" : "text-zinc-400"
          }`}
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        {estaNoModoSacrificio ? "Destino Sobrevivente" : "Análise Concluída"}
      </span>

      <h3 className="text-2xl sm:text-5xl font-normal text-white tracking-wide break-words leading-tight w-full line-clamp-2 overflow-hidden drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] animate-text-focus">
        {opcaoEscolhida.conteudo}
      </h3>
    </div>
  );
}

function EliminatedList({
  eliminados,
  estaNoModoSacrificio,
  estaNoModoImagem,
  getLabelOpcao,
}) {
  if (!estaNoModoSacrificio || eliminados.length === 0) return null;

  const limite = estaNoModoImagem ? 4 : 3;
  const quantidadeAnteriores = Math.max(eliminados.length - limite, 0);

  const inicioOrdem = Math.max(eliminados.length - limite, 0);

  const recentes = eliminados.slice(-limite).map((opcao, index) => ({
    opcao,
    ordem: inicioOrdem + index + 1,
  }));

  return (
    <div className="mt-5 w-full max-w-2xl animate-fade-up px-3 sm:mt-6">
      <div className="relative mb-3 flex min-h-6 items-center justify-center text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-zinc-900 sm:w-12" />
          <p className="shrink-0 text-[8px] uppercase tracking-[0.35em] text-zinc-600">
            Últimos descartes
          </p>
          <span className="h-px w-8 bg-zinc-900 sm:w-12" />
        </div>

        {quantidadeAnteriores > 0 && (
          <span className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-zinc-900 bg-black/70 px-2.5 py-1 text-[8px] uppercase tracking-widest text-zinc-600 sm:inline-flex">
            +{quantidadeAnteriores} anteriores
          </span>
        )}
      </div>

      {estaNoModoImagem ? (
        <RecentImageHistory recentes={recentes} />
      ) : (
        <RecentTextHistory recentes={recentes} getLabelOpcao={getLabelOpcao} />
      )}

      {quantidadeAnteriores > 0 && (
        <div className="mt-2 flex justify-center sm:hidden">
          <span className="rounded-full border border-zinc-900 bg-black/70 px-2.5 py-1 text-[8px] uppercase tracking-widest text-zinc-600">
            +{quantidadeAnteriores} anteriores
          </span>
        </div>
      )}
    </div>
  );
}

function RecentImageHistory({ recentes }) {
  return (
    <div className="flex h-16 items-center justify-center gap-2 overflow-hidden sm:h-[4.5rem] sm:gap-3">
      {recentes.map(({ opcao, ordem }) => (
        <div
          key={`${opcao.id}-${ordem}`}
          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-red-950/70 bg-zinc-950 shadow-[0_0_18px_rgba(127,29,29,0.12)] sm:h-14 sm:w-14"
          title={`Descartada na posição ${ordem}`}
        >
          <img
            src={opcao.conteudo}
            alt={`Imagem descartada na posição ${ordem}`}
            className="h-full w-full object-cover grayscale opacity-55"
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 flex items-center justify-center">
            <i className="ri-eye-off-line text-base text-red-200/80 sm:text-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentTextHistory({ recentes, getLabelOpcao }) {
  return (
    <div className="mx-auto grid w-full max-w-[44rem] grid-cols-1 justify-center gap-2 overflow-hidden sm:grid-cols-3">
      {recentes.map(({ opcao, ordem }) => (
        <div
          key={`${opcao.id}-${ordem}`}
          className="flex h-11 min-w-0 items-center gap-2 border border-red-950/45 bg-black/50 px-3 sm:h-12"
          title={getLabelOpcao(opcao)}
        >
          <div className="flex h-7 w-7 shrink-0 self-center items-center justify-center rounded-full border border-red-900/60 text-[9px] leading-none text-red-200">
            {ordem}
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-0.5 hidden text-[7px] uppercase tracking-[0.28em] text-zinc-700 sm:block">
              Descartado
            </p>
            <p className="truncate text-[9px] uppercase tracking-widest text-red-100/75 sm:text-[10px]">
              {getLabelOpcao(opcao)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SacrificeHistoryModal({
  eliminados,
  opcaoEscolhida,
  estaNoModoImagem,
  getLabelOpcao,
  onClose,
}) {
  const historicoCompleto = [
    ...eliminados.map((opcao, index) => ({
      opcao,
      ordem: index + 1,
      status: "descartado",
    })),
    {
      opcao: opcaoEscolhida,
      ordem: eliminados.length + 1,
      status: "escolhido",
    },
  ];

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex h-[100svh] items-stretch justify-center overflow-hidden bg-black/80 backdrop-blur-md sm:h-[100dvh] sm:items-center sm:px-6 sm:py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="historico-sacrificio-title"
    >
      <div
        className="relative flex h-[100svh] max-h-[100svh] w-full flex-col border-0 bg-black/95 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4 shadow-[0_0_80px_rgba(127,29,29,0.22)] sm:h-auto sm:max-h-[86vh] sm:max-w-2xl sm:border sm:border-zinc-800/90 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar histórico"
          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center border border-zinc-800 bg-black/80 text-zinc-500 transition-all hover:border-white hover:text-white sm:right-4 sm:top-4"
        >
          <i className="ri-close-line text-lg" />
        </button>

        <div className="mb-5 pr-10">
          <p className="mb-2 text-[8px] uppercase tracking-[0.45em] text-red-200/70">
            Ritual de Sacrifício
          </p>

          <h2
            id="historico-sacrificio-title"
            className="text-xl font-light uppercase tracking-[0.16em] text-white sm:text-2xl sm:tracking-[0.18em]"
          >
            Histórico completo
          </h2>

          <p className="mt-3 text-xs leading-relaxed text-zinc-500 sm:text-sm">
            Ordem completa dos descartes até o destino final escolhido pelo
            Oráculo.
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pb-6 [scrollbar-gutter:stable] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent sm:max-h-[62vh] sm:flex-none sm:pb-0 sm:pr-3">
          <div className="flex flex-col gap-2">
            {historicoCompleto.map(({ opcao, ordem, status }) => (
              <HistoryRow
                key={`${status}-${opcao?.id ?? ordem}`}
                opcao={opcao}
                ordem={ordem}
                status={status}
                estaNoModoImagem={estaNoModoImagem}
                getLabelOpcao={getLabelOpcao}
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function HistoryRow({
  opcao,
  ordem,
  status,
  estaNoModoImagem,
  getLabelOpcao,
}) {
  const foiEscolhido = status === "escolhido";

  return (
    <div
      className={`flex items-center gap-3 border px-3 py-3 transition-all ${foiEscolhido
        ? "border-red-800/80 bg-red-950/20 text-red-100"
        : "border-zinc-900 bg-zinc-950/70 text-zinc-400"
        }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold ${foiEscolhido
          ? "border-red-500/60 bg-red-950/50 text-red-100"
          : "border-zinc-800 bg-black text-zinc-500"
          }`}
      >
        {ordem.toString().padStart(2, "0")}
      </div>

      {estaNoModoImagem && opcao?.tipo === "imagem" && (
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded border border-zinc-800 bg-zinc-950">
          <img
            src={opcao.conteudo}
            alt={foiEscolhido ? "Imagem escolhida" : "Imagem descartada"}
            className={`h-full w-full object-cover ${foiEscolhido ? "opacity-100" : "grayscale opacity-55"
              }`}
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p
          className={`text-[8px] uppercase tracking-[0.3em] ${foiEscolhido ? "text-red-200" : "text-zinc-600"
            }`}
        >
          {foiEscolhido ? "Escolhido" : "Descartado"}
        </p>

        <p className="mt-1 truncate text-xs font-light sm:text-sm">
          {estaNoModoImagem ? "Imagem" : getLabelOpcao(opcao)}
        </p>
      </div>

      <i
        className={`${foiEscolhido
          ? "ri-vip-crown-line text-red-200"
          : "ri-close-circle-line text-zinc-700"
          } text-lg`}
      />
    </div>
  );
}

function ResultActions({ recalcularDestino, reiniciarTudo }) {
  return (
    <div
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:max-w-md justify-center animate-fade-up"
      style={{ animationDelay: "0.8s", opacity: 0 }}
    >
      <button
        type="button"
        onClick={recalcularDestino}
        className="w-full sm:flex-1 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 px-6 py-4 bg-white text-black font-semibold text-[9px] sm:text-[10px] uppercase letter-spacing-widest transition-all hover:bg-zinc-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      >
        <i className="ri-restart-line text-sm sm:text-base"></i> Recalcular
      </button>

      <button
        type="button"
        onClick={reiniciarTudo}
        className="w-full sm:flex-1 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 px-6 py-4 bg-transparent border border-zinc-700 text-zinc-400 font-medium text-[9px] sm:text-[10px] uppercase letter-spacing-widest transition-all hover:border-white hover:text-white"
      >
        <i className="ri-arrow-left-line text-sm sm:text-base"></i> Voltar
      </button>
    </div>
  );
}
