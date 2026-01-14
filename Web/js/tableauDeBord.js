// --- Initialisation ---

// 1. On récupère le champ de sélection de la date dans le HTML
const inputDate = document.getElementById('listeDate');

// On vide le champ date par défaut
inputDate.value = " ";

// On surveille les changements : quand l'utilisateur change la date, on lance la fonction
inputDate.addEventListener('change', changementDate);


// --- Fonction principale ---

async function changementDate() {
    
    // 2. Préparation de la zone d'affichage
    // On récupère la zone où on va afficher les résultats (classe "lesLiaison")
    let zoneAffichage = document.getElementsByClassName('lesLiaison')[0];
    
    // On efface le contenu précédent pour ne pas accumuler les résultats
    zoneAffichage.innerHTML = "";
    
    // 3. Récupération de la liste des liaisons (trajets disponibles)
    // "await" signifie qu'on attend que le serveur réponde avant de continuer
    let reponseLiaisons = await fetch("https://can.iutrs.unistra.fr/api/liaison/all");
    let listeLiaisons = await reponseLiaisons.json();
    
    // 4. Traitement pour chaque liaison trouvée
    for (let liaison of listeLiaisons) {
        
        // On interroge l'API pour avoir les détails de remplissage pour cette liaison et la date choisie
        // Note : On utilise inputDate.value pour avoir la date sélectionnée par l'utilisateur
        let reponseRemplissage = await fetch("https://can.iutrs.unistra.fr/api/liaison/" + liaison["id"] + "/remplissage/" + inputDate.value);
        let infoRemplissage = await reponseRemplissage.json();
        
        // Initialisation des compteurs à 0
        let totPassagers = 0;
        let occPassagers = 0;
        let totVehicules = 0;
        let occVehicules = 0;
        
        // 5. Calcul des totaux
        // On additionne les capacités et les réservations de chaque horaire
        for (let horaire of infoRemplissage) {
            totPassagers += horaire["capacitePassagers"];
            occPassagers += horaire["nbReservationPassagers"];
            
            totVehicules += horaire["capaciteVoitures"];
            occVehicules += horaire["nbReservationVoitures"];
        }
        
        // 6. Calcul des pourcentages de remplissage
        // toFixed(0) permet d'arrondir à l'entier (pas de virgule)
        let tauxPassagers = (occPassagers / totPassagers * 100).toFixed(0);
        let tauxVehicules = (occVehicules / totVehicules * 100).toFixed(0);
        
        // 7. Gestion dynamique des couleurs
        // Plus c'est plein, plus la couleur passe du vert au rouge (format RGB)
        // La première valeur (Rouge) augmente avec le taux
        // La deuxième valeur (Vert) diminue avec le taux
        let couleurPassagers = `rgba(${occPassagers / totPassagers * 255}, ${255 - occPassagers / totPassagers * 255}, 0, 1)`;
        let couleurVehicules = `rgba(${occVehicules / totVehicules * 255}, ${255 - occVehicules / totVehicules * 255}, 0, 1)`;
        
        // 8. Création et injection du code HTML
        // On ajoute le bloc HTML complet pour cette liaison dans la page
        zoneAffichage.innerHTML += `
            <div class="uneLiaison">
                <h3>Informations de la liaison : ${liaison["nom"]}</h3>
                
                <div class="remplissageHorizontale">
                    <div class="texteRemplissageHorizontale">
                        <p class="tauxPassagers">Taux de remplissage des passagers :</p>
                    </div>
                    <div class="carreNoirDate" style="background-color: ${couleurPassagers}">
                        ${tauxPassagers}%
                    </div>
                </div>

                <div class="remplissageHorizontale">
                    <div class="texteRemplissageHorizontale">
                        <p class="tauxPassagers">Taux de remplissage des véhicules :</p>
                    </div>
                    <div class="carreNoirDate" style="background-color: ${couleurVehicules}">
                        ${tauxVehicules}%
                    </div>
                </div>
            </div>`;
    }
}