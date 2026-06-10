// Oráculo de Decisão
// Disciplina: Interação Humano Computador
//
// Autores:
// - Patrick Peres Nicolini (MATRÍCULA: 22.1.8103)
// - Carlos Gabriel de Oliveira Frazão (MATRÍCULA: 22.1.8100)

import { useEffect, useRef, useState } from "react";

import DecorativeBackground from "../../components/DecorativeBackground";

import OraculoStyles from "./components/OraculoStyles";
import PreparationSection from "./components/PreparationSection";
import RitualSection from "./components/RitualSection";

export default function OraculoPage() {
  const [inputOpcao, setInputOpcao] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [statusRitual, setStatusRitual] = useState("preparando");
  const [modoRitual, setModoRitual] = useState("normal");
  const [opcaoEmbaralhada, setOpcaoEmbaralhada] = useState(null);
  const [opcaoEscolhida, setOpcaoEscolhida] = useState(null);
  const [opcaoEliminada, setOpcaoEliminada] = useState(null);
  const [eliminados, setEliminados] = useState([]);
  const [sobreviventes, setSobreviventes] = useState([]);

  const listaEndRef = useRef(null);
  const fileImgRef = useRef(null);
  const fileCsvRef = useRef(null);
  const sacrificioTimeoutRef = useRef(null);
  const restantesSacrificioRef = useRef([]);
  const historicoEliminadosRef = useRef([]);
  const velocidadeSacrificioRef = useRef(1);

  const [velocidadeSacrificio, setVelocidadeSacrificio] = useState(1);

  const modoAtual = opcoes.length === 0 ? "livre" : opcoes[0].tipo;
  const estaNoModoSacrificio = modoRitual === "sacrificio";
  const estaNoModoImagem = modoAtual === "imagem";
  const podeLimparCampos = opcoes.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    velocidadeSacrificioRef.current = velocidadeSacrificio;
  }, [velocidadeSacrificio]);

  useEffect(() => {
    return () => {
      if (sacrificioTimeoutRef.current) {
        clearTimeout(sacrificioTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const isTelaTransicao = statusRitual === "transicao";
    document.body.style.overflow = isTelaTransicao ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [statusRitual]);

  useEffect(() => {
    if (listaEndRef.current && statusRitual === "preparando") {
      listaEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [opcoes, statusRitual]);

  const liberarUrlImagem = (opcao) => {
    if (opcao?.tipo === "imagem") {
      URL.revokeObjectURL(opcao.conteudo);
    }
  };

  const limparTimerSacrificio = () => {
    if (sacrificioTimeoutRef.current) {
      clearTimeout(sacrificioTimeoutRef.current);
      sacrificioTimeoutRef.current = null;
    }
  };

  const limparResultadoAnterior = () => {
    limparTimerSacrificio();
    restantesSacrificioRef.current = [];
    historicoEliminadosRef.current = [];
    velocidadeSacrificioRef.current = 1;

    setVelocidadeSacrificio(1);
    setOpcaoEscolhida(null);
    setOpcaoEmbaralhada(null);
    setOpcaoEliminada(null);
    setEliminados([]);
    setSobreviventes([]);
  };

  const limparTodosCampos = () => {
    setOpcoes((prev) => {
      prev.forEach(liberarUrlImagem);
      return [];
    });

    setInputOpcao("");
    limparResultadoAnterior();

    if (fileImgRef.current) fileImgRef.current.value = "";
    if (fileCsvRef.current) fileCsvRef.current.value = "";
  };

  const getLabelOpcao = (opcao) => {
    if (!opcao) return "";
    return opcao.tipo === "texto" ? opcao.conteudo : "imagem";
  };

  const handleAdicionarTexto = (event) => {
    event.preventDefault();

    if (!inputOpcao.trim() || modoAtual === "imagem") return;

    const novaOpcao = {
      id: crypto.randomUUID(),
      tipo: "texto",
      conteudo: inputOpcao.trim(),
    };

    setOpcoes((prev) => [...prev, novaOpcao]);
    setInputOpcao("");
  };

  const handleCSVUpload = (event) => {
    if (modoAtual === "imagem") return;

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const rows = readerEvent.target.result
        .split("\n")
        .map((row) => row.trim())
        .filter(Boolean);

      const novasOpcoes = rows.map((row) => ({
        id: crypto.randomUUID(),
        tipo: "texto",
        conteudo: row,
      }));

      setOpcoes((prev) => [...prev, ...novasOpcoes]);
    };

    reader.readAsText(file);

    if (fileCsvRef.current) fileCsvRef.current.value = "";
  };

  const handleImageUpload = (event) => {
    if (modoAtual === "texto") return;

    const files = Array.from(event.target.files);
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
    setOpcoes((prev) => {
      const opcaoRemovida = prev.find((opcao) => opcao.id === idParaRemover);
      liberarUrlImagem(opcaoRemovida);

      return prev.filter((opcao) => opcao.id !== idParaRemover);
    });
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

  const finalizarSacrificio = () => {
    limparTimerSacrificio();

    setOpcaoEscolhida(restantesSacrificioRef.current[0]);
    setOpcaoEliminada(null);
    setSobreviventes([...restantesSacrificioRef.current]);
    setEliminados([...historicoEliminadosRef.current]);
    setVelocidadeSacrificio(1);
    velocidadeSacrificioRef.current = 1;
    setStatusRitual("revelado");
  };

  const executarPassoSacrificio = () => {
    const restantes = restantesSacrificioRef.current;

    if (restantes.length <= 1) {
      finalizarSacrificio();
      return;
    }

    const indiceEliminado = Math.floor(Math.random() * restantes.length);
    const [eliminado] = restantes.splice(indiceEliminado, 1);

    historicoEliminadosRef.current = [
      ...historicoEliminadosRef.current,
      eliminado,
    ];

    setOpcaoEliminada(eliminado);
    setOpcaoEmbaralhada(
      restantes[Math.floor(Math.random() * restantes.length)] || null
    );
    setEliminados([...historicoEliminadosRef.current]);
    setSobreviventes([...restantes]);

    if (restantes.length <= 1) {
      sacrificioTimeoutRef.current = setTimeout(
        finalizarSacrificio,
        velocidadeSacrificioRef.current > 1 ? 260 : 700
      );
      return;
    }

    agendarProximoPassoSacrificio();
  };

  const agendarProximoPassoSacrificio = () => {
    limparTimerSacrificio();

    const delay = velocidadeSacrificioRef.current > 1 ? 180 : 1100;
    sacrificioTimeoutRef.current = setTimeout(executarPassoSacrificio, delay);
  };

  const executarSacrificio = () => {
    const restantes = [...opcoes];

    limparTimerSacrificio();
    restantesSacrificioRef.current = restantes;
    historicoEliminadosRef.current = [];
    velocidadeSacrificioRef.current = 1;

    setVelocidadeSacrificio(1);
    setSobreviventes(restantes);
    setOpcaoEmbaralhada(restantes[0]);
    setEliminados([]);

    agendarProximoPassoSacrificio();
  };

  const pularSacrificio = () => {
    if (!estaNoModoSacrificio || statusRitual !== "invocando") return;

    limparTimerSacrificio();

    const restantes = [...restantesSacrificioRef.current];
    const historicoCompleto = [...historicoEliminadosRef.current];

    while (restantes.length > 1) {
      const indiceEliminado = Math.floor(Math.random() * restantes.length);
      const [eliminado] = restantes.splice(indiceEliminado, 1);
      historicoCompleto.push(eliminado);
    }

    restantesSacrificioRef.current = restantes;
    historicoEliminadosRef.current = historicoCompleto;

    setVelocidadeSacrificio(1);
    velocidadeSacrificioRef.current = 1;
    setOpcaoEliminada(null);
    setOpcaoEmbaralhada(null);
    setEliminados(historicoCompleto);
    setSobreviventes(restantes);
    setOpcaoEscolhida(restantes[0]);
    setStatusRitual("revelado");
  };

  const iniciarAceleracaoSacrificio = () => {
    if (!estaNoModoSacrificio || statusRitual !== "invocando") return;

    velocidadeSacrificioRef.current = 4;
    setVelocidadeSacrificio(4);

    if (restantesSacrificioRef.current.length > 1) {
      agendarProximoPassoSacrificio();
    }
  };

  const pararAceleracaoSacrificio = () => {
    velocidadeSacrificioRef.current = 1;
    setVelocidadeSacrificio(1);
  };

  const executarRitual = () => {
    if (estaNoModoSacrificio) {
      executarSacrificio();
      return;
    }

    executarSorteio();
  };

  const iniciarRitual = () => {
    if (opcoes.length < 2) return;

    limparResultadoAnterior();
    setStatusRitual("transicao");

    setTimeout(() => {
      setStatusRitual("invocando");
      executarRitual();
    }, 700);
  };

  const recalcularDestino = () => {
    setStatusRitual("transicao");

    setTimeout(() => {
      limparResultadoAnterior();
      setStatusRitual("invocando");
      executarRitual();
    }, 600);
  };

  const voltarParaLista = () => {
    setStatusRitual("transicao");

    setTimeout(() => {
      limparResultadoAnterior();
      setStatusRitual("preparando");
    }, 600);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-black text-white font-sans px-4 selection:bg-zinc-800 transition-all duration-700 ease-in-out ${
        statusRitual === "preparando"
          ? "py-8 sm:py-10"
          : "min-h-screen py-6 sm:py-8 overflow-y-auto"
      }`}
    >
      <OraculoStyles />
      <DecorativeBackground />

      <div
        className={`relative z-10 w-full max-w-4xl mx-auto flex items-center justify-center transition-all duration-700 ease-in-out ${
          statusRitual === "preparando"
            ? "min-h-[70vh] mt-4 sm:mt-6"
            : "h-full mt-0"
        }`}
      >
        <PreparationSection
          visible={visible}
          statusRitual={statusRitual}
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

        <RitualSection
          statusRitual={statusRitual}
          estaNoModoSacrificio={estaNoModoSacrificio}
          estaNoModoImagem={estaNoModoImagem}
          opcoes={opcoes}
          opcaoEmbaralhada={opcaoEmbaralhada}
          opcaoEscolhida={opcaoEscolhida}
          opcaoEliminada={opcaoEliminada}
          eliminados={eliminados}
          sobreviventes={sobreviventes}
          getLabelOpcao={getLabelOpcao}
          recalcularDestino={recalcularDestino}
          reiniciarTudo={voltarParaLista}
          pularSacrificio={pularSacrificio}
          iniciarAceleracaoSacrificio={iniciarAceleracaoSacrificio}
          pararAceleracaoSacrificio={pararAceleracaoSacrificio}
          velocidadeSacrificio={velocidadeSacrificio}
        />
      </div>
    </div>
  );
}
