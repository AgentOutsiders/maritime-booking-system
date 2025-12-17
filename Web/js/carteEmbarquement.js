async function remplieCarte() {
  console.log(sessionStorage.getItem("num"));

  let reponse = await fetch(
    "https://can.iutrs.unistra.fr/api/reservation/" +
      sessionStorage.getItem("num")
  );
  let donne = await reponse.json();
  let zoneCarte = document.getElementById("zoneCarte");

  for(let i = 1; i<=donne["nbPassagers"]; i++)
  {
    let passager = await fetch(
    "https://can.iutrs.unistra.fr/api/reservation/" +
      sessionStorage.getItem("num") +
      "/passager/" +
      i);
    passager = await passager.json();

    zoneCarte.innerHTML += `<div class="fondBleu"> 
                <div class="zoneGauche">
                    <div class="fondBlanc"> 
                        <img class="img1p1" src="../logo/logo_can2_sf.png" alt="Logo de la CAN">
                    </div>

                    <div class="carteEmbTexte2">
                        <div class="ligne">
                            <p>Gare de départ</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir">${donne["portDepart"]}</p>
                            </div>
                        </div>

                        <div class="ligne">
                            <p>Gare d'arrivée</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir">${donne["portArrivee"]}</p>
                            </div>
                        </div>

                        <div class="ligne">
                            <p>Date</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir">${donne["date"]}</p>
                            </div>
                        </div>

                        <div class="ligne">
                            <p>Heure départ</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir" >${donne["heure"]}</p>
                            </div>
                        </div>

                        <div class="ligne">
                            <p>Bateau</p>
                            <div class="zoneBlanche">
                                <p class="texteNoir">${donne["bateau"]}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Zone droite -->
                <div class="zoneDroite">
                    <p class="carteEmbTexte"> Carte d'embarquement</p>
                    <div class="fondBlanc2"> 
                        <div class="zoneHaut">
                            <div class="zoneHautGauche">
                                <p class="texteNoir2">Réservation</p>
                                <p class="texteNoir2">Nom</p>
                            </div>
                            <div class="zoneHautDroite">
                                <p class="texteNoir2">${sessionStorage.getItem("num")}</p>
                                <p class="texteNoir2">${donne["nom"]}</p>
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
                                <p class="texteNoir2">${i}</p>
                                <br>
                                <p class="texteNoir2" id="nomP">${passager["nom"]}</p>
                                <p class="texteNoir2" id="prenomP">${passager["prenom"]}</p>
                                <p class="texteNoir2" id="categorieP">${passager["libelleCategorie"]}</p>
                                <p class="texteNoir2" id="prixP">${passager["price"]} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
  }
}
remplieCarte();
