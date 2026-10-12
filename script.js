
/* =========================================
   1. SELECIONAR OS ELEMENTOS DO HTML
   ========================================= */

// Seleciona todos os botões que possuem o atributo data-tela.
const botoesNavegacao = document.querySelectorAll("[data-tela]");

// Seleciona todas as seções que possuem a classe tela.
const telas = document.querySelectorAll(".tela");


/* =========================================
   2. FUNÇÃO PARA TROCAR DE TELA
   ========================================= */

function mostrarTela(nomeTela) {

    // Procura no HTML a seção que queremos abrir.
    const telaSelecionada = document.getElementById(nomeTela);

    // Verifica se a seção existe e se é uma tela válida.
    if (
        !telaSelecionada ||
        !telaSelecionada.classList.contains("tela")
    ) {
        console.error("A seção não foi encontrada:", nomeTela);
        return;
    }

    // Percorre todas as telas do portfólio.
    telas.forEach(function (tela) {

        // Verifica se esta é a tela que deve aparecer.
        const deveMostrar = tela.id === nomeTela;

        // Esconde as telas que não foram selecionadas.
        tela.hidden = !deveMostrar;

        // Garante que a tela selecionada seja exibida.
        tela.style.display = deveMostrar ? "block" : "none";
    });


    /* =====================================
       3. ATUALIZAR O BOTÃO SELECIONADO
       ===================================== */

    botoesNavegacao.forEach(function (botao) {

        // Confere se o botão corresponde à tela aberta.
        const estaAtivo = botao.dataset.tela === nomeTela;

        // Adiciona ou remove a classe visual ativo.
        botao.classList.toggle("ativo", estaAtivo);

        // Atualiza o estado do botão para leitores de tela.
        botao.setAttribute("aria-pressed", String(estaAtivo));
    });


    /* =====================================
       4. VOLTAR AO TOPO DA PÁGINA
       ===================================== */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Registra no console qual tela foi aberta.
    console.log("Tela aberta:", nomeTela);
}


/* =========================================
   5. CONFIGURAR OS BOTÕES DE NAVEGAÇÃO
   ========================================= */

// Percorre todos os botões de navegação.
botoesNavegacao.forEach(function (botao) {

    // Executa esta função quando o botão recebe um clique.
    botao.addEventListener("click", function () {

        // Descobre qual tela o botão deve abrir.
        const nomeTela = botao.dataset.tela;

        // Chama a função que troca de tela.
        mostrarTela(nomeTela);
    });
});


/* =========================================
   6. CRIAR O BOTÃO VOLTAR AO INÍCIO
   ========================================= */

// Procura um botão de voltar ao início que já exista.
let botaoInicio = document.getElementById("voltar-inicio");

// Se o botão não existir, vamos criá-lo.
if (!botaoInicio) {

    botaoInicio = document.createElement("button");

    // Define o texto que aparecerá no botão.
    botaoInicio.textContent = "↑ Voltar ao início";

    // Define o identificador utilizado pelo CSS.
    botaoInicio.id = "voltar-inicio";

    // Evita que o botão envie um formulário por acidente.
    botaoInicio.type = "button";

    // Insere o botão no final do body do documento.
    document.body.appendChild(botaoInicio);
}


/* =========================================
   7. PROGRAMAR O BOTÃO DE VOLTAR
   ========================================= */

// Quando o usuário clicar no botão...
botaoInicio.addEventListener("click", function () {

    // Mostra a tela inicial de boas-vindas.
    mostrarTela("tela-inicio");
});


/* =========================================
   8. DEFINIR A TELA INICIAL
   ========================================= */

// Abre a tela de boas-vindas quando o site carrega.
mostrarTela("tela-inicio");
