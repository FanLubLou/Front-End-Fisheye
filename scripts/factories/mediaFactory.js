export function mediaFactory(data) {
  // On destructure pour avoir accès aux différentes propriétés qui nous interessent
  const { id, photographerId, title, image, video, likes } = data;

  //La fonction va retourner l'élément DOM en fonction du format image ou video 
  //Fonction très similaire à getUserCardDOM du template 
  function getMediaCardDOM() {
    // On créé un élément article qui va contenir la carte media
    const article = document.createElement("article");
    article.className += "media-card";
    article.id = id;

    if (image) {
      article.innerHTML = `
      <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
        <img class="media-card-img" src="assets/images/${photographerId}/${image}" alt="${title}">
      </button>
      <section class="media-card-info">
        <h2 class="media-card-title">${title}</h2>
        <div class="media-like-container">
          <span class="media-like-count">${likes}</span>
          <button class="media-like-button" aria-label="Bouton de likes">
            <i class="fa-heart fa-regular"></i>
          </button>
        </div>
      </section>
    `;
    }
    if (video) {
      article.innerHTML = `
      <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
        <video class="media-card-video" title="${title}">
          <source src="assets/images/${photographerId}/${video}" type="video/mp4">
        </video>
      </button>
      <section class="media-card-info">
        <h2 class="media-card-title">${title}</h2>
        <div class="media-like-container">
          <span class="media-like-count">${likes}</span>
          <button class="media-like-button" aria-label="Bouton de likes">
          <i class="fa-heart fa-regular"></i>
          </button>
        </div>
      </section>
    `;
    }    
    return article;
  }
  
  return { getMediaCardDOM };
}
