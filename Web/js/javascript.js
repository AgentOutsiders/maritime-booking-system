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

  document.querySelectorAll(".btnPlay").forEach(button => {
    button.addEventListener("click", () => {
      const soundName = button.closest(".bruitDuSon")?.dataset.sound;
      if (soundName && sons[soundName]) playSound(soundName);
    });
  });

  document.getElementById("stopSon")?.addEventListener("click", () => {
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
      currentSound = null;
      localStorage.removeItem("currentSound");
    }
  });

  const savedSound = localStorage.getItem("currentSound");
  if (savedSound && sons[savedSound]) {
    currentSound = sons[savedSound];
    currentSound.play();
  }
});
