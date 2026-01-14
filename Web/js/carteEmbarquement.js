// Fonction principale asynchrone pour générer les cartes d'embarquement
async function remplieCarte() {
    
    // 1. Récupération du numéro de réservation stocké
    let numReservation = sessionStorage.getItem("num");
    console.log("Numéro de réservation : " + numReservation);

    // 2. Récupération des informations générales de la réservation
    let reponse = await fetch("https://can.iutrs.unistra.fr/api/reservation/" + numReservation);
    let donneesReservation = await reponse.json();

    // Sélection des zones HTML où on va injecter les cartes
    let zoneCarte = document.getElementById("zoneCarte");
    let zoneVehicule = document.getElementById("zoneVehicule");

    // --- GESTION DES PASSAGERS ---

    // Vérification si y'a des passagers
    if(donneesReservation["nbPassagers"] == 0) 
    {
        zoneCarte.innerHTML = `<p style="text-align: center;">Aucun passager pour cette réservation</p>`;
    }

    // 3. Boucle sur chaque passager pour créer sa carte
    for (let i = 1; i <= donneesReservation["nbPassagers"]; i++) {
        
        // Récupération des détails du passager spécifique (i)
        let reponsePassager = await fetch(
            "https://can.iutrs.unistra.fr/api/reservation/" +
            numReservation +
            "/passager/" +
            i
        );
        let infoPassager = await reponsePassager.json();

        // Injection du HTML pour la carte passager
        // Note : On crée un ID unique pour le QR Code (QRCode1, QRCode2, etc.)
        zoneCarte.innerHTML += `
            <div class="fondBleu"> 
                <div class="zoneGauche">
                    <div class="fondBlanc"> 
                        <img class="img1p1" src="../logo/logo_can2_sf.png" alt="Logo de la CAN">
                    </div>
                    <div class="carteEmbTexte2">
                        <div class="ligne">
                            <p>Gare de départ</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir grasPageEmbarquement">${donneesReservation["portDepart"]}</p>
                            </div>
                        </div>
                        <div class="ligne">
                            <p>Gare d'arrivée</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir grasPageEmbarquement">${donneesReservation["portArrivee"]}</p>
                            </div>
                        </div>
                        <div class="ligne">
                            <p>Date</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir grasPageEmbarquement">${donneesReservation["date"]}</p>
                            </div>
                        </div>
                        <div class="ligne">
                            <p>Heure départ</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir grasPageEmbarquement">${donneesReservation["heure"]}</p>
                            </div>
                        </div>
                        <div class="ligne">
                            <p>Bateau</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir grasPageEmbarquement">${donneesReservation["bateau"]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="zoneDroite">
                    <p class="carteEmbTexte">Carte d'embarquement</p>
                    <div class="fondBlanc2"> 
                        <div class="zoneHaut">
                            <div class="zoneHautGauche">
                                <p class="texteNoir2">Réservation</p>
                                <p class="texteNoir2">Nom</p>
                            </div>
                            <div class="zoneHautDroite">
                                <p class="texteNoir2 grasPageEmbarquement">${numReservation}</p>
                                <p class="texteNoir2 grasPageEmbarquement">${donneesReservation["nom"]}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="zoneBas">
                            <div class="zoneBasGauche">
                                <p class="texteNoir2">Passagers</p>
                                <br>
                                <p class="texteNoir2">Nom</p>
                                <p class="texteNoir2">Prénom</p>
                                <p class="texteNoir2">Catégorie</p>
                                <p class="texteNoir2">Prix</p>
                            </div>
                            <div class="zoneBasDroite">
                                <div class="zoneQRCode" id="QRCode${i}"></div>
                                <br>
                                <p class="texteNoir2 grasPageEmbarquement">${infoPassager["nom"]}</p>
                                <p class="texteNoir2 grasPageEmbarquement">${infoPassager["prenom"]}</p>
                                <p class="texteNoir2 grasPageEmbarquement">${infoPassager["libelleCategorie"]}</p>
                                <p class="texteNoir2 grasPageEmbarquement">${infoPassager["price"]} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- GESTION DES VÉHICULES ---

    // Vérification si y'a des véhicules
    if(donneesReservation["nbVehicules"] == 0) 
    {
        zoneVehicule.innerHTML = `<p style="text-align: center;">Aucun véhicule pour cette réservation</p>`;
    }

    // 4. Boucle sur chaque véhicule pour créer sa carte
    for (let j = 1; j <= donneesReservation["nbVehicules"]; j++) {
        
        // Récupération des détails du véhicule spécifique (j)
        let reponseVehicule = await fetch(
            "https://can.iutrs.unistra.fr/api/reservation/" +
            numReservation +
            "/vehicule/" +
            j
        );
        let infoVehicule = await reponseVehicule.json();

        // Injection du HTML pour la carte véhicule
        zoneVehicule.innerHTML += `
            <div class="fondBleu2"> 
                <div class="zoneGauche2">
                    <div class="fondBlanc_2"> 
                        <img class="img1p1_2" src="../logo/logo_can2_sf.png" alt="Logo de la CAN">
                    </div>
                    <div class="carteEmbTexte2_2">
                        <div class="ligne2">
                            <p>Gare de départ</p>
                            <div class="zoneBlanche2">
                                <p class="texteNoir_2 grasPageEmbarquement2">${donneesReservation["portDepart"]}</p>
                            </div>
                        </div>
                        <div class="ligne2">
                            <p>Gare d'arrivée</p>
                            <div class="zoneBlanche2">
                                <p class="texteNoir_2 grasPageEmbarquement2">${donneesReservation["portArrivee"]}</p>
                            </div>
                        </div>
                        <div class="ligne2">
                            <p>Date</p>
                            <div class="zoneBlanche2">
                                <p class="texteNoir_2 grasPageEmbarquement2">${donneesReservation["date"]}</p>
                            </div>
                        </div>
                        <div class="ligne2">
                            <p>Heure départ</p>
                            <div class="zoneBlanche2">
                                <p class="texteNoir_2 grasPageEmbarquement2">${donneesReservation["heure"]}</p>
                            </div>
                        </div>
                        <div class="ligne2">
                            <p>Bateau</p>
                            <div class="zoneBlanche2">
                                <p class="texteNoir_2 grasPageEmbarquement2">${donneesReservation["bateau"]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="zoneDroite2">
                    <p class="carteEmbTexte2">Carte d'embarquement</p>
                    <div class="fondBlanc2_2"> 
                        <div class="zoneHaut2">
                            <div class="zoneHautGauche2">
                                <p class="texteNoir2_2">Réservation</p>
                                <p class="texteNoir2_2">Nom</p>
                            </div>
                            <div class="zoneHautDroite2">
                                <p class="texteNoir2_2 grasPageEmbarquement2">${numReservation}</p>
                                <p class="texteNoir2_2 grasPageEmbarquement2">${donneesReservation["nom"]}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="zoneBas2">
                            <div class="zoneBasGauche2">
                                <p class="texteNoir2_2">Véhicules</p>
                                <br>
                                <p class="texteNoir2_2">Catégorie</p>
                                <p class="texteNoir2_2">Nombre</p>
                                <p class="texteNoir2_2">Prix</p>
                            </div>
                            <div class="zoneBasDroite2">
                                <div class="zoneQRCode2" id="QRCodeVehicule${j}"></div>
                                <br>
                                <p class="texteNoir2_2 grasPageEmbarquement2">Catégorie ${infoVehicule["code"]}</p>
                                <p class="texteNoir2_2 grasPageEmbarquement2">${infoVehicule["quantite"]}</p>
                                <p class="texteNoir2_2 grasPageEmbarquement2">${infoVehicule["prix"] * infoVehicule["quantite"]} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- GÉNÉRATION DES QR CODES ---
    // Note : On le fait APRÈS avoir créé le HTML, car les div #QRCode... doivent exister

    // Génération pour les passagers
    for (let i = 1; i <= donneesReservation["nbPassagers"]; i++) {
        new QRCode(document.getElementById(`QRCode${i}`), {
            text: numReservation,
            width: 50,
            height: 50
        });
    }

    // Génération pour les véhicules
    for (let j = 1; j <= donneesReservation["nbVehicules"]; j++) {
        new QRCode(document.getElementById(`QRCodeVehicule${j}`), {
            text: numReservation,
            width: 50,
            height: 50
        });
    }
}

// Lancement de la fonction
remplieCarte();