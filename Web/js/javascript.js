let sonActuel = null;

document.addEventListener("click", jouerSonBP, { once: true });

function jouerSon(chemin)
{

  if (sonActuel)
  {
    sonActuel.pause();
  }
  
  sonActuel = new Audio(chemin);
  sonActuel.loop = true;
  sonActuel.play();
}

function arreterSon() {
    if (sonActuel)
    {
      sonActuel.pause();
    }
}

function jouerSonBP() 
{
    jouerSon(localStorage.getItem("son"));
}