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



document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btnPlay");
  const btnStop = document.getElementById("stopSon");

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

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const sound = button.closest(".bruitDuSon").dataset.sound;
      playSound(sound);
    });
  });

  const savedSound = localStorage.getItem("currentSound");
  if (savedSound && sons[savedSound]) {
    currentSound = sons[savedSound];
    currentSound.play();
  }

  btnStop.addEventListener("click", () => {
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
      currentSound = null;
      localStorage.removeItem("currentSound");
    }
  });
});
