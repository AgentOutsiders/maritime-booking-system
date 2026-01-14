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






// Fonction pop up
document.body.innerHTML += `<div class="popUpHaut" id="popUpHaut">
        <img src="../img/puce/fleche/flh1_sf.png" alt="Image d'une flèche pour remonter" id="flecheRetour">
    </div>`;

const popUpHaut = document.getElementById('popUpHaut');                // On récupère l'élément HTML de la pop-up grâce à son identifiant
window.addEventListener('scroll', function()                           // On écoute l'événement de scroll
{
    let scrollPosition = window.scrollY;                               // On stocke la position actuelle du scroll en pixels depuis le haut de la page
    if (scrollPosition > 300)                                          // On test si l'utilisateur a scrollé plus de 300 pixels vers le bas
    {
        popUpHaut.classList.add('visible');                            // Si c'est le cas, on ajoute la classe visible pour afficher la pop-up
    } 
    else 
    {
        popUpHaut.classList.remove('visible');                         // Sinon, on retire la classe visible pour cacher la pop-up
    }
});


let bouton = document.getElementById("flecheRetour");                  // On récupère l'élément HTML du bouton flèche grâce à son identifiant
bouton.addEventListener("click", function()                            // On écoute l'événement de clic sur le bouton
{
    window.scrollTo({                                                  // On fait défiler la page jusqu'en haut
        top: 0,                                                        // On définit la position de destination, c'est à dire tout en haut
        behavior: 'smooth'                                             // On fait un défilement fluide et animé
    });
});






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

// Optionnel : Ajouter de la musique (mets une URL de MP3 valide ici)
const audio1 = new Audio('https://www.myinstants.com//media/sounds/a-real-boy.mp3'); 
audio1.loop = true;
const audio2 = new Audio('https://www.myinstants.com/media/sounds/echo3b.mp3');
audio2.loop = true;

function lancerEasterEgg() {
  // --- 1. Audio (décommente si tu veux du son) ---
  if (angle == 0) 
    {
        audio1.play();
        audio2.play();
    }

  // On incrémente l'angle
  angle += 5; // On accélère un peu la base

  // --- 2. Calculs du chaos ---
  
  // PULSATION : Math.sin crée une vague entre -1 et 1.
  // Ici, le zoom va osciller entre 0.5 (dézoomé) et 1.5 (zoomé)
  const echelle = 1 + Math.sin(angle * 0.05) * 0.5; 

  // TREMBLEMENT : Un nombre aléatoire entre -10px et 10px
  const decaleX = (Math.random() * 20) - 10;
  const decaleY = (Math.random() * 20) - 10;

  // --- 3. Application sur le BODY ---
  
  // On combine : Rotation + Zoom (scale) + Tremblement (translate)
  document.body.style.transform = 
    "rotate(" + angle + "deg) " + 
    "scale(" + echelle + ") " + 
    "translate(" + decaleX + "px, " + decaleY + "px)";

  // Couleurs stroboscopiques (ton code original)
  document.body.style.backgroundColor = "rgb(" + (angle % 255) + ", " + ((angle * 2) % 255) + ", " + ((angle * 3) % 255) + ")";
  document.body.style.color = "rgb(" + (255 - (angle % 255)) + ", 0, 0)"; // Texte rouge clignotant c'est plus agressif

  // FILTRES : Ajoute du flou et inverse les couleurs cycliquement
  // C'est ça qui donne l'effet "Deep Fried Meme"
  document.body.style.filter = "invert(" + (angle % 100) + "%) contrast(200%)";

  // POLICE : La touche finale
  document.body.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive';

  // --- 4. Destruction des images ---
  document.querySelectorAll("img").forEach((img) => {
    // Les images tournent dans l'autre sens ET s'étirent bizarrement (skew)
    img.style.transform = 
        "rotate(" + (-angle * 2) + "deg) " + 
        "skew(" + (angle % 45) + "deg)";
  });
  
  // --- 5. Modification du texte (Optionnel) ---
  // Attention, ça peut ralentir si tu as beaucoup de texte
  document.querySelectorAll("h1, h2, p").forEach((el) => {
      el.innerText = "ERREUR";
  });

  requestAnimationFrame(lancerEasterEgg);
}