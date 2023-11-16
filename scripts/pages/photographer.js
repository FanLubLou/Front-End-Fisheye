import { getPhotographerInfo } from "../utils/getPhotographerInfo.js";
import { getPhotographerMedia } from "../utils/getPhotographerMedia.js";
import { mediaFactory } from "../factories/mediaFactory.js";

//Récupération des données
//On récupère toutes les informations du photographe dont l'ID correspond
const photographerInfo = await getPhotographerInfo();
//on récupère tous les media du photographe en question
const photographerMedia = await getPhotographerMedia();
console.log(photographerMedia)


//On affiche dans la section Header

function displayphotographer(data, data_bis) {
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
      <button class="contact_button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
      <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
    </section>
  `;
    // on affiche le menu déroulant
    mainElt.innerHTML += `
    <section class="sortingout">
        <p class="sortingOut-Comment"> Trier par </p>
        <select class="dropdown" id="dropdownMenu" aria-label="Menu de tri">
          <option class="dropdown-options" value="Popularité">Popularité</option>
          <option class="dropdown-options" value="Date">Date</option>
          <option class="dropdown-options" value="Titre">Titre</option>
        </select>
    </section>
  `;
  // On va afficher les media
  mainElt.innerHTML += `
  <section class="media-section" aria - label="affichage des photographes">
  </section>  `
  ;      

  // La section media-section est déjà créée dans le HTML
  const mediaSection = document.querySelector(".media-section")
  
  // Iterate through each media item in the array
  data_bis.forEach((media) => {
    // Create a media card model object from the media array
    const mediaCardModel = mediaFactory(media);
    // Get the DOM element for the media card
    const mediaCardDOM = mediaCardModel.getMediaCardDOM();
    // Add the card to the media section
    
    mediaSection.append(mediaCardDOM);
  });
}

displayphotographer(photographerInfo, photographerMedia);




