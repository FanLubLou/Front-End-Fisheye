import { getPhotographerInfo } from "../utils/getPhotographerInfo.js";
import { getPhotographerMedia } from "../utils/getPhotographerMedia.js";
import { mediaFactory } from "../factories/mediaFactory.js";


/*****************************************
* Récupération des données
*****************************************/
//On récupère toutes les informations du photographe dont l'ID correspond
const photographerInfo = await getPhotographerInfo();
//on récupère tous les media du photographe en questdiion
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
      <div class="filter" id="filter">
        <button class="closed-filter" id="closed-filter">
          <span id="ToBeUpdated">Popularité</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="open-filter hidden" id="open-filter">
          <div class="PopularAndChevron">
            <button class="filterPopular" role="menuitem">
              <div class="text-popular">Popularité</div>
            </button>  
            <button class="chevronClose">
              <i class="fa-solid fa-chevron-up"></i>
            </button>
          </div>  
          <button class="filterDate" role="menuitem">
            <div class="text-date">Date</div>
          </button>
          <button class="filterTitle" role="menuitem">
            <div class="text-title">Titre</div>
          </button>
        </div>
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
async function displayAll(data, databis,selectedOption, object) {
  displayFirstSection(data);
  displaySecondSection(selectedOption);
  displayThirdSection(databis);
  displayPhotographFooter(object)

}
// Appel de la fonction générale d'affichage
displayAll (photographerInfo,photographerMedia,"Popularité",photographerInfo)

  /*****************************************
* PARTIE TRI
*****************************************/

  /*******************
* Gestion des fonctions du filtre
**********************/
const cFilter = document.getElementById("closed-filter");
const oFilter = document.getElementById("open-filter");
const filterDate = document.querySelector(".filterDate");
const filterTitle = document.querySelector(".filterTitle");
const chevronClose = document.querySelector(".chevronClose");
const filterPopular = document.querySelector(".filterPopular");


//Defintion de openFilter()
function openFilter() {
  cFilter.classList.add("hidden");
  oFilter.classList.remove("hidden");
      

}
//Appel de openFilter()
cFilter.addEventListener("click", openFilter);


//Defintion de closeFilter()
function closeFilter() {
  oFilter.classList.add("hidden");
  cFilter.classList.remove("hidden");
}

//Appel de la fonction de closeFilter si on clique sur le chevron
chevronClose.addEventListener("click", closeFilter);
//Appel de la fonction de closeFilter si un clic est effectué en dehors du bouton et du contenu
document.addEventListener("click", function (event) {
  const isClickInside = cFilter.contains(event.target) || oFilter.contains(event.target);
  
  if (!isClickInside) {
    closeFilter();
  }
});

// Defintion de la foncton filterDateAndClose()
async function filterDateAndClose() {

  const ToBeChanged = document.getElementById("closed-filter");
  const spans = ToBeChanged.getElementsByTagName("span");
  spans[0].textContent = "Date";
  sortMediaSection("Date");
  closeFilter();
    

}
//Appel de la fonction filterDateAndClose
filterDate.addEventListener("click", filterDateAndClose)

// Defintion de la foncton filterTitleAndClose()
function filterTitleAndClose() {
  
  const ToBeChanged = document.getElementById("closed-filter");
  const spans = ToBeChanged.getElementsByTagName("span");
  spans[0].textContent = "Titre";
  sortMediaSection("Titre");
  closeFilter();
}
//Appel de la fonction filterTitleAndClose
filterTitle.addEventListener("click", filterTitleAndClose)

// Defintion de la foncton filterPopularAndClose()
function filterPopularAndClose() {
  
  const ToBeChanged = document.getElementById("closed-filter");
  const spans = ToBeChanged.getElementsByTagName("span");
  spans[0].textContent = "Popularité";
  sortMediaSection("Popularité")
  closeFilter();
  
}
//Appel de la fonction filterTitleAndClose
filterPopular.addEventListener("click", filterPopularAndClose)

  /*******************
* TRI _ Etape 9 : Créer le système de tri
Basé sur le cours "Manipulez les listes en JavaScript"
https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911102-manipulez-les-listes-en-javascript

**********************/

// Definition de la fonction de tri destinée à être appelée par un eventlistener


async function sortMediaSection(selectedOption) {
  
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

  //Remise en place des addEventListener étant donné que les sections ont été retirées puis remises en place
  
  //Appel de la fonction sur cliques sur les boutons "media-like-button"
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", renderLikes);
  });

  //Appel de la fonction d'affichage des medias dans la lightbox-modal sur écoute d'un clic sur l'image
  const mediaCardButtons = document.querySelectorAll(".media-card-button");
  mediaCardButtons.forEach((card) => {
    card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      renderLightBoxMedia(mediaId);
      displayModalMedia();
      });
  });
  
}

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
      <video controls autoplay class="lightbox-video" title="${title}" controls>
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

/********************/
// Ajout de fonctionnalités de navigation au clavier dans la lightbox 
// Contraintes imposées en note de réunion
/********************/

// On écoute le clavier
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      previousLightBoxMedia();
      break;
    case "ArrowRight":
      nextLightBoxMedia();
      break;
    case "Escape":
      closeModalMedia();
      // Si jamais c'est le formulaire est ouvert, la touche échappe la fermera
      closeModalContact();
      break;
    //La touche espace semble avoir le même effet que la flêche de droite, je l'empêche
    case "Space":
      event.preventDefault();
      event.stopPropagation();
      break;
  }
});




  /*******************
* LIKES _ Etape 8 : Créer la modale de contact _ Definition et appel
**********************/

//Defintion de la fonction
//La fonction met à jour le nombre de likes ainsi que l'icone (plein ou vide)
function renderLikes() {
  //On récupère l'elt span
  const mediaLikeSpanElt = this.parentNode.firstElementChild;
  
  //On récupère l'icône
  const mediaLikeIconElt = this.firstElementChild;
  
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




