# Oráculo de Decisão

<p align="center">
  <strong>Aplicação web interativa para auxiliar usuários em processos simples de tomada de decisão.</strong>
</p>

<p align="center">
  Projeto desenvolvido para a disciplina de <strong>Interação Humano-Computador</strong> da <strong>Universidade Federal de Ouro Preto</strong>.
</p>

---

## Sobre o Projeto

O **Oráculo de Decisão** é uma aplicação web desenvolvida com o objetivo de auxiliar usuários em situações de indecisão, permitindo que diferentes opções sejam cadastradas e sorteadas pelo sistema.

A proposta do projeto é transformar uma ação simples, como escolher entre alternativas, em uma experiência interativa, visualmente organizada e de fácil utilização. A aplicação foi construída considerando conceitos da disciplina de **Interação Humano-Computador**, como usabilidade, clareza visual, feedback ao usuário, responsividade e organização das informações na interface.

O sistema permite que o usuário cadastre opções manualmente, importe dados por meio de arquivo CSV ou realize sorteios utilizando imagens. A partir das opções cadastradas, o oráculo realiza a escolha de forma aleatória.

---

## Projeto Hospedado

A aplicação está disponível para acesso online, sem necessidade de instalação local.

**Acessar o projeto:** [Clique aqui para abrir o Oráculo de Decisão](https://oraculo-decisao.netlify.app/)

---

## Objetivo

O objetivo do projeto é desenvolver uma aplicação web criativa, simples e responsiva, capaz de auxiliar o usuário na escolha entre duas ou mais opções.

Além da funcionalidade principal de sorteio, o projeto busca aplicar princípios de Interação Humano-Computador para oferecer uma experiência de uso clara, intuitiva e agradável.

---

## Disciplina

Projeto desenvolvido para a disciplina:

**Interação Humano-Computador**

Instituição:

**Universidade Federal de Ouro Preto — UFOP**

---

## Integrantes

| Nome                              | Matrícula |
| --------------------------------- | --------- |
| Patrick Peres Nicolini            | 22.1.8103 |
| Carlos Gabriel de Oliveira Frazão | 22.1.8100 |

---

## Funcionamento da Aplicação

O sistema permite que o usuário cadastre opções e solicite ao oráculo a realização de um sorteio. A escolha é feita de forma aleatória, utilizando lógica implementada em JavaScript.

A aplicação possui dois modos principais de funcionamento:

### Modo Normal

No **Modo Normal**, o usuário informa as opções desejadas e o sistema realiza um sorteio padrão, escolhendo uma delas aleatoriamente.

Esse modo é indicado para decisões rápidas, em que o usuário deseja apenas obter uma escolha entre as alternativas cadastradas.

Exemplo:

```txt
Opções informadas:
- Pizza
- Hambúrguer
- Sushi

Resultado:
O oráculo escolheu: Hambúrguer
```

---

### Modo Sacrifício

No **Modo Sacrifício**, o sistema realiza uma eliminação progressiva das opções cadastradas.

Nesse modo, as opções são removidas uma por uma, de forma aleatória, até que reste apenas uma alternativa final. A última opção restante é apresentada como a decisão do oráculo.

Esse modo torna o processo de escolha mais dinâmico e visual, permitindo acompanhar a eliminação gradual das alternativas.

Exemplo:

```txt
Opções informadas:
- Ana
- Bruno
- Carlos
- Daniel

Eliminações:
- Carlos foi eliminado
- Ana foi eliminada
- Daniel foi eliminado

Resultado final:
O oráculo escolheu: Bruno
```

---

## Formas de Sorteio

A aplicação permite realizar sorteios de diferentes formas, ampliando as possibilidades de uso do sistema.

### Sorteio com nomes ou textos

O usuário pode digitar manualmente as opções que deseja sortear, como nomes, atividades, lugares, comidas ou qualquer outro tipo de informação textual.

---

### Sorteio com arquivo CSV

O sistema permite importar opções por meio de um arquivo CSV, facilitando o uso quando há uma grande quantidade de dados.

Essa funcionalidade é útil para listas de nomes, participantes, itens ou qualquer conjunto de informações organizadas em arquivo.

---

### Sorteio com imagens

Além de textos e arquivos CSV, a aplicação também permite realizar sorteios utilizando imagens.

Nesse caso, o usuário pode cadastrar imagens como opções, e o sistema realiza o sorteio entre elas. Essa funcionalidade torna a experiência mais visual e interativa.

---

## Funcionalidades

A aplicação possui as seguintes funcionalidades principais:

* Cadastro manual de opções para sorteio;
* Sorteio aleatório no modo normal;
* Sorteio por eliminação no modo sacrifício;
* Importação de dados por arquivo CSV;
* Sorteio utilizando imagens;

---

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

### React

Utilizado para a construção da interface da aplicação por meio de componentes reutilizáveis.

### Vite

Utilizado como ferramenta de desenvolvimento front-end, oferecendo um ambiente rápido para criação, execução e build do projeto.

### JavaScript

Utilizado na lógica principal da aplicação, incluindo o funcionamento dos sorteios aleatórios e da eliminação progressiva no modo sacrifício.

### Tailwind CSS

Utilizado para a estilização da interface, contribuindo para a criação de layouts responsivos e visualmente organizados.

### Framer Motion

Utilizado para animações e transições visuais, tornando a experiência de uso mais fluida e interativa.

---

---

## Estrutura do Projeto

A estrutura do projeto foi organizada de forma simples, separando os componentes reutilizáveis, as páginas principais da aplicação e os arquivos de configuração.

```txt
ORACULO-DECISAO/
├── public/
├── src/
│   ├── components/
│   │   ├── DecorativeBackground.jsx
│   │   └── transitionWrapper.jsx
│   │
│   ├── modules/
│   │   ├── homePage/
│   │   │   └── homePage.jsx
│   │   │
│   │   ├── notFoundPage/
│   │   │   └── notFoundPage.jsx
│   │   │
│   │   └── oraculoPage/
│   │       └── oraculoPage.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

### Descrição das principais pastas e arquivos

A pasta `public` armazena arquivos públicos utilizados pela aplicação, como imagens e outros recursos estáticos.

A pasta `src` contém o código-fonte principal do projeto.

Dentro de `src/components`, ficam os componentes reutilizáveis da interface, como o plano de fundo decorativo e o componente responsável pelas transições entre páginas.

A pasta `src/modules` organiza as páginas principais da aplicação em módulos separados. Essa divisão facilita a manutenção do código e melhora a organização do projeto.

O arquivo `App.jsx` é responsável por estruturar as rotas e a navegação principal da aplicação.

O arquivo `main.jsx` é o ponto de entrada do React, responsável por renderizar a aplicação no navegador.

O arquivo `index.css` contém os estilos globais da aplicação.

Os arquivos `package.json` e `package-lock.json` armazenam as dependências e scripts do projeto.

O arquivo `vite.config.js` contém as configurações do Vite, ferramenta utilizada para desenvolvimento e build da aplicação.

O arquivo `eslint.config.js` contém as configurações de padronização e análise do código.

---

## Como Baixar o Projeto

Para clonar o repositório em sua máquina, utilize o comando:

```bash
git clone https://github.com/patricknperes/oraculo-decisao.git
```

Depois, acesse a pasta do projeto:

```bash
cd oraculo-decisao
```

---

## Como Rodar o Projeto

Como o projeto utiliza o Vite, a execução segue o padrão de projetos front-end criados com essa ferramenta.

Primeiro, instale as dependências:

```bash
npm install
```

Depois, execute o projeto:

```bash
npm run dev
```

Após executar o comando, o terminal exibirá um endereço local semelhante a este:

```bash
http://localhost:5173
```

Acesse esse endereço no navegador para visualizar a aplicação.

