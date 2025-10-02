import "./nav.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const body = {
        email: e.target.querySelector("#mail").value,
        password: e.target.querySelector("#password").value,
      };

      fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            document.querySelector("#mail").value = "";
            document.querySelector("#password").value = "";
            const errorMessage = document.querySelector(".error");
            errorMessage.style.display = "inline";
          }
        })
        .then((data) => {
          localStorage.setItem("authToken", data.token);
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Erreur lors de la connexion", error);
        });
    });
  } else {
    document.querySelector(".login").classList.add("logged");
    document.querySelector(".login").innerHTML =
      "Vous etes deja connecte <a href='index.html'>Retournez a la page d’accueil</a>";
  }
});
