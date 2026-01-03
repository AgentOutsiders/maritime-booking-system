date = document.getElementById('listeDate');
date.value = " ";
date.addEventListener('change', changementDate);

async function changementDate() {
    lesLiaison = document.getElementsByClassName('lesLiaison');
    lesLiaison[0].innerHTML = "";
    
    let reponse = await fetch("https://can.iutrs.unistra.fr/api/liaison/all");
    let donnees = await reponse.json();
    
    for (let liaison of donnees) {
        let infoLiaison = await fetch("https://can.iutrs.unistra.fr/api/liaison/" + liaison["id"] + "/remplissage/" + date["value"]);
        infoLiaison = await infoLiaison.json();
        
        let totPassagers = 0;
        let occPassagers = 0;
        let totVehicules = 0;
        let occVehicules = 0;
        
        for (let horaire of infoLiaison) {
            totPassagers += horaire["capacitePassagers"];
            occPassagers += horaire["nbReservationPassagers"];
            totVehicules += horaire["capaciteVoitures"];
            occVehicules += horaire["nbReservationVoitures"];
        }
        
        // Calcul des taux
        let tauxPassagers = (occPassagers / totPassagers * 100).toFixed(0);
        let tauxVehicules = (occVehicules / totVehicules * 100).toFixed(0);
        
        // Calcul des couleurs
        let couleurPassagers = `rgba(${occPassagers / totPassagers * 255}, ${255 - occPassagers / totPassagers * 255}, 0, 1)`;
        let couleurVehicules = `rgba(${occVehicules / totVehicules * 255}, ${255 - occVehicules / totVehicules * 255}, 0, 1)`;
        
        lesLiaison[0].innerHTML += `
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