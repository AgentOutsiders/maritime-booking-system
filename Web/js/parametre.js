let sons = {
    mouette: new Audio("../sons/mouette/son1.mp3"),
    goeland: new Audio("../sons/goeland/son1.mp3"),
    cormoran: new Audio("../sons/cormoran/son1.mp3")
  };

let boutton = document.getElementById("sonsParametre");
boutton.querySelector("#mouette").addEventListener("click", function() {
    let chemin = "../sons/mouette/son1.mp3";
    localStorage.setItem("son", chemin);
    jouerSon(chemin);
});

boutton.querySelector("#goeland").addEventListener("click", function() {
    let chemin = "../sons/goeland/son1.mp3";
    localStorage.setItem("son", chemin);
    jouerSon(chemin);
});

boutton.querySelector("#cormoran").addEventListener("click", function() {
    let chemin = "../sons/cormoran/son1.mp3";
    localStorage.setItem("son", chemin);
    jouerSon(chemin);
});

boutton.querySelector("#stopSon").addEventListener("click", function() {
    localStorage.removeItem("son");
    arreterSon();
});