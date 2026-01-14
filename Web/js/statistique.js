// Fonction asynchrone pour récupérer et afficher les statistiques
async function remplirStats() {
    
    // 1. Récupération de la liste de toutes les liaisons (trajets)
    let responseLiaisons = await fetch("https://can.iutrs.unistra.fr/api/liaison/all");
    let liaisons = await responseLiaisons.json();
    
    // 2. Sélection de la zone HTML où on affichera les stats
    let zoneStats = document.getElementById("lesStats"); 
    
    // 3. Boucle sur chaque liaison trouvée
    for (let liaison of liaisons) {
        
        // 4. Appel à l'API pour récupérer le Chiffre d'Affaires (CA) spécifique à cette liaison
        let responseCA = await fetch(`https://can.iutrs.unistra.fr/api/liaison/${liaison.id}/chiffreAffaire`);
        let resultat = await responseCA.json();
        
        // 5. Calcul du Chiffre d'Affaires Global (Passagers + Véhicules)
        let caGlobal = resultat.passagers.chiffreAffaire + resultat.vehicules.chiffreAffaire;
        
        // 6. Création et injection du bloc HTML pour cette liaison
        // .toFixed(2) permet d'afficher les prix avec 2 chiffres après la virgule
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

// Lancement de la fonction au chargement du script
remplirStats();