async function testConnexion() {
  let numRes = document.getElementById("numRes");
  let reponse = await fetch(
    "https://can.iutrs.unistra.fr/api/reservation/" + numRes.value
  );
  if (reponse.status == 404) {
    let erreur = document.getElementById("erreur");
    erreur.textContent = `Aucune réservation au numéro indiqué, merci de vérifier`;
  } else {
    let donne = await reponse.json();
    sessionStorage.setItem("num", numRes.value);
    sessionStorage.setItem("nbPassagers", donne["nbPassagers"]);

    redirection()
  }
}

function redirection() 
{
  let para = window.location.search;
  let urlParams = new URLSearchParams(para);
  let vers = urlParams.get("vers");
  window.location.href = vers + ".html";
}

if("num" in sessionStorage)
{
  redirection()
}


