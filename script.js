// Alternar tema escuro com persistência
const btnTema = document.getElementById("btnTema");

// Verifica se já existe preferência salva
if (localStorage.getItem("tema") === "escuro") {
  document.body.classList.add("dark-theme");
}

if (localStorage.getItem("tema") === "escuro") {
  document.body.classList.add("dark-theme");
  iconeTema.src = "imagens/sol.svg";
} else {
  iconeTema.src = "imagens/lua.svg";
}

if (btnTema) {
  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("tema", "escuro");
      iconeTema.src = "imagens/sol.png";
    } else {
      localStorage.setItem("tema", "claro");
      iconeTema.src = "imagens/lua.png";
    }
  });
}

// Feedback visual no formulário de contato
const formContato = document.getElementById("formContato");

if (formContato) {
  formContato.addEventListener("submit", (e) => {
    e.preventDefault();

    let msg = document.getElementById("formMsg");
    if (!msg) {
      msg = document.createElement("p");
      msg.id = "formMsg";
      formContato.insertAdjacentElement("afterend", msg);
    }
    msg.textContent = "✅ Mensagem enviada! Em breve entraremos em contato.";

    formContato.reset();
  });
}

// Menu hambúrguer mobile
const menuToggle = document.getElementById("menuToggle");
const menuLinks = document.getElementById("menuLinks");

if (menuToggle && menuLinks) {
  menuToggle.addEventListener("click", () => {
    menuLinks.classList.toggle("show");
    menuToggle.classList.toggle("active");
  });
}

// Botão de pesquisa
const containerBusca = document.getElementById("containerBusca");
const btnLupa = document.getElementById("btnLupa");
const inputBusca = document.getElementById("pesquisa");
const resultadoBusca = document.getElementById("resultadoBusca")

// lista da pesquisa
const paginas = [
  { titulo: "HTML", url: "html.html", palavras: "html tags estrutura marcação linguagem" },
  { titulo: "CSS", url: "css.html", palavras: "css estilo design cores layout" },
  { titulo: "JavaScript", url: "js.html", palavras: "javascript js interatividade script" },
  { titulo: "Python", url: "python.html", palavras: "python versatilidade programação" },
  { titulo: "Jogos", url: "jogos.html", palavras: "jogos games" },
  { titulo: "PCs", url: "pcs.html", palavras: "pcs computadores hardware" },
  { titulo: "Contato", url: "contato.html", palavras: "contato fale conosco formulário" }
];

if (btnLupa && containerBusca && inputBusca) {
  btnLupa.addEventListener("click", () => {
    containerBusca.classList.toggle("ativo");
    if (containerBusca.classList.contains("ativo")) {
      inputBusca.focus();
    } else {
      inputBusca.value = "";
      resultadoBusca.innerHTML = "";
    }
  });

  // Filtra os resultados enquanto digita
  inputBusca.addEventListener("input", () => {
    const termo = inputBusca.value.trim().toLowerCase();
    resultadoBusca.innerHTML = "";

    if (termo === "") return;

    const encontrados = paginas.filter((pagina) =>
      pagina.titulo.toLowerCase().includes(termo) ||
      pagina.palavras.toLowerCase().includes(termo)
    );

    if (encontrados.length === 0) {
      resultadoBusca.innerHTML = "<p class='sem-resultado'>Nenhum resultado encontrado</p>";
      return;
    }

    encontrados.forEach((pagina) => {
      const link = document.createElement("a");
      link.href = pagina.url;
      link.textContent = pagina.titulo;
      resultadoBusca.appendChild(link);
    });
  });

  // Enter vai direto para a página encontrada
  inputBusca.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const termo = inputBusca.value.trim().toLowerCase();
      const encontrado = paginas.find((pagina) =>
        pagina.titulo.toLowerCase().includes(termo) ||
        pagina.palavras.toLowerCase().includes(termo)
      );
      if (encontrado) window.location.href = encontrado.url;
    }
  });
}

// Sistema de Login
function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvarUsuario(usuario) {
  localStorage.setItem("usuarios", JSON.stringify(usuario));
}

function getUsuarioLogado() {
  return JSON.parse(localStorage.getItem("usuarioLogado"));
}

// Atualiza a navbar em todas as páginas
const areaLogin = document.getElementById("areaLogin");
if (areaLogin) {
  const usuarioLogado = getUsuarioLogado();

  if (usuarioLogado) {
    areaLogin.innerHTML = `<spam class="usuario-logado">Olá, ${usuarioLogado.nome}</spam> <button id="btnSair">Sair</button>`;
    document.getElementById("btnSair").addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      window.location.reload();
    });
  } else {
    areaLogin.innerHTML = `<a href="login.html" class="link-entrar">Entrar</a>`;
  }
}

// Altera entre as abas Login/Cadastro apenas na pagina de login
const tabLogin = document.getElementById("tabLogin");
const tabCadastro = document.getElementById("tabCadastro");
const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

if (tabLogin && tabCadastro) {
  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("tab-ativa");
    tabCadastro.classList.remove("tab-ativa");
    formLogin.classList.remove("escondido");
    formCadastro.classList.add("escondido");
  });

  tabCadastro.addEventListener("click", () => {
    tabCadastro.classList.add("tab-ativa");
    tabLogin.classList.remove("tab-ativa");
    formCadastro.classList.remove("escondido");
    formLogin.classList.add("escondido");
  });
}

// Envio de cadastro
if (formCadastro) {
  formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("cadNome").value.trim();
    const email = document.getElementById("cadEmail").value.trim().toLowerCase();
    const senha = document.getElementById("cadSenha").value;

    const usuarios = getUsuarios();

    if (usuarios.some((u) => u.email === email)) {
      alert("Já existe uma conta com esse e-mail.");
      return;
    }

    usuarios.push({ nome, email, senha });
    salvarUsuario(usuarios);

    localStorage.setItem("usuarioLogado", JSON.stringify({ nome, email }));
    window.location.href = "index.html";
  });
}

// Envio de login
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const senha = document.getElementById("loginSenha").value;

    const usuarios = getUsuarios();
    const encontrado = usuarios.find((u) => u.email === email && u.senha === senha);

    if (!encontrado) {
      alert("E-mail ou senha incorretos.");
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify({ nome: encontrado.nome, email: encontrado.email }));
    window.location.href = "index.html";
  });
}