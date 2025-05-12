// Espera o carregamento completo da página antes de executar
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário e a área de mensagens
    const form = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");

    // Adiciona um evento ao enviar o formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Pega os valores digitados
        const username = form.username.value;
        const password = form.password.value;

        // Verifica se os dados estão corretos (simulação)
        if (username === "admin" && password === "1234") {
            // Redireciona para a próxima página (simulação)
            window.location.href = "painel.html";
        } else {
            // Mostra mensagem de erro
            errorMessage.textContent = "Usuário ou senha incorretos.";
        }
    });
});
