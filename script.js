/* GENERATEUR DE COEURS */

function creerCoeur() {
  const coeur = document.createElement("div");
  coeur.classList.add("coeur");

  coeur.innerHTML = "❤";

  coeur.style.left = Math.random() * 100 + "vw";
  coeur.style.animationDuration = Math.random() * 3 + 3 + "s";

  document.body.appendChild(coeur);

  setTimeout(() => {
    coeur.remove();
  }, 6000);
}

/* pluie normale de coeurs */
setInterval(creerCoeur, 400);

/* EXPLOSION DE COEURS */

function explosionCoeurs() {
  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      creerCoeur();
    }, i * 15);
  }
}

/* VERIFICATION */

function verifier() {
  const nom = document.getElementById("nom").value.toLowerCase();
  const motPasse = document.getElementById("password").value;

  const bonNom = "sarah";
  const bonNom1 = "sarah ";
  const bonMotDePasse = "1096";

  if ((nom === bonNom || nom === bonNom1) && motPasse === bonMotDePasse) {
    explosionCoeurs();

    setTimeout(() => {
      document.getElementById("contenu").classList.remove("cache");
      document.getElementById("login").classList.add("cache");
    }, 2000);
  } else {
    alert(
      "Combien de jours ce sont écoulés, (attention 2024 est une anné bissextile).",
    );
  }
}
