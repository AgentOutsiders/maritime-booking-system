// --- Pré-chargement des sons (Optionnel) ---
// On prépare les objets Audio, même si on utilise surtout les chemins ("chemin") ci-dessous.
let sons = {
    mouette: new Audio("../sons/mouette/son1.mp3"),
    goeland: new Audio("../sons/goeland/son1.mp3"),
    cormoran: new Audio("../sons/cormoran/son1.mp3")
};

// --- Récupération de la zone contenant les boutons ---
let zoneBoutons = document.getElementById("sonsParametre");


// --- Gestion du bouton "Mouette" ---
zoneBoutons.querySelector("#mouette").addEventListener("click", function() {
    let chemin = "../sons/mouette/son1.mp3";
    
    // On sauvegarde le choix dans la mémoire du navigateur
    localStorage.setItem("son", chemin);
    
    // On joue le son immédiatement pour tester
    jouerSon(chemin);
});


// --- Gestion du bouton "Goéland" ---
zoneBoutons.querySelector("#goeland").addEventListener("click", function() {
    let chemin = "../sons/goeland/son1.mp3";
    localStorage.setItem("son", chemin);
    jouerSon(chemin);
});


// --- Gestion du bouton "Cormoran" ---
zoneBoutons.querySelector("#cormoran").addEventListener("click", function() {
    let chemin = "../sons/cormoran/son1.mp3";
    localStorage.setItem("son", chemin);
    jouerSon(chemin);
});


// --- Gestion du bouton "Arrêter le son" ---
zoneBoutons.querySelector("#stopSon").addEventListener("click", function() {
    // On supprime la préférence de la mémoire
    localStorage.removeItem("son");
    
    // On coupe le son actuel via la fonction définie dans javascript.js
    arreterSon();
});