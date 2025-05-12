// Evento de clique no botão "Sair"
document.getElementById("btn-sair").addEventListener("click", function () {
    window.location.href = "index.html"; // Redireciona para a página de login
});

// Seleciona os elementos principais da página
const categoriaSelect = document.getElementById("categoria"); // Seleção da categoria
const detalhesContainer = document.getElementById("detalhes-container"); // Container para os detalhes da despesa
const form = document.getElementById("form-despesa"); // Formulário de despesas
const listaDespesas = document.getElementById("lista-despesas"); // Lista de despesas cadastradas

// Evento de mudança na categoria selecionada
categoriaSelect.addEventListener("change", atualizarDetalhes);

// Função para atualizar os detalhes da despesa com base na categoria escolhida
function atualizarDetalhes() {
    const categoria = categoriaSelect.value; // Obtém a categoria selecionada
    detalhesContainer.innerHTML = ""; // Limpa os detalhes da despesa anterior

    // Verifica a categoria e exibe as opções correspondentes
    if (categoria === "cartao") {
        criarSelectDetalhe("Cartão de Crédito:", ["Escolha a despesa", "Porto Infinite", "Santander", "Khelf"]);
    } else if (categoria === "empresa") {
        criarSelectDetalhe("Despesa da empresa:", ["Escolha a despesa", "Imposto", "Contador", "Vivo Fibra", "Locaweb"]);
    } else if (categoria === "casa") {
        criarSelectDetalhe("Despesa da casa:", [
            "Escolha a despesa", "Aluguel", "Água", "Luz", "Vivo Celular", "Financiamento do Carro",
            "Ipva Carro", "Ipva Moto", "Gráfica", "Gasolina", "Correio"
        ]);
    }
}

// Função para criar o select com as despesas
function criarSelectDetalhe(labelTexto, opcoes) {
    const label = document.createElement("label");
    label.textContent = labelTexto; // Exibe o texto do label da categoria

    const select = document.createElement("select");
    select.name = "detalhe";
    select.required = true; // Campo obrigatório

    // Adiciona a opção "Escolha a despesa" como a primeira opção
    const optionEscolha = document.createElement("option");
    optionEscolha.value = "";
    optionEscolha.textContent = "Escolha a despesa";
    select.appendChild(optionEscolha);

    // Adiciona as opções de despesas correspondentes à categoria
    opcoes.forEach(opcao => {
        const option = document.createElement("option");
        option.value = opcao;
        option.textContent = opcao;
        select.appendChild(option);
    });

    // Adiciona o label e o select ao container de detalhes
    detalhesContainer.appendChild(label);
    detalhesContainer.appendChild(select);
}

// Função para lidar com o envio do formulário de despesas
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio tradicional do formulário

    const categoria = categoriaSelect.value; // Categoria selecionada
    const valor = document.getElementById("valor").value; // Valor da despesa
    const detalhe = form.elements["detalhe"]?.value; // Detalhe da despesa

    // Verifica se a despesa foi escolhida corretamente (não pode ser "Escolha a despesa")
    if (!detalhe || detalhe === "Escolha a despesa") {
        alert("Por favor, escolha uma despesa válida.");
        return; // Impede o envio do formulário se a despesa não for válida
    }

    // Cria a nova linha para a despesa
    const item = document.createElement("div");
    item.className = "item-despesa";

    const texto = document.createElement("span");
    texto.textContent = `${categoria.charAt(0).toUpperCase() + categoria.slice(1)} - ${detalhe}: R$ ${parseFloat(valor).toFixed(2)}`;
    item.appendChild(texto);

    // Adiciona o botão de excluir se a categoria for "Casa" ou "Empresa"
    if (categoria === "casa" || categoria === "empresa") {
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        btnExcluir.onclick = function () {
            listaDespesas.removeChild(item); // Remove a despesa da lista
        };
        item.appendChild(btnExcluir);
    }

    // Adiciona o item na lista de despesas
    listaDespesas.appendChild(item);

    // Limpa o formulário após o envio
    form.reset(); // Limpa os campos do formulário
    detalhesContainer.innerHTML = ""; // Limpa os detalhes da despesa
});




