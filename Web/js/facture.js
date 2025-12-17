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
      dicVehicules[vehicule["libelle"]][0] += 1;
      dicVehicules[vehicule["libelle"]][1] += vehicule["prix"];
    }
    else
    {
      dicVehicules[vehicule["libelle"]] = [1, vehicule["prix"]];
    }
  }

  for(let cle in dicVehicules)
  {
      articleFacture.querySelector("#tableauVehicules").innerHTML += `<tr><td> &nbsp; ${cle} &nbsp; </td>
        <td> &nbsp; ${dicVehicules[cle][0]} &nbsp; </td>
        <td> &nbsp; ${dicVehicules[cle][1] / dicVehicules[cle][0]} € &nbsp; </td>
        <td> &nbsp; ${dicVehicules[cle][1]} € &nbsp; </td></tr>`;
  }

}

remplieFacture()