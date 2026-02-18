// Fonction principale pour générer la facture
async function remplieFacture() {

    // 1. Appel à l'API pour avoir les infos générales de la réservation
    let reponse = await fetch(
        "https://can.iutrs.unistra.fr/api/reservation/" +
        sessionStorage.getItem("num")
    );
    let donneesReservation = await reponse.json();

    // 2. Remplissage des informations générales dans la facture HTML
    let articleFacture = document.getElementById("articleFacture");

    articleFacture.querySelector("#numFacture").textContent += sessionStorage.getItem("num");
    articleFacture.querySelector("#nomReservation").textContent += donneesReservation["nom"];
    articleFacture.querySelector("#traverse").textContent += donneesReservation["portDepart"] + " - " + donneesReservation["portArrivee"];
    articleFacture.querySelector("#date").textContent += donneesReservation["date"];
    articleFacture.querySelector("#depart").textContent += donneesReservation["heure"];
    articleFacture.querySelector("#bateau").textContent += donneesReservation["bateau"];

    // --- GESTION DES PASSAGERS ---

    // Dictionnaire pour regrouper les passagers par catégorie (ex: 2 adultes, 1 enfant)
    // Structure : { "Catégorie" : [Nombre, PrixTotal] }
    let dicPassagers = {};
    let totalPrixPassagers = 0;

    for (let i = 1; i <= donneesReservation["nbPassagers"]; i++) {
        // Récupération de chaque passager
        let passager = await fetch(
            "https://can.iutrs.unistra.fr/api/reservation/" +
            sessionStorage.getItem("num") +
            "/passager/" +
            i
        );

        passager = await passager.json();

        // Si la catégorie existe déjà, on ajoute +1 au nombre et on ajoute le prix
        if (passager["libelleCategorie"] in dicPassagers) {
            dicPassagers[passager["libelleCategorie"]][0] += 1;
            dicPassagers[passager["libelleCategorie"]][1] += passager["price"];
        } 
        // Sinon, on crée la nouvelle catégorie
        else {
            dicPassagers[passager["libelleCategorie"]] = [1, passager["price"]];
        }

        totalPrixPassagers += passager["price"]; //prix total des passagers
    }

    document.getElementById("sousTotalPersonnes").textContent += totalPrixPassagers + " €";

    // Affichage du tableau des passagers
    for (let cle in dicPassagers) {
        articleFacture.querySelector("#tableauPassagers").innerHTML += `
            <tr>
                <td> &nbsp; ${cle} &nbsp; </td>
                <td> &nbsp; ${dicPassagers[cle][0]} &nbsp; </td>
                <td> &nbsp; ${dicPassagers[cle][1] / dicPassagers[cle][0]} € &nbsp; </td>
                <td> &nbsp; ${dicPassagers[cle][1]} € &nbsp; </td>
            </tr>`;
    }

    // --- GESTION DES VÉHICULES ---

    // Dictionnaire pour regrouper les véhicules format libelle : [Nombre, PrixTotal]
    let dicVehicules = {};
    let totalPrixVehicules = 0;

    for (let i = 1; i <= donneesReservation["nbVehicules"]; i++) {
        // Récupération de chaque véhicule
        let vehicule = await fetch(
            "https://can.iutrs.unistra.fr/api/reservation/" +
            sessionStorage.getItem("num") +
            "/vehicule/" +
            i
        );
        vehicule = await vehicule.json();

        // On utilise "libelle" comme clé pour être cohérent avec l'affichage
        if (vehicule["libelle"] in dicVehicules) {
            dicVehicules[vehicule["libelle"]][0] += vehicule["quantite"];
            dicVehicules[vehicule["libelle"]][1] += vehicule["prix"] * vehicule["quantite"];
        } else {
            dicVehicules[vehicule["libelle"]] = [vehicule["quantite"], vehicule["prix"] * vehicule["quantite"]];
        }

        totalPrixVehicules += vehicule["prix"] * vehicule["quantite"]; //prix total des véhicules

    }

    document.getElementById("sousTotalVehicules").textContent += totalPrixVehicules + " €";

    document.getElementById("prixTotal").textContent += (totalPrixPassagers + totalPrixVehicules) + " €";

    // Affichage du tableau des véhicules
    for (let cle in dicVehicules) {
        articleFacture.querySelector("#tableauVehicules").innerHTML += `
            <tr>
                <td> &nbsp; ${cle} &nbsp; </td>
                <td> &nbsp; ${dicVehicules[cle][0]} &nbsp; </td>
                <td> &nbsp; ${dicVehicules[cle][1] / dicVehicules[cle][0]} € &nbsp; </td>
                <td> &nbsp; ${dicVehicules[cle][1]} € &nbsp; </td>
            </tr>`;
    }

    // 4. Initialisation du bouton de téléchargement
    leTelechargement();
}


// Fonction pour gérer la capture d'écran et le téléchargement PDF/Image
function leTelechargement() {
    
    // On cible l'image qui sert de bouton
    const monBouton = document.getElementById("imgTelechargement");

    monBouton.addEventListener("click", function() {
        // Changement du curseur pour indiquer le chargement
        monBouton.style.cursor = "wait";

        // Utilisation de la librairie html2canvas pour "photographier" la div #zoneFacture
        html2canvas(document.getElementById("zoneFacture"), {
            scale: 2,                        // Améliore la qualité (HD)
            useCORS: true,                   // Autorise les images externes
            backgroundColor: '#506E99'       // Couleur de fond forcée
        }).then(function(canvas) {
            
            // Création d'un lien invisible pour télécharger l'image générée
            let lien = document.createElement('a');
            lien.download = 'Facture_CAN.png';
            lien.href = canvas.toDataURL('image/png');
            
            // Clic automatique sur le lien
            lien.click();
            
            // Rétablissement du curseur normal
            monBouton.style.cursor = "pointer";
        });
    });
}

// Lancement automatique au chargement du script
remplieFacture();



