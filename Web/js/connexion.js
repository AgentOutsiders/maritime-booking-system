// --- 1. Logique au chargement de la page ---

// On vérifie tout de suite si l'utilisateur est déjà connecté.
// Si le numéro de réservation ("num") est déjà dans la mémoire du navigateur,
// on le redirige directement sans attendre.
if ("num" in sessionStorage) {
    redirection();
}

// --- 2. Fonction de tentative de connexion ---
// Cette fonction est appelée quand l'utilisateur clique sur le bouton de validation
async function testConnexion() {
    
    // On récupère l'élément HTML où l'utilisateur a tapé son numéro
    let champNumero = document.getElementById("numRes");

    // On demande à l'API si ce numéro existe
    let reponse = await fetch(
        "https://can.iutrs.unistra.fr/api/reservation/" + champNumero.value
    );

    // Si le serveur répond "404", c'est que la réservation n'existe pas
    if (reponse.status == 404) {
        let zoneErreur = document.getElementById("erreur");
        zoneErreur.innerHTML = `Aucune réservation au numéro indiqué <br> Merci de vérifier`;
    } 
    // Sinon, la réservation existe
    else {
        let donnees = await reponse.json();

        // On sauvegarde les informations importantes dans la mémoire de session
        sessionStorage.setItem("num", champNumero.value);
        sessionStorage.setItem("nbPassagers", donnees["nbPassagers"]);

        // On lance la fonction qui change de page
        redirection();
    }
}

// --- 3. Fonction de redirection ---
// Cette fonction gère le changement de page dynamique
function redirection() {
    
    // On analyse l'adresse URL actuelle pour trouver les paramètres
    // (tout ce qui se trouve après le "?")
    let parametresUrl = new URLSearchParams(window.location.search);
    
    // On récupère la valeur du paramètre "vers" (ex: ?vers=accueil)
    let destination = parametresUrl.get("vers");

    // On redirige l'utilisateur vers la page correspondante (.html)
    window.location.href = destination + ".html";
}
