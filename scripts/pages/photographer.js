import { getPhotographerInfo } from "../utils/getPhotographerInfo.js";
import { getPhotographerMedia } from "../utils/getPhotographerMedia.js";
import { mediaFactory } from "../factories/mediaFactory.js";

//Récupération des données
//On récupère toutes les informations du photographe dont l'ID correspond
const photographerInfo = await getPhotographerInfo();
//on récupère tous les media du photographe en question
const photographerMedia = await getPhotographerMedia();
console.log(photographerMedia)

  /*****************************************
* AFFICHAGE des SECTIONS
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
      <div class="select_container">
        <select class="dropdown" id="dropdownMenu" aria-label="Menu de tri">
          <option class="dropdown-options" value="Popularité">Popularité</option>
          <option class="dropdown-options" value="Date">Date</option>
          <option class="dropdown-options" value="Titre">Titre</option>
        </select>          
        <i class="fa-solid fa-chevron-down"></i>
        <i class="fa-solid fa-chevron-up hidden"></i>          
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

//Définition de la fonction générale d'affichage
async function displayAll(data, databis) {
  displayFirstSection(data);
  displaySecondSection();
  displayThirdSection(databis); 
  
}
// Appel de la fonction générale d'affichage
displayAll (photographerInfo,photographerMedia)

  /*****************************************
* PARTIE TRI
*****************************************/

  /*******************
* Gestion du sens du chevron
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
  console.log("selectedOption",selectedOption)

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
const dropdownMenu = document.getElementById("dropdownMenu");
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
ModalBtn.addEventListener("click", displayModal);

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
  // On empêche le comporte standard de la fonction
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
  closeModal();
}

//On appelle la fonction d'envoi des données à travers un EventListener
const modalForm = document.getElementById("modalForm");
  modalForm.addEventListener("submit", consolLogModalFormData);