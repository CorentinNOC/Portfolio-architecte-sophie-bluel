window.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  const nav = document.querySelectorAll("nav a");

  nav.forEach((link) => {
    if (currentPath.includes(link.getAttribute("href"))) {
      link.classList.add("current");
    }
  });

  const authToken = localStorage.getItem("authToken");
  const loginNavItem = document.querySelector("nav a[href='login.html']");

  if (authToken) {
    loginNavItem.innerText = "logout";
    loginNavItem.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.confirm("Voulez-vous vraiment vous deconnecter ?")) {
        localStorage.removeItem("authToken");
        window.location.href = "login.html";
      }
    });
  }
});
