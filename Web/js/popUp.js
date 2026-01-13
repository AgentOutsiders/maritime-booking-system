const popUpHaut = document.getElementById('popUpHaut');                // On récupère l'élément HTML de la pop-up grâce à son identifiant
window.addEventListener('scroll', function()                           // On écoute l'événement de scroll
{
    let scrollPosition = window.scrollY;                               // On stocke la position actuelle du scroll en pixels depuis le haut de la page
    if (scrollPosition > 300)                                          // On test si l'utilisateur a scrollé plus de 300 pixels vers le bas
    {
        popUpHaut.classList.add('visible');                            // Si c'est le cas, on ajoute la classe visible pour afficher la pop-up
    } 
    else 
    {
        popUpHaut.classList.remove('visible');                         // Sinon, on retire la classe visible pour cacher la pop-up
    }
});


let bouton = document.getElementById("flecheRetour");                  // On récupère l'élément HTML du bouton flèche grâce à son identifiant
bouton.addEventListener("click", function()                            // On écoute l'événement de clic sur le bouton
{
    window.scrollTo({                                                  // On fait défiler la page jusqu'en haut
        top: 0,                                                        // On définit la position de destination, c'est à dire tout en haut
        behavior: 'smooth'                                             // On fait un défilement fluide et animé
    });
});

