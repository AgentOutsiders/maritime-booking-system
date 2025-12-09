async function chargerJSON(numero) {
    // ⚠️ Remplace l’URL par celle de votre serveur
    const url = `https://votre-serveur-can.fr/api/reservation/${numero}`;

    const rep = await fetch(url);

    if (!rep.ok) {
        alert("Réservation introuvable");
        return null;
    }

    return await rep.json();
}


// Remplir UNE carte visuellement
function afficherCarte(resa, passagerOuVehicule) {

    // Partie gauche (traversée)
    document.getElementById("gareDepart").textContent =
        resa.gareDepart || resa.liaison.depart || "...";

    document.getElementById("gareArrivee").textContent =
        resa.gareArrivee || resa.liaison.arrivee || "...";

    document.getElementById("date").textContent = resa.date;
    document.getElementById("heure").textContent = resa.heure;
    document.getElementById("bateau").textContent = resa.bateau || "Breizh Nevez";

    // Partie droite (num réservation + nom)
    document.getElementById("numResa").textContent = resa.numero;
    document.getElementById("nomResa").textContent = resa.nomReservation;

    // Partie droite bas : passager OU véhicule
    if (passagerOuVehicule.type === "passager") {

        document.getElementById("typeElement").textContent = "Passager";
        document.getElementById("nomP").textContent = passagerOuVehicule.nom;
        document.getElementById("prenomP").textContent = passagerOuVehicule.prenom;
        document.getElementById("categorieP").textContent = passagerOuVehicule.codeCategorie;
        document.getElementById("prixP").textContent = passagerOuVehicule.prix + " €";

    } else {

        document.getElementById("typeElement").textContent = "Véhicule";
        document.getElementById("nomP").textContent = "-";
        document.getElementById("prenomP").textContent = "-";
        document.getElementById("categorieP").textContent = passagerOuVehicule.codeCategorie;
        document.getElementById("prixP").textContent = passagerOuVehicule.prix + " €";

    }
}



// Fonction qui récupère UNE réservation et affiche la première carte
async function afficherReservation(numero) {

    const resa = await chargerJSON(numero);
    if (!resa) return;

    // Construire une liste d’éléments (passagers + véhicules)
    let elements = [];

    resa.passagers.forEach(p => {
        elements.push({
            type: "passager",
            nom: p.nom,
            prenom: p.prenom,
            codeCategorie: p.codeCategorie,
            prix: p.prix || 0
        });
    });

    resa.vehicules.forEach(v => {
        elements.push({
            type: "vehicule",
            codeCategorie: v.codeCategorie,
            prix: v.prix || 0
        });
    });

    // Afficher la première carte
    afficherCarte(resa, elements[0]);
}


// ==== Exemple d'utilisation ====
// Quand la personne entre un numéro de réservation :
document.addEventListener("DOMContentLoaded", () => {

    const num = prompt("Numéro de réservation ?");
    if (num) {
        afficherReservation(num);
    }

});
