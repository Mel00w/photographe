// // Rendre le texte courbé
// new CircleType(document.getElementById("curvedText")).radius(180);

// Rendre le texte courbé avec un radius adapté aux media queries
function updateRadius() {
  const curvedText = document.getElementById("curvedText");
  const circleType = new CircleType(curvedText);

  if (window.matchMedia("(max-width: 768px)").matches) {
    circleType.radius(141); // Radius pour les petits écrans
  } else if (window.matchMedia("(min-width: 1920px)").matches) {
    circleType.radius(240); // Radius pour les très grands écrans
  } else {
    circleType.radius(190); // Radius pour les écrans moyens
  }
}

// Mettre à jour le radius au chargement et lors du redimensionnement
window.addEventListener("DOMContentLoaded", updateRadius);
window.addEventListener("resize", updateRadius);

// Gestion du carrousel
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".image-wrapper");
  const circles = document.querySelectorAll("#circle_point div"); // Sélection des cercles
  const leftArrow = document.getElementById("arrow-left");
  const rightArrow = document.getElementById("arrow-right");
  const caroussel = document.querySelector(".caroussel"); // Sélection du carrousel pour changer la couleur de fond
  const header = document.querySelector("header"); // Sélection du header
  let currentIndex = 0;

  // Liste des couleurs de fond pour chaque image
  const backgroundColors = [
    "radial-gradient(circle, rgb(220, 205, 240) 0%,#a94ddf 100%)",
    "radial-gradient(circle,rgb(196, 214, 240) 0%,rgb(114, 169, 247) 100%)",
    "radial-gradient(circle,rgb(238, 174, 150) 0%, #FF7D4D 100%)",
    "radial-gradient(circle, #FFCC92 0%, #FF8900 100%)",
    "radial-gradient(circle,rgb(185, 183, 128) 0%,rgb(177, 170, 39) 100%)",
  ];

  // Liste des images de fond pour chaque slide
  const backgroundImages = [
    "./asset/img/parapluie.png",
    "./asset/img/bulle.png",
    "./asset/img/plume.png",
    "./asset/img/etoile.png",
    "./asset/img/fleur.png"
  ];

  // Fonction pour mettre à jour l'image active, les cercles visibles et la couleur de fond
  function updateActiveImage(newIndex) {
    const currentImg = images[currentIndex];
    const nextImg = images[newIndex];

    // Animation de sortie de l'image actuelle
    currentImg.classList.add("animate-out");
    // Animation d'entrée de la nouvelle image
    nextImg.classList.add("active", "animate-in");

    // Mise à jour des cercles
    circles.forEach((circle) => {
      // Si l'index de l'image active n'est pas 0, on affiche le cercle correspondant
      if (
        newIndex !== 0 &&
        parseInt(circle.getAttribute("data-index")) === newIndex
      ) {
        circle.classList.add("visible"); // Affiche le cercle correspondant
      } else {
        circle.classList.remove("visible"); // Cache les autres cercles
      }
    });

    // Changer la couleur de fond du carrousel, du header
    const newColor = backgroundColors[newIndex];
    caroussel.style.background = newColor;
    header.style.background = newColor;

    // Changer les images de fond
    const imgBkd = document.querySelector('.img-bkd img');
    const imgBkg = document.querySelector('.img-bkg img');
    imgBkd.src = backgroundImages[newIndex];
    imgBkg.src = backgroundImages[newIndex];

    // Suppression des classes d'animation après un délai
    setTimeout(() => {
      currentImg.classList.remove("active", "animate-out");
      nextImg.classList.remove("animate-in");
    }, 1200);

    // Mise à jour de l'index actuel
    currentIndex = newIndex;
  }

  // Gestion de l'event pour l'arrow droite
  rightArrow.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % images.length;
    updateActiveImage(newIndex);
  });

  // Gestion de l'event pour l'arrow gauche
  leftArrow.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    updateActiveImage(newIndex);
  });
});
