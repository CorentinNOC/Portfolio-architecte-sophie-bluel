window.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  const nav = document.querySelectorAll("nav a");

  // Gère l'état des liens dans la nav

  nav.forEach((link) => {
    if (currentPath.includes(link.getAttribute("href"))) {
      link.classList.add("current");
    }
  });

  const authToken = localStorage.getItem("authToken");
  const loginNavItem = document.querySelector("nav a[href='login.html']");

  // Gère la déconnexion avec un confirm et retire le token si c'est confirmer

  if (authToken) {
    loginNavItem.innerText = "logout";
    loginNavItem.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.confirm("Voulez-vous vraiment vous deconnecter ?")) {
        localStorage.removeItem("authToken");
        window.location.href = "login.html";
      }
    });

    // Gère l'affichage du mode édition

    document.querySelector(".filters").style.display = "none";
    document.querySelector(".gallery").style.marginTop = "90px";
    document.querySelector(".edit-mode").style.display = "block";
    document.querySelector("header").style.paddingTop = "50px";
  }
});
