document.getElementById("form-login").addEventListener("submit", function (e) {
    // 1. Previne o envio padrão do formulário
    e.preventDefault();

    // 2. Captura os valores dos campos de input (IDs "usuario" e "senha")
    const usuarioInput = document.getElementById("usuario"); // Certifique-se que seus inputs têm esses IDs
    const senhaInput = document.getElementById("senha");   // Certifique-se que seus inputs têm esses IDs

    const usuario = usuarioInput.value;
    const senha = senhaInput.value;

    // Verifica se os campos não estão vazios antes de enviar
    if (!usuario || !senha) {
        alert("Por favor, preencha usuário e senha.");
        return; // Interrompe a execução se algum campo estiver vazio
    }

    // Cria o objeto de dados para enviar como JSON para o backend
    const loginData = {
        username: usuario, // O nome da chave deve corresponder ao que o backend espera ('username' no nosso routes.py)
        password: senha    // O nome da chave deve corresponder ao que o backend espera ('password' no nosso routes.py)
    };

    // 3. Envia os dados para o backend usando fetch
    fetch('http://127.0.0.1:5000/api/login', { // <-- Mude '/api/login' para a URL completa
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData) // Converte o objeto JavaScript para uma string JSON
    })
    .then(response => {
        // 4. Processa a resposta do backend
        // Se a resposta não for OK (status 2xx), lança um erro com a mensagem do backend
        if (!response.ok) {
            // Tenta ler a resposta JSON para obter a mensagem de erro do backend
            return response.json().then(data => {
                 const error = new Error(data.message || 'Erro desconhecido no login');
                 error.status = response.status;
                 throw error; // Lança o erro para ser capturado pelo .catch()
            });
        }
        // Se a resposta for OK (status 200), retorna o JSON de sucesso
        return response.json();
    })
    .then(data => {
        // Este bloco é executado se a resposta do backend for sucesso (response.ok é true)
        console.log('Resposta do Backend:', data);

        if (data.status === 'success') {
            // Backend confirmou sucesso
            alert(data.message || 'Login bem-sucedido!'); // Mostra a mensagem de sucesso do backend
            window.location.href = "painel.html"; // Redireciona para o painel ou dashboard
        } else {
             // (Este else pode ser menos comum se o erro for tratado no .catch,
             // mas é bom ter caso o backend retorne 200 com um status 'error' no JSON)
             alert("Erro no login: " + (data.message || "Verifique suas credenciais."));
        }
    })
    .catch((error) => {
        // Este bloco é executado se houver um erro na requisição (rede, CORS)
        // ou se um erro foi lançado no primeiro .then() (ex: status 401)
        console.error('Erro na requisição ou no backend:', error);

        // Exibe a mensagem de erro para o usuário
        // Você pode ter um elemento HTML específico para isso (como a div errorMessage sugerida antes)
        // alert("Falha no login: " + (error.message || "Ocorreu um erro de comunicação."));

         // Se você tem um div com ID "errorMessage" no seu HTML para mostrar erros:
         const errorMessageDiv = document.getElementById('errorMessage');
         if (errorMessageDiv) {
             errorMessageDiv.textContent = "Falha no login: " + (error.message || "Ocorreu um erro de comunicação.");
         } else {
             alert("Falha no login: " + (error.message || "Ocorreu um erro de comunicação."));
         }
    });
});

// Certifique-se de que seu HTML tem os IDs corretos:
/*
<form id="form-login">
    <input type="text" id="usuario" name="usuario" required>
    <input type="password" id="senha" name="senha" required>
    <button type="submit">Entrar</button>
</form>
<div id="errorMessage" style="color: red;"></div> // Opcional: para mostrar erros sem alerta
*/

