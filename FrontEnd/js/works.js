let allWorks = [];

// Importe depuis le backend les travaux

export async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    allWorks = data;
    return allWorks;
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux :", error);
  }
}

// Afficher les travaux
export function displayWorks(currentWorks) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  currentWorks.forEach((work) => {
    const figure = document.createElement("figure");
    figure.id = work.id;
    figure.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
    `;
    gallery.appendChild(figure);
  });
}

fetchWorks().then(displayWorks);
