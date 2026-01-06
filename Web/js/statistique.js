async function remplirStats()
{
    let responseLiaisons = await fetch("https://can.iutrs.unistra.fr/api/liaison/all");
    let liaisons = await responseLiaisons.json();
    let zoneStats = document.getElementById("lesStats"); 
    
    for(let liaison of liaisons) 
    {
        let responseCA = await fetch(`https://can.iutrs.unistra.fr/api/liaison/${liaison.id}/chiffreAffaire`);
        let resultat = await responseCA.json();
        let caGlobal = resultat.passagers.chiffreAffaire + resultat.vehicules.chiffreAffaire;
        
        zoneStats.innerHTML += `
            <div class="uneStats">
                <h3>Statistiques de la liaison : ${resultat.nom}</h3>
                <p class="unEspace">Chiffre d'affaires du mois de novembre pour les passagers : ${resultat.passagers.chiffreAffaire.toFixed(2)} €</p>
                <p class="unEspace">Chiffre d'affaires du mois de novembre pour les véhicules : ${resultat.vehicules.chiffreAffaire.toFixed(2)} €</p>
                <p class="unEspace">Nombre de passagers en novembre : ${resultat.passagers.nombre}</p>
                <p class="unEspace">Nombre de véhicules en novembre : ${resultat.vehicules.quantite}</p>
                <p class="unEspace">Chiffre d'affaires global du mois de novembre : ${caGlobal.toFixed(2)} €</p>
            </div>
        `;
    }
}

remplirStats();


