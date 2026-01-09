async function remplieCarte() {
  console.log(sessionStorage.getItem("num"));

  let reponse = await fetch(
    "https://can.iutrs.unistra.fr/api/reservation/" +
      sessionStorage.getItem("num")
  );
  let donne = await reponse.json();
  let zoneCarte = document.getElementById("zoneCarte");
  let zoneVehicule = document.getElementById("zoneVehicule");

    for(let i = 1; i <= donne["nbPassagers"]; i++)
    {
        let passager = await fetch(
            "https://can.iutrs.unistra.fr/api/reservation/" +
            sessionStorage.getItem("num") +
            "/passager/" +
            i
        );
        passager = await passager.json();

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
                                <p class="texteNoir grasPageEmbarquement">${donne["portDepart"]}</p>
                            </div>
                        </div>
                        <div class="ligne">
                            <p>Gare d'arrivée</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir grasPageEmbarquement">${donne["portArrivee"]}</p>
                            </div>
                        </div>
                        <div class="ligne">
                            <p>Date</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir grasPageEmbarquement">${donne["date"]}</p>
                            </div>
                        </div>
                        <div class="ligne">
                            <p>Heure départ</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir grasPageEmbarquement">${donne["heure"]}</p>
                            </div>
                        </div>
                        <div class="ligne">
                            <p>Bateau</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir grasPageEmbarquement">${donne["bateau"]}</p>
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
                                <p class="texteNoir2 grasPageEmbarquement">${sessionStorage.getItem("num")}</p>
                                <p class="texteNoir2 grasPageEmbarquement">${donne["nom"]}</p>
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
                                <p class="texteNoir2 grasPageEmbarquement">${passager["nom"]}</p>
                                <p class="texteNoir2 grasPageEmbarquement">${passager["prenom"]}</p>
                                <p class="texteNoir2 grasPageEmbarquement">${passager["libelleCategorie"]}</p>
                                <p class="texteNoir2 grasPageEmbarquement">${passager["price"]} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    for(let j = 1; j <= donne["nbVehicules"]; j++)
    {
        let vehicule = await fetch(
            "https://can.iutrs.unistra.fr/api/reservation/" +
            sessionStorage.getItem("num") +
            "/vehicule/" +
            j
        );
        vehicule = await vehicule.json();

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
                                <p class="texteNoir_2 grasPageEmbarquement2">${donne["portDepart"]}</p>
                            </div>
                        </div>
                        <div class="ligne2">
                            <p>Gare d'arrivée</p>
                            <div class="zoneBlanche2">
                                <p class="texteNoir_2 grasPageEmbarquement2">${donne["portArrivee"]}</p>
                            </div>
                        </div>
                        <div class="ligne2">
                            <p>Date</p>
                            <div class="zoneBlanche2">
                                <p class="texteNoir_2 grasPageEmbarquement2">${donne["date"]}</p>
                            </div>
                        </div>
                        <div class="ligne2">
                            <p>Heure départ</p>
                            <div class="zoneBlanche2">
                                <p class="texteNoir_2 grasPageEmbarquement2">${donne["heure"]}</p>
                            </div>
                        </div>
                        <div class="ligne2">
                            <p>Bateau</p>
                            <div class="zoneBlanche2">
                                <p class="texteNoir_2 grasPageEmbarquement2">${donne["bateau"]}</p>
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
                                <p class="texteNoir2_2 grasPageEmbarquement2">${sessionStorage.getItem("num")}</p>
                                <p class="texteNoir2_2 grasPageEmbarquement2">${donne["nom"]}</p>
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
                                <p class="texteNoir2_2 grasPageEmbarquement2">Catégorie ${vehicule["code"]}</p>
                                <p class="texteNoir2_2 grasPageEmbarquement2">${vehicule["quantite"]}</p>
                                <p class="texteNoir2_2 grasPageEmbarquement2">${vehicule["prix"]*vehicule["quantite"]} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    for (let i = 1; i <= donne["nbPassagers"]; i++) {
    new QRCode(document.getElementById(`QRCode${i}`), {
        text: sessionStorage.getItem("num"),
        width: 50,
        height: 50
    });
    }

    for (let j = 1; j <= donne["nbVehicules"]; j++) {
    new QRCode(document.getElementById(`QRCodeVehicule${j}`), {
        text: sessionStorage.getItem("num"),
        width: 50,
        height: 50
    });
    }

}
remplieCarte();