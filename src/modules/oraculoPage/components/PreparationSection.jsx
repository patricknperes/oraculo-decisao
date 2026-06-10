import { useNavigate } from "react-router-dom";

export default function PreparationSection({
  visible,
  statusRitual,
  modoAtual,
  modoRitual,
  setModoRitual,
  estaNoModoSacrificio,
  estaNoModoImagem,
  podeLimparCampos,
  inputOpcao,
  setInputOpcao,
  opcoes,
  fileImgRef,
  fileCsvRef,
  listaEndRef,
  handleAdicionarTexto,
  handleCSVUpload,
  handleImageUpload,
  handleRemover,
  limparTodosCampos,
  iniciarRitual,
}) {
  return (
    <div
      className={`w-full flex flex-col items-center transition-all duration-700 ease-in-out ${
        visible && statusRitual === "preparando"
          ? "relative opacity-100 scale-100 pointer-events-auto z-10 translate-y-0"
          : "absolute inset-0 h-0 overflow-hidden opacity-0 scale-95 pointer-events-none -z-10 -translate-y-8"
      }`}
    >
      <OraculoHeader />

      <InputCard
        modoAtual={modoAtual}
        modoRitual={modoRitual}
        setModoRitual={setModoRitual}
        estaNoModoSacrificio={estaNoModoSacrificio}
        estaNoModoImagem={estaNoModoImagem}
        podeLimparCampos={podeLimparCampos}
        inputOpcao={inputOpcao}
        setInputOpcao={setInputOpcao}
        opcoes={opcoes}
        fileImgRef={fileImgRef}
        fileCsvRef={fileCsvRef}
        listaEndRef={listaEndRef}
        handleAdicionarTexto={handleAdicionarTexto}
        handleCSVUpload={handleCSVUpload}
        handleImageUpload={handleImageUpload}
        handleRemover={handleRemover}
        limparTodosCampos={limparTodosCampos}
        iniciarRitual={iniciarRitual}
      />
    </div>
  );
}

function OraculoHeader() {
  const navigate = useNavigate();

  return (
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
  );
}

function InputCard({
  modoAtual,
  modoRitual,
  setModoRitual,
  estaNoModoSacrificio,
  estaNoModoImagem,
  podeLimparCampos,
  inputOpcao,
  setInputOpcao,
  opcoes,
  fileImgRef,
  fileCsvRef,
  listaEndRef,
  handleAdicionarTexto,
  handleCSVUpload,
  handleImageUpload,
  handleRemover,
  limparTodosCampos,
  iniciarRitual,
}) {
  return (
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ModeStatus modoAtual={modoAtual} />
          <RitualModeToggle modoRitual={modoRitual} setModoRitual={setModoRitual} />
        </div>

        {estaNoModoSacrificio && (
          <div className="border border-red-950/60 bg-red-950/10 px-4 py-3 text-[9px] sm:text-[10px] uppercase tracking-widest text-red-200/80 leading-relaxed">
            <i className="ri-skull-line mr-2"></i>
            {estaNoModoImagem
              ? "O Oráculo removerá imagens uma por uma até sobrar apenas a imagem escolhida."
              : "O Oráculo eliminará uma variável por vez até restar apenas o destino final."}
          </div>
        )}

        <OptionInput
          modoAtual={modoAtual}
          inputOpcao={inputOpcao}
          setInputOpcao={setInputOpcao}
          fileImgRef={fileImgRef}
          handleAdicionarTexto={handleAdicionarTexto}
        />

        <ImportActions
          modoAtual={modoAtual}
          fileCsvRef={fileCsvRef}
          fileImgRef={fileImgRef}
          podeLimparCampos={podeLimparCampos}
          limparTodosCampos={limparTodosCampos}
        />
      </div>

      <OptionsList
        opcoes={opcoes}
        listaEndRef={listaEndRef}
        handleRemover={handleRemover}
      />

      <StartButton
        opcoes={opcoes}
        estaNoModoSacrificio={estaNoModoSacrificio}
        estaNoModoImagem={estaNoModoImagem}
        iniciarRitual={iniciarRitual}
      />
    </div>
  );
}

function ModeStatus({ modoAtual }) {
  return (
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
  );
}

function RitualModeToggle({ modoRitual, setModoRitual }) {
  return (
    <div className="flex border border-zinc-800 bg-zinc-950 p-1">
      <button
        type="button"
        onClick={() => setModoRitual("normal")}
        className={`flex-1 sm:flex-none px-4 py-2 text-[9px] uppercase tracking-widest transition-all cursor-pointer ${
          modoRitual === "normal"
            ? "bg-white text-black"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        Normal
      </button>

      <button
        type="button"
        onClick={() => setModoRitual("sacrificio")}
        className={`flex-1 sm:flex-none px-4 py-2 text-[9px] uppercase tracking-widest transition-all cursor-pointer ${
          modoRitual === "sacrificio"
            ? "bg-red-950 text-white shadow-[0_0_18px_rgba(127,29,29,0.5)]"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        Sacrifício
      </button>
    </div>
  );
}

function OptionInput({
  modoAtual,
  inputOpcao,
  setInputOpcao,
  fileImgRef,
  handleAdicionarTexto,
}) {
  return (
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
              onChange={(event) => setInputOpcao(event.target.value)}
              placeholder="Inserir variável..."
              className="w-full pl-12 pr-12 py-4 bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none text-zinc-200 placeholder-zinc-600 text-sm sm:text-base font-light tracking-wide transition-all"
            />

            {inputOpcao && (
              <button
                type="button"
                onClick={() => setInputOpcao("")}
                aria-label="Limpar campo"
                className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-zinc-600 opacity-75 transition-all hover:bg-zinc-900/70 hover:text-zinc-300 hover:opacity-100 active:scale-95"
              >
                <i className="ri-close-line text-sm" />
              </button>
            )}
          </div>

          <button
            type="submit"
            aria-label="Adicionar variável"
            className="group cursor-pointer flex h-[58px] items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-zinc-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            disabled={!inputOpcao.trim()}
          >
            <i className="ri-add-line text-lg" />
            <span className="inline sm:hidden">Adicionar</span>
          </button>
        </form>
      )}

      {modoAtual === "imagem" && (
        <button
          type="button"
          onClick={() => fileImgRef.current?.click()}
          className="flex-1 cursor-pointer flex items-center justify-center gap-3 w-full px-8 py-4 bg-zinc-950 border border-dashed border-zinc-600 text-white font-light text-xs sm:text-sm uppercase tracking-widest transition-all hover:bg-zinc-900 hover:border-white active:scale-95"
        >
          <i className="ri-image-add-line text-xl"></i> Adicionar Imagens
        </button>
      )}
    </div>
  );
}

function ImportActions({
  modoAtual,
  fileCsvRef,
  fileImgRef,
  podeLimparCampos,
  limparTodosCampos,
}) {
  return (
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
        <i className="ri-file-list-3-line text-sm sm:text-base"></i> CSV
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
        <i className="ri-image-add-fill text-sm sm:text-base"></i> Imagem
      </button>

      <span className="text-zinc-900">|</span>

      <button
        type="button"
        onClick={limparTodosCampos}
        disabled={!podeLimparCampos}
        className={`flex items-center gap-1 sm:gap-2 text-[9px] sm:text-[10px] uppercase tracking-widest transition-colors font-medium ${
          podeLimparCampos
            ? "text-zinc-500 hover:text-red-300 cursor-pointer"
            : "text-zinc-800 cursor-not-allowed"
        }`}
      >
        <i className="ri-eraser-line text-sm sm:text-base"></i>
        Limpar campos
      </button>
    </div>
  );
}

function OptionsList({ opcoes, listaEndRef, handleRemover }) {
  return (
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
          {opcoes.map((opcao, index) => (
            <OptionCard
              key={opcao.id}
              opcao={opcao}
              index={index}
              handleRemover={handleRemover}
            />
          ))}

          <div ref={listaEndRef} />
        </div>
      )}
    </div>
  );
}

function OptionCard({ opcao, index, handleRemover }) {
  return (
    <div className="animate-fade-up relative flex flex-col items-center justify-center h-20 sm:h-24 p-4 border border-zinc-800 bg-zinc-950 hover:border-zinc-500 transition-all group overflow-hidden">
      {opcao.tipo === "imagem" && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-luminosity"
            style={{ backgroundImage: `url(${opcao.conteudo})` }}
          />

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
        </>
      )}

      <span className="absolute top-2 left-2 text-[8px] sm:text-[9px] text-zinc-600 font-mono z-10 bg-black/80 px-1">
        {(index + 1).toString().padStart(2, "0")}
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
  );
}

function StartButton({
  opcoes,
  estaNoModoSacrificio,
  estaNoModoImagem,
  iniciarRitual,
}) {
  const getButtonText = () => {
    if (opcoes.length < 2) {
      return estaNoModoImagem ? "Adicione 2 imagens" : "Dados Insuficientes";
    }

    if (estaNoModoImagem) {
      return estaNoModoSacrificio ? "Iniciar Descarte Visual" : "Revelar Imagem";
    }

    return estaNoModoSacrificio ? "Iniciar Sacrifício" : "Iniciar Convergência";
  };

  return (
    <div className="text-center pt-5 sm:pt-6 border-t border-zinc-900">
      <button
        type="button"
        onClick={iniciarRitual}
        disabled={opcoes.length < 2}
        className={`w-full px-6 py-4 sm:px-16 sm:py-5 font-medium text-[10px] sm:text-xs uppercase letter-spacing-widest transition-all duration-500 border flex items-center justify-center gap-2 sm:gap-3 mx-auto ${
          opcoes.length >= 2
            ? estaNoModoSacrificio
              ? "bg-red-950 text-white border-red-900 hover:bg-transparent hover:border-red-500 hover:shadow-[0_0_40px_rgba(127,29,29,0.35)] cursor-pointer"
              : "bg-white text-black border-white hover:bg-transparent hover:text-white hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] cursor-pointer"
            : "bg-transparent text-zinc-700 border-zinc-800 cursor-not-allowed"
        }`}
      >
        <i
          className={`${
            estaNoModoSacrificio ? "ri-skull-line" : "ri-fingerprint-line"
          } text-base sm:text-lg`}
        ></i>

        {getButtonText()}
      </button>
    </div>
  );
}
