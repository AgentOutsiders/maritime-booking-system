// --- Initialisation de l'observateur ---
// L'IntersectionObserver est un outil qui permet de détecter quand un élément
// devient visible à l'écran (quand on scrolle).

const cardObserver = new IntersectionObserver(
    (entries) => {
        // Cette fonction se lance à chaque fois qu'un élément surveillé entre ou sort de l'écran
        entries.forEach((entry) => {
            
            // Si l'élément est visible (intersecting = true)
            if (entry.isIntersecting) {
                // On ajoute la classe "show" pour déclencher l'animation CSS
                entry.target.classList.add("show");
            }
        });
    },
    {
        // Seuil de déclenchement (threshold) :
        // L'action se lance quand 20% de l'élément est visible (0.2)
        threshold: 0.2, 
    }
);


// --- Sélection et surveillance des éléments ---

// On sélectionne tous les éléments HTML qui ont les classes ".fromLeft" ou ".fromRight"
const elementsAAnimer = document.querySelectorAll(".fromLeft, .fromRight");

// On demande à notre observateur de surveiller chacun de ces éléments
elementsAAnimer.forEach((card) => {
    cardObserver.observe(card);
});