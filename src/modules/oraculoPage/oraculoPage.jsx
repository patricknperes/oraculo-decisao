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

  const modoAtual = opcoes.length === 0 ? "livre" : opcoes[0].tipo;
  const estaNoModoSacrificio = modoRitual === "sacrificio";
  const estaNoModoImagem = modoAtual === "imagem";
  const podeLimparCampos = inputOpcao.trim() || opcoes.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
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

  const limparResultadoAnterior = () => {
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

  const executarSacrificio = () => {
    let restantes = [...opcoes];
    const historicoEliminados = [];

    setSobreviventes(restantes);
    setOpcaoEmbaralhada(restantes[0]);

    const sacrificioInterval = setInterval(() => {
      if (restantes.length <= 1) {
        clearInterval(sacrificioInterval);

        setOpcaoEscolhida(restantes[0]);
        setOpcaoEliminada(null);
        setStatusRitual("revelado");
        return;
      }

      const indiceEliminado = Math.floor(Math.random() * restantes.length);
      const [eliminado] = restantes.splice(indiceEliminado, 1);
      const sobreviventeAleatorio =
        restantes[Math.floor(Math.random() * restantes.length)];

      historicoEliminados.push(eliminado);

      setOpcaoEliminada(eliminado);
      setOpcaoEmbaralhada(sobreviventeAleatorio);
      setEliminados([...historicoEliminados]);
      setSobreviventes([...restantes]);
    }, 1100);
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

  const reiniciarTudo = () => {
    setStatusRitual("transicao");

    setTimeout(() => {
      setOpcoes((prev) => {
        prev.forEach(liberarUrlImagem);
        return [];
      });

      setInputOpcao("");
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
          reiniciarTudo={reiniciarTudo}
        />
      </div>
    </div>
  );
}
