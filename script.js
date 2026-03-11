/* GENERATEUR DE COEURS */
function creerCoeur() {
  const coeur = document.createElement("div");
  coeur.classList.add("coeur");
  coeur.innerHTML = "❤";
  coeur.style.left = Math.random() * 100 + "vw";
  coeur.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.body.appendChild(coeur);
  setTimeout(() => coeur.remove(), 6000);
}

// génère un cœur toutes les 300 ms
setInterval(creerCoeur, 300);

/* VERIFICATION */
function verifier() {
  const nom = document.getElementById("nom").value.toLowerCase();
  const motPasse = Number(document.getElementById("date").value);

  const bonNom = "prenom"; // remplace par son prénom
  const dateDebut = new Date("2023-03-14"); // votre date de début

  const aujourdHui = new Date();
  const nbJours = 1096;
  Math.floor((aujourdHui - dateDebut) / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure le jour du 14 mars

  if (nom === bonNom && motPasse === nbJours) {
    document.getElementById("contenu").classList.remove("cache");
    document.getElementById("login").classList.add("cache");
    document.getElementById("dateRelation").textContent = nbJours + " jours ❤️";
  } else {
    alert("Indice : combien de jours se sont écoulés depuis notre rencontre ?");
  }
}
