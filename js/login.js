document.getElementById("form-login").addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario === "admin" && senha === "123") {
        window.location.href = "painel.html";
    } else {
        alert("Usuário ou senha inválidos.");
    }
});

