import { getPhotographerInfo } from "../utils/getPhotographerInfo.js";
import { getPhotographerMedia } from "../utils/getPhotographerMedia.js";
import { mediaFactory } from "../factories/mediaFactory.js";


/*****************************************
* Récupération des données
*****************************************/
//On récupère toutes les informations du photographe dont l'ID correspond
const photographerInfo = await getPhotographerInfo();
//on récupère tous les media du photographe en question
const photographerMedia = await getPhotographerMedia();



  /*****************************************
* AFFICHAGE des trois SECTIONS et du footer. Definitions et appel des 4 fonctions en même temps à la fin
*****************************************/

// Definition des fonctions d affichage des trois sections séparément
function displayFirstSection(data) {
   //on destructure pour retrouver les propriétés dont nous allons avoir besoin
   const { name, city, country, tagline, portrait } = data;
   //On récupère main
   const mainElt = document.querySelector("main");
   // On affiche le header
   mainElt.innerHTML += `
   <section class="photograph-header">
     <div class="photograph-info">
       <h1 class="photograph-name">${name}</h1>
       <p class="photograph-location">${city}, ${country}</p>
       <p class="photograph-tagline">${tagline}</p>
     </div>
     <button class="contact_button" id="contactModalBtn" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
     <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
   </section>
 `;
}
function displaySecondSection() {
  //On récupère main
  const mainElt = document.querySelector("main");
  // on affiche le menu déroulant
  mainElt.innerHTML += `
  <section class="sortingout">
      <p class="sortingOut-Comment"> Trier par </p>
      <div class="custom-select">
        <select class="dropdown" id="dropdownMenu" aria-label="Menu de tri">
          <option class="dropdown-options" value="Popularité">Popularité</option>
          <option class="dropdown-options" id="date" value="Date">Date</option>
          <option class="dropdown-options" value="Titre">Titre</option>
        </select>
     </div>
  </section>
`;
}
function displayThirdSection(data) {
  //On récupère main
  const mainElt = document.querySelector("main");
  // On créé la section mediaSection
  // Ici, on créé la section differemment des deux premières car la méthode précédente ne fonctionne pas en dynamique
  const mediaSection = document.createElement("div");
  mediaSection.className = "media-section";
  // On parcourt le tableau reçu
  data.forEach((media) => {
      // Créer un modèle de cartes
      const mediaCardModel = mediaFactory(media);
      // On récupère l'élément DOM
      const mediaCardDOM = mediaCardModel.getMediaCardDOM();
      // On ajoute la carte à mediaSection
      mediaSection.append(mediaCardDOM);
      mainElt.append(mediaSection)
    });
}

//Affichage du footer
function displayPhotographFooter(object) {
  // Ici, on va avoir besoin du prix. On utilise la méthode du destructuring
  const { price } = object;
  // On constitue une NodeList en récupérant tous les elts du DOM ayant la classe media-like-count
  const mediaLikeCount = document.querySelectorAll(".media-like-count");
  // On va additionner les likes. On déclare et initialise à 0 une variable locale totalMediaLikeCount
  var totalMediaLikeCount = 0;
  // On va récupérer dans chacun des elts le texte, que l'on va transformer en nombre entier et additionner
  mediaLikeCount.forEach((media) => {
    totalMediaLikeCount += Number(media.textContent);
  });
  
  // On créé le bloc utilisant nos variables à insérer
  const photographFooter = `
    <aside class="footer">
      <div class="footer-container">
        <span class="footer-likes" id="totalLikesCount">${totalMediaLikeCount}</span>
        <i class="fa-solid fa-heart"></i>
      </div>
      <p class="footer-p">${price} € / jour</p>
    </aside>
  `;

  // On insert notre bloc dans le footer 
  const footerEl = document.querySelector("footer");
  footerEl.innerHTML = photographFooter;

}

//Définition de la fonction générale d'affichage
async function displayAll(data, databis, object) {
  displayFirstSection(data);
  displaySecondSection();
  displayThirdSection(databis);
  displayPhotographFooter(object)

}
// Appel de la fonction générale d'affichage
displayAll (photographerInfo,photographerMedia,photographerInfo)

  /*****************************************
* PARTIE TRI
*****************************************/

  /*******************
* Gestion du sens du chevron sur le menu déroulant
**********************/

// Fonction de gestion du sens du chevron pour le menu déroulant
//On récupère les éléments du DOM
const chevronDown = document.querySelector(".fa-chevron-down");
const chevronUp = document.querySelector(".fa-chevron-up");
const dropdownState = document.querySelector(".dropdown");

//On écoute le menu déroulant pour savoir s'il est déplié ou non
dropdownState.addEventListener("focus", chevronUpfct);
dropdownState.addEventListener("focus", function (event) {
  console.log('Nouvelle option sélectionnée:', event.target.value)
});
dropdownState.addEventListener("input", chevronDownfct);
dropdownState.addEventListener("change", chevronDownfct);
dropdownState.addEventListener("blur", chevronDownfct);



//On écrit les fonctions qui retire ou ajoute la classe hidden en fonction
function chevronUpfct() {
  chevronDown.classList.add("hidden")
  chevronUp.classList.remove("hidden")
}

function chevronDownfct() {
  chevronUp.classList.add("hidden")
  chevronDown.classList.remove("hidden")
}

  /*******************
* TRI _ Etape 9 : Créer le système de tri
Basé sur le cours "Manipulez les listes en JavaScript"
https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911102-manipulez-les-listes-en-javascript

**********************/

// Definition de la fonction de tri destinée à être appelée par un eventlistener
async function sortMediaSection() {
  // Récupération de la valeur choisie par l'utilisateur du <select> _ Menu déroulant
  const selectedOption = this.value;
  console.log(selectedOption)

  // Tri par popularité
  if (selectedOption == "Popularité") {
    await photographerMedia.sort((a, b) => {
      return b.likes - a.likes;
    });
  }

  // Tri par Date. A noter l'utilisation de new afin de créer des objets à comparer à partir des valeurs de date stockées
  if (selectedOption == "Date") {
    await photographerMedia.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  // Tri alphabétique. Renvoie -1 pour placer a avant b et vice et versa. 0 pour des titres égaux
  if (selectedOption == "Titre") {
    await photographerMedia.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  // Retrait de la précédente section media-section
  const mediaSection = document.querySelector(".media-section");
  mediaSection.remove();

  // Nouvel affichage en fonction du nouveau tableau photographerMedia
    displayThirdSection(photographerMedia);

}

//Appel de la fonction de tri sur l'evenement "change"
var selectElement = document.querySelector(".custom-select select");
selectElement.addEventListener("change", function() {
  var selectedOption = selectElement.options[selectElement.selectedIndex].value;
  console.log("Option choisie :", selectedOption);
});

console.log("coucou")
const dropdownMenu = document.querySelector(".custom-select select");
dropdownMenu.addEventListener("change", sortMediaSection);
dropdownMenu.addEventListener("change", function (event) {
  console.log('Nouvelle option sélectionnée:', event.target.value)
});

  /*******************
* MODALE _ Etape 6 : Créer la modale de contact
**********************/

/*******************
Basé sur le cours "Manipulez les listes en JavaScript"
https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911102-manipulez-les-listes-en-javascript

**********************/

//Récupération des élts du DOM
//Ici pour avoir l'information du clic déclenchant l'apparition de la modale
const ModalBtn = document.getElementById("contactModalBtn");

//Appel de la fonction launchModal sur une écoute d'evt sur le bouton contactez-moi
ModalBtn.addEventListener("click", displayModalContact);

//Déclaration de la fonction destinée à insérer le nom dans la modale
function insertPhotographName(object) {
  // On récupère le nom par la méthode du Destructuring
  const { name } = object;

  // On récupère l elt DOM à alimenter
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = `Contactez-moi<br>${name}`;
}

//APPEL de la fonction d'insertion du nom
insertPhotographName(photographerInfo);

function consolLogModalFormData(event) {
  // On empêche le comportement standard de la fonction
  event.preventDefault();

  // On récupère nos données que l'on stocke dans différentes constantes
  const modalForm = document.getElementById("modalForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // On envoie les données les données récupérées par le biais d'un objet
  console.log({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    message: message.value,
  });
  //Je vide les données pour laisser les champs libres pour une nouvelle saisie
  modalForm.reset();
  //On ferme la modale
  closeModalContact();
}

//Appel de la fonction d'envoi des données à travers un EventListener
const modalForm = document.getElementById("modalForm");
modalForm.addEventListener("submit", consolLogModalFormData);

//Appel de la fonction de fermeture de la modale de contact
const modalCloseBtn = document.getElementById("modalCloseBtn");
modalCloseBtn.addEventListener("click", closeModalContact)

  /*******************
* MODALE _ Etape 7 : Gérer les médias de la Lightbox
**********************/

/********************/
// Fonction d'affichage des medias dans la ligthbox-modal_Définition et appel
/********************/

//On déclare et on initialise la variable currentLightboxMediaId à 0
// Cette variable va nous permettre de faire fonctionner les boutons droite_gauche de notre carroussel plus tard
let currentLightboxMediaId = 0;

//Definition de la fonction d'affichage des medias dans la lightbox-modal à partir de son ID
async function renderLightBoxMedia(mediaId) {

  // Ici on va rechercher dans le tableau photographerMedia, le media qui correspond à l'id mediaId
  const mediaObject = await photographerMedia.find(
    // Faut il utiliser == ou ===? Attention à la conversion
    (media) => media.id == mediaId
  );

  // On récupère les éléments qui nous interessent par la méthode du Destructuring
  const { title, photographerId, image, video } = mediaObject;

  // On récupère l'elt DOM pour afficher notre media au bon endroit
  const lightboxMedia = document.getElementById("lightboxMedia");

  // En fonction du format image ou video, on insert un bloc différent
  if (image) {
    lightboxMedia.innerHTML = `
      <img class="lightbox-img" src="assets/images/${photographerId}/${image}" alt="${title}">
      <figcaption class="lightbox-caption">${title}</figcaption>
  `;
  }

  if (video) {
    lightboxMedia.innerHTML = `
      <video class="lightbox-video" title="${title}" controls>
        <source src="assets/images/${photographerId}/${video}" type="video/mp4">
      </video>
      <figcaption class="lightbox-caption">${title}</figcaption>
  `;
  }
  // On met à jour la variable currentMediaId variable with the current lightbox media id
  currentLightboxMediaId = mediaId;
}
//Appel de la fonction d'affichage des medias dans la lightbox-modal sur écoute d'un clic sur l'image
const mediaCardButtons = document.querySelectorAll(".media-card-button");
  mediaCardButtons.forEach((card) => {
    card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      renderLightBoxMedia(mediaId);
      displayModalMedia();
    });
  });

//Appel de la fonction Modal du media sur écoute du bouton de fermeture
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  lightboxCloseBtn.addEventListener("click", () => {
    closeModalMedia();
  });

  // displayModalMedia() et closeModalMedia() ont été définies dans contactForm.js

/********************/
// Bouton suivant du caroussel_Définition et appel
/********************/

//Definition de la fonction amenant le caroussel au media suivant
function nextLightBoxMedia() {
  // Ici on cherche à savoir où se trouve le media actuel dans le tableau photographerMedia
  //afin de savoi si on passe au suivant ou si on revient au premier
  const currentIndex = photographerMedia.findIndex(
    (media) => media.id == currentLightboxMediaId
  );

  // Si le media actuel n'est pas le derneir, on affiche l'elt suivant
  if (currentIndex < photographerMedia.length - 1) {
    const nextMediaId = photographerMedia[currentIndex + 1].id;
    renderLightBoxMedia(nextMediaId);
    // Si on est le dernier element, on recommence depuis le début
  } else {
    const nextMediaId = photographerMedia[0].id;
    renderLightBoxMedia(nextMediaId);
  }
}
//Appel à la fonction affichant l'elt suivant par l'ecoute du bouton de la flêche de droite
const nextBtn = document.getElementById("lightboxNextBtn");
nextBtn.addEventListener("click", nextLightBoxMedia);

/********************/
// Bouton précédent du caroussel _ Définition et appel
/********************/

//Definition de la fonction amenant le carouse au media précédant
function previousLightBoxMedia() {
  // Ici on cherche à savoir où se trouve le media actuel dans le tableau photographerMedia
  //afin de savoir si on passe au précédent ou si on revient au dernier
  const currentIndex = photographerMedia.findIndex(
    (media) => media.id == currentLightboxMediaId
  );

  // Si on n'est pas rendu au premier, on revient au précédent
  if (currentIndex > 0) {
    const previousMediaId = photographerMedia[currentIndex - 1].id;
    renderLightBoxMedia(previousMediaId);
    // Si on est rendu au premier, le bouton nous amènera au dernier media du tableau
  } else {
    const previousMediaId = photographerMedia[photographerMedia.length - 1].id;
    renderLightBoxMedia(previousMediaId);
  }
}

//Appel à la fonction affichant l element précédent par l'ecoute du bouton de la flêche de gauche
const previousBtn = document.getElementById("lightboxPreviousBtn");
previousBtn.addEventListener("click", previousLightBoxMedia);

  /*******************
* LIKES _ Etape 8 : Créer la modale de contact _ Definition et appel
**********************/

//Defintion de la fonction
//La fonction met à jour le nombre de likes ainsi que l'icone (plein ou vide)
function renderLikes() {
  //On récupère l'elt span
  const mediaLikeSpanElt = this.parentNode.firstElementChild;
  console.log(mediaLikeSpanElt);
  //On récupère l'icône
  const mediaLikeIconElt = this.firstElementChild;
  console.log(mediaLikeIconElt)
  //Si le coeur était initialement vide
  if (mediaLikeIconElt.classList.contains("fa-regular")) {
    //On récupère le chiffre contenu dans le span, on le convertit en nombre et le stocke dans une nouvelle variable
    let mediaLikeCount = Number(mediaLikeSpanElt.textContent);
    // On incrémente la variable
    mediaLikeCount++;
    // On place cette nouvelle valeur dans notre variable
    mediaLikeSpanElt.textContent = mediaLikeCount;
    // On passe du coeur vide au coeur plein
    mediaLikeIconElt.classList.replace("fa-regular", "fa-solid");
    //On relance l'affichage du footer
    displayPhotographFooter(photographerInfo);
  } //Sinon, on décrémente en utilisant la même logique
    else if (mediaLikeIconElt.classList.contains("fa-solid")) {
    let mediaLikeCount = Number(mediaLikeSpanElt.textContent);
    mediaLikeCount--;
    mediaLikeSpanElt.textContent = mediaLikeCount;  
    mediaLikeIconElt.classList.replace("fa-solid", "fa-regular");
    displayPhotographFooter(photographerInfo);
  }
}

//Appel de la fonction sur cliques sur les boutons "media-like-button"
const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", renderLikes);
  });




function displaySelect() {
  var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");


  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
}

displaySelect();



