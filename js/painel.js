// ---------------- Botão Sair ----------------
// Ao clicar no botão com id "btn-sair", o usuário é redirecionado para a página de login
document.getElementById("btn-sair").addEventListener("click", function () {
    window.location.href = "index.html"; // Redireciona para index.html
});

// ---------------- Elementos da Página ----------------
const categoriaSelect = document.getElementById("categoria");  // Select de categoria da despesa
const detalhesContainer = document.getElementById("detalhes-container"); // Container onde os detalhes são inseridos dinamicamente
const form = document.getElementById("form-despesa"); // Formulário principal de lançamento
const listaDespesas = document.getElementById("lista-despesas");  // Onde as despesas são listadas
const mesSelect = document.getElementById("mes"); // Select para o mês de lançamento
const btnConsultar = document.getElementById("btn-consultar"); // Botão para consultar despesas
const mesConsulta = document.getElementById("mes-consulta"); // Select de mês para consulta
const resultadoConsulta = document.getElementById("resultado-consulta"); // Onde aparecem os resultados da consulta

// Array que armazenará todas as despesas lançadas
let despesas = [];

// ---------------- Atualiza os detalhes de acordo com a categoria ----------------
categoriaSelect.addEventListener("change", atualizarDetalhes);

function atualizarDetalhes() {
    const categoria = categoriaSelect.value;
    detalhesContainer.innerHTML = ""; // Limpa o container antes de atualizar

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

// ---------------- Criação dinâmica do campo "detalhe" ----------------
function criarSelectDetalhe(labelTexto, opcoes) {
    const label = document.createElement("label");
    label.textContent = labelTexto;

    const select = document.createElement("select");
    select.name = "detalhe";
    select.required = true;

    opcoes.forEach(opcao => {
        const option = document.createElement("option");
        option.value = opcao;
        option.textContent = opcao;
        select.appendChild(option);
    });

    detalhesContainer.appendChild(label);
    detalhesContainer.appendChild(select);
}

// ---------------- Evento de envio do formulário ----------------
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o recarregamento da página

    const categoria = categoriaSelect.value;
    const valor = document.getElementById("valor").value;
    const detalhe = form.elements["detalhe"]?.value;
    const mes = mesSelect.value;

    // Validação dos campos obrigatórios
    if (!detalhe || detalhe === "Escolha a despesa") {
        alert("Por favor, escolha uma despesa válida.");
        return;
    }

    if (!mes) {
        alert("Por favor, selecione um mês.");
        return;
    }

    // Criação do item de despesa para exibição
    const item = document.createElement("div");
    item.className = "item-despesa";

    const texto = document.createElement("span");
    texto.textContent = `${mes} - ${categoria.charAt(0).toUpperCase() + categoria.slice(1)} - ${detalhe}: R$ ${parseFloat(valor).toFixed(2)}`;
    item.appendChild(texto);

    // Botão de excluir (somente para categorias casa ou empresa)
    if (categoria === "casa" || categoria === "empresa") {
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        btnExcluir.onclick = function () {
            listaDespesas.removeChild(item); // Remove o item da lista
        };
        item.appendChild(btnExcluir);
    }

    listaDespesas.appendChild(item); // Adiciona o item na lista da página

    // Adiciona a despesa no array
    despesas.push({
        categoria,
        detalhe,
        valor: parseFloat(valor),
        mes
    });

    // Limpa o formulário e detalhes
    form.reset();
    detalhesContainer.innerHTML = "";
});

// ---------------- Consulta de despesas por mês ----------------
btnConsultar.addEventListener("click", function () {
    const mesSelecionado = mesConsulta.value;

    if (!mesSelecionado) {
        alert("Por favor, selecione um mês para consultar.");
        return;
    }

    const despesasDoMes = despesas.filter(d => d.mes === mesSelecionado);

    if (despesasDoMes.length === 0) {
        resultadoConsulta.innerHTML = `<p>Nenhuma despesa encontrada para ${mesSelecionado}.</p>`;
        return;
    }

    const total = despesasDoMes.reduce((soma, d) => soma + d.valor, 0);

    resultadoConsulta.innerHTML = `
        <p>Total de despesas em <strong>${mesSelecionado}</strong>: <strong>R$ ${total.toFixed(2)}</strong></p>
        <ul>
            ${despesasDoMes.map(d => `<li>${d.categoria} - ${d.detalhe}: R$ ${d.valor.toFixed(2)}</li>`).join("")}
        </ul>
    `;
});








