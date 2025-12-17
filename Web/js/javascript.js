// Animation des cartes au scroll (laisse tel quel)
const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.2, 
    }
);

document.querySelectorAll(".fromLeft, .fromRight").forEach((card) => {
    cardObserver.observe(card);
});



document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".btnPlay");
  const btnStop = document.getElementById("stopSon");

  // 👉 Si on n’est PAS sur la page paramètres, on quitte tranquillement
  if (buttons.length === 0 && !btnStop) {
    return;
  }

  let currentSound = null;

  const sons = {
    mouette: new Audio("../sons/mouette/son1.mp3"),
    goeland: new Audio("../sons/goeland/son1.mp3"),
    cormoran: new Audio("../sons/cormoran/son1.mp3")
  };

  function playSound(nom) {
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }

    currentSound = sons[nom];
    currentSound.play();
    localStorage.setItem("currentSound", nom);
  }

  // Boutons PLAY
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const parent = button.closest(".bruitDuSon");
      if (!parent) return;

      const soundName = parent.dataset.sound;
      if (sons[soundName]) {
        playSound(soundName);
      }
    });
  });

  // Relancer le son sauvegardé
  const savedSound = localStorage.getItem("currentSound");
  if (savedSound && sons[savedSound]) {
    currentSound = sons[savedSound];
    currentSound.play();
  }

  // Bouton STOP (uniquement s’il existe)
  if (btnStop) {
    btnStop.addEventListener("click", function () {
      if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
        currentSound = null;
        localStorage.removeItem("currentSound");
      }
    });
  }

});
