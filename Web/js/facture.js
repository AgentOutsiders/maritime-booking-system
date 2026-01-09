async function remplieFacture() {
  console.log(sessionStorage.getItem("num"));

  let reponse = await fetch(
    "https://can.iutrs.unistra.fr/api/reservation/" +
      sessionStorage.getItem("num")
  );
  let donne = await reponse.json();

  let articleFacture = document.getElementById("articleFacture");

  articleFacture.querySelector("#numFacture").textContent += sessionStorage.getItem("num");

  articleFacture.querySelector("#nomReservation").textContent += donne["nom"];

  articleFacture.querySelector("#traverse").textContent += donne["portDepart"] + " - " + donne["portArrivee"];

  articleFacture.querySelector("#date").textContent += donne["date"];

  articleFacture.querySelector("#depart").textContent += donne["heure"];

  articleFacture.querySelector("#bateau").textContent += donne["bateau"];


  let dicPassagers = {};

  for(let i=1; i<=donne["nbPassagers"]; i++)
  {
    let passager = await fetch(
    "https://can.iutrs.unistra.fr/api/reservation/" +
      sessionStorage.getItem("num") +
      "/passager/" +
      i
    );
    passager = await passager.json();



    if(passager["libelleCategorie"] in dicPassagers)
    {
      dicPassagers[passager["libelleCategorie"]][0] += 1;
      dicPassagers[passager["libelleCategorie"]][1] += passager["price"];
    }
    else
    {
      dicPassagers[passager["libelleCategorie"]] = [1, passager["price"]];
    }
  }

  for(let cle in dicPassagers)
  {
      articleFacture.querySelector("#tableauPassagers").innerHTML += `<tr><td> &nbsp; ${cle} &nbsp; </td>
                                                                      <td> &nbsp; ${dicPassagers[cle][0]} &nbsp; </td>
                                                                      <td> &nbsp; ${dicPassagers[cle][1] / dicPassagers[cle][0]} € &nbsp; </td>
                                                                      <td> &nbsp; ${dicPassagers[cle][1]} € &nbsp; </td></tr>`;
  }


  let dicVehicules = {};

  for(let i=1; i<=donne["nbVehicules"]; i++)
  {
    let vehicule = await fetch(
    "https://can.iutrs.unistra.fr/api/reservation/" +
      sessionStorage.getItem("num") +
      "/vehicule/" +
      i
    );

    vehicule = await vehicule.json();

    if(vehicule["libelleCategorie"] in dicVehicules)
    {
      dicVehicules[vehicule["libelle"]][0] += vehicule["quantite"];
      dicVehicules[vehicule["libelle"]][1] += vehicule["prix"] * vehicule["quantite"];
    }
    else
    {
      dicVehicules[vehicule["libelle"]] = [vehicule["quantite"], vehicule["prix"]*vehicule["quantite"]];
    }
  }

  for(let cle in dicVehicules)
  {
      articleFacture.querySelector("#tableauVehicules").innerHTML += `<tr><td> &nbsp; ${cle} &nbsp; </td>
        <td> &nbsp; ${dicVehicules[cle][0]} &nbsp; </td>
        <td> &nbsp; ${dicVehicules[cle][1] / dicVehicules[cle][0]} € &nbsp; </td>
        <td> &nbsp; ${dicVehicules[cle][1]} € &nbsp; </td></tr>`;
  }

  leTelechargement();

}



function leTelechargement() 
{
    
    const monBouton = document.getElementById("imgTelechargement");            // On cible l'image qui déclenche l'action

    monBouton.addEventListener("click", function()                             // On ajoute un écouteur pour détecter le clic de l'utilisateur
    {
        monBouton.style.cursor = "wait";                                       // On change l'apparence de la souris pour la mettre en chargement
        
        html2canvas(document.getElementById("zoneFacture"),                    // On utilise la bibliothèque html2canvas pour photographier la zone de la facture
        {
            scale: 2,                                                          // On augmente la qualité de l'image pour éviter le flou
            useCORS: true,                                                     // On autorise le chargement d'images provenant d'autres domaines
            backgroundColor: '#506E99'                                       // On définit la couleur de fond de l'image générée
        }).then(function(canvas) 
        {
            let lien = document.createElement('a');                            // On crée un élément de lien invisible dans la mémoire du navigateur
            lien.download = 'Facture_CAN.png';                                 // On définit le nom du fichier qui sera enregistré sur l'ordinateur
            lien.href = canvas.toDataURL('image/png');                         // On transforme le dessin du canvas en une adresse de données
            lien.click();                                                      // On simule un clic automatique sur ce lien pour lancer le téléchargement
            monBouton.style.cursor = "pointer";                                // On remet le curseur normal une fois que le traitement est terminé
        });
    });
}

remplieFacture();