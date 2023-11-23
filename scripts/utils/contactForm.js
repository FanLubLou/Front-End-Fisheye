// Les modifications apportées ici sont dans le cadre l'étape #6
function displayModal() {
    //Je récupère l'élément DOM bground
    const bGround = document.querySelector(".bground");
    //On les affiche
    bGround.style.display = "block";
    
    //Met à jour les attributs pour l'accessibilité

    //Et pour mettre à jour son attribut, on récupère les elts du DOM
    const modal = document.getElementById("contactModal");
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    // En mettant aria-hidden sur fales, on indique que la modale est visible
    modal.setAttribute("aria-hidden", "false");
    // A l'inverse, on indique que les autres blocs ne sont pas visibles
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    footer.setAttribute("aria-hidden", "true");
}

function closeModal() {
    //On récupère l'elt DOM bground pour retirer son affichage
    const bGround = document.querySelector(".bground");
    bGround.style.display = "none";

    //Et pour mettre à jour son attribut, on récupère les elts du DOM
    const modal = document.getElementById("contactModal");
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    //Met à jour les attributs pour l'accessibilité
    // En mettant aria-hidden sur true, on indique que la modale n'est plus visible
    modal.setAttribute("aria-hidden", "true");
    // A l'inverse, on indique que les autres blocs sont visibles
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    footer.setAttribute("aria-hidden", "false");
}

function displayModalMedia() {
    //Je récupère mes éléments à afficher
    const bGroundWhite = document.querySelector(".bGroundWhite");
    const modalMedia = document.getElementById("lightboxModal");
    //On les affiche
    bGroundWhite.style.display = "flex";

    //Met à jour les attributs pour l'accessibilité

    //Et pour mettre à jour son attribut, on récupère les elts du DOM
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    // En mettant aria-hidden sur fales, on indique que la modale est visible
    modalMedia.setAttribute("aria-hidden", "false");
    // A l'inverse, on indique que les autres blocs ne sont pas visibles
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    footer.setAttribute("aria-hidden", "true");
}

function closeModalMedia() {
    //Je récupère mes éléments à afficher
    const bGroundWhite = document.querySelector(".bGroundWhite");
    const modalMedia = document.getElementById("lightboxModal");
    //On les affiche
    bGroundWhite.style.display = "none";
    //Met à jour les attributs pour l'accessibilité

    //Et pour mettre à jour son attribut, on récupère les elts du DOM
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    // En mettant aria-hidden sur fales, on indique que la modale est visible
    modalMedia.setAttribute("aria-hidden", "true");
    // A l'inverse, on indique que les autres blocs ne sont pas visibles
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    footer.setAttribute("aria-hidden", "false");
}