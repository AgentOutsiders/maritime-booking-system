// --- Initialisation ---

// Variable pour mémoriser le son en cours de lecture
let sonActuel = null;

// On attend que l'utilisateur clique une fois n'importe où sur la page pour lancer le son.
// (Les navigateurs bloquent souvent le son automatique s'il n'y a pas eu d'interaction)
document.addEventListener("click", jouerSonBP, { once: true });


// --- Fonctions de gestion du son ---

// Fonction pour lancer un fichier audio spécifique
function jouerSon(chemin) {
    
    // Si une musique joue déjà, on la met en pause pour éviter la superposition
    if (sonActuel) {
        sonActuel.pause();
    }

    // On charge le nouveau fichier audio
    sonActuel = new Audio(chemin);
    
    // On active la répétition en boucle (loop)
    sonActuel.loop = true;
    
    // On lance la lecture
    sonActuel.play();
}

// Fonction pour couper le son
function arreterSon() {
    if (sonActuel) {
        sonActuel.pause();
    }
}

// Fonction intermédiaire pour lancer le son stocké en mémoire
function jouerSonBP() {
    // On récupère le chemin du fichier son sauvegardé dans le navigateur (localStorage)
    // et on l'envoie à la fonction principale
    jouerSon(localStorage.getItem("son"));
}



















// 1. La séquence officielle du Konami Code
const codeSecret = [
  "ArrowUp", 
  "ArrowUp", 
  "ArrowDown", 
  "ArrowDown", 
  "ArrowLeft", 
  "ArrowRight", 
  "ArrowLeft", 
  "ArrowRight", 
  "b", 
  "a"
];

// 2. Variable pour suivre la progression du joueur (index)
let positionActuelle = 0;

// 3. On écoute l'événement 'keydown' (touche enfoncée) sur toute la page
document.addEventListener('keydown', (event) => {
  
  // On récupère la touche appuyée
  const toucheAppuyee = event.key;

  // 4. On compare avec la touche attendue dans la séquence
  // On regarde ce qu'il y a dans le tableau à l'index 'positionActuelle'
  if (toucheAppuyee == codeSecret[positionActuelle]) {
    
    // C'est la bonne touche ! On passe à la suivante.
    positionActuelle += 1;

    // 5. Est-ce que la séquence est complète ?
    if (positionActuelle == codeSecret.length) {
      lancerEasterEgg();
      positionActuelle = 0; // On remet à zéro pour pouvoir le refaire
    }

  } else {
    // Mauvaise touche ! On réinitialise la progression.
    positionActuelle = 0;
  }
});

// 6. La fonction qui fait l'action spéciale
let angle = 0;

function lancerEasterEgg() {
  // 1. On augmente l'angle (la vitesse de rotation)
  // Plus le chiffre est grand, plus ça tourne vite
  angle = angle + 2; 

  // 2. On applique le nouvel angle
  // On insère la variable 'angle' dans le texte CSS
  document.body.style.transform = "rotate(" + angle + "deg)";
  document.body.style.backgroundColor = "rgb(" + (angle % 255) + ", " + ((angle * 2) % 255) + ", " + ((angle * 3) % 255) + ")";
  document.body.style.color = "rgb(" + ((angle * 2) % 255) + ", " + ((angle * 3) % 255) + ", " + (angle % 255) + ")";

  // 3. On rappelle la fonction pour la frame suivante
  requestAnimationFrame(lancerEasterEgg);
}