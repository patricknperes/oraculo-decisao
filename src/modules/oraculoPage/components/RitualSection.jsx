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
}) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
        statusRitual === "invocando" || statusRitual === "revelado"
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
          className="mt-5 sm:mt-6 text-center animate-fade-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500">
            {opcaoEscolhida?.tipo === "texto"
              ? `Destino final: ${opcaoEscolhida.conteudo}`
              : "Imagem final selecionada."}
          </p>
        </div>
      )}

      {statusRitual === "revelado" && (
        <ResultActions
          recalcularDestino={recalcularDestino}
          reiniciarTudo={reiniciarTudo}
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
        className={`relative w-[70%] h-[70%] rounded-full overflow-hidden bg-black flex flex-col items-center justify-center transition-all duration-1000 ${
          statusRitual === "revelado"
            ? estaNoModoSacrificio
              ? "shadow-[0_0_70px_rgba(127,29,29,0.25)] border border-red-500/60"
              : "shadow-[0_0_60px_rgba(255,255,255,0.15)] sm:shadow-[0_0_80px_rgba(255,255,255,0.15)] border border-white/40"
            : "shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] sm:shadow-[inset_0_0_60px_rgba(255,255,255,0.05)] border border-zinc-800"
        }`}
      >
        {statusRitual === "invocando" && (
          <div
            className={`absolute left-0 w-full h-[2px] shadow-[0_0_15px_rgba(255,255,255,1)] animate-scan z-20 ${
              estaNoModoSacrificio ? "bg-red-500/70" : "bg-white/50"
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
        className={`absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full border-t border-b ring-cw-fast opacity-30 shadow-[0_0_20px_rgba(255,255,255,0.1)] ${
          estaNoModoSacrificio ? "border-red-500" : "border-white"
        }`}
      />

      {statusRitual === "revelado" && (
        <div
          className={`absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full animate-shockwave pointer-events-none ${
            estaNoModoSacrificio ? "border-red-500" : "border-white"
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

      <div className="absolute inset-x-6 bottom-6 z-20 flex items-center justify-center rounded-full border border-white/20 bg-black/55 px-4 py-2 backdrop-blur-md animate-fade-up">
        <span className="text-white text-[8px] sm:text-[9px] uppercase tracking-[0.35em]">
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
        className={`text-[8px] sm:text-[10px] letter-spacing-extreme uppercase block mb-3 sm:mb-6 font-medium animate-fade-up text-center w-full ${
          estaNoModoSacrificio ? "text-red-200" : "text-zinc-400"
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

  return (
    <div className="mt-5 sm:mt-6 w-full max-w-2xl animate-fade-up">
      {estaNoModoImagem ? (
        <RemovedImages eliminados={eliminados} />
      ) : (
        <RemovedTexts eliminados={eliminados} getLabelOpcao={getLabelOpcao} />
      )}
    </div>
  );
}

function RemovedImages({ eliminados }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-600 text-center">
        Imagens removidas recentemente
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {eliminados.slice(-6).map((opcao, index) => (
          <div
            key={`${opcao.id}-${index}`}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-red-950/70 bg-zinc-950 shadow-[0_0_18px_rgba(127,29,29,0.12)]"
            title="Imagem removida"
          >
            <img
              src={opcao.conteudo}
              alt="Imagem removida"
              className="w-full h-full object-cover grayscale opacity-55"
            />

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 flex items-center justify-center">
              <i className="ri-eye-off-line text-red-200/80 text-base sm:text-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RemovedTexts({ eliminados, getLabelOpcao }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-600 text-center">
        Últimos descartes
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {eliminados.slice(-5).map((opcao, index) => (
          <span
            key={`${opcao.id}-${index}`}
            className="max-w-[220px] truncate rounded-full border border-red-950/60 bg-red-950/10 px-3 py-2 text-[9px] sm:text-[10px] uppercase tracking-widest text-red-100/80"
          >
            <i className="ri-subtract-line mr-1 text-red-300" />
            {getLabelOpcao(opcao)}
          </span>
        ))}
      </div>
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
        <i className="ri-logout-circle-r-line text-sm sm:text-base"></i> Voltar
      </button>
    </div>
  );
}
