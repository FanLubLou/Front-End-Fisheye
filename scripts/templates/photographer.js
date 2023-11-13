//Fonction pour creation des elements DOM pour affichage dans la page d'accueil
function photographerTemplate(data) {
    // Etape 2, j'enrichis la fonction pour pouvoir récupérer toutes les données
    // On utilise le destructuting (désagrégation) afin d'extraire plusieurs propriétés de l'objet Data
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

    // Creation des elements    
        const article = document.createElement( 'article' );        
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        // Etape#2: 
        // Je créé ici un container pour l image pour gérer le cercle
        const img_container = document.createElement('div');
        img_container.className = "image-container"
        // Etape#4: 
        //Création du lien de la page unique du photographe
        //On créé un lien auquel on ajoute une classe. On lui définit l'attribut "href". href est défini avec l'id 
        const photographerCardLink = document.createElement("a");
        photographerCardLink.className += "photographer-card-link";
        photographerCardLink.setAttribute("href", `photographer.html?id=${id}`);
        photographerCardLink.setAttribute(
        "aria-label",
        `Lien vers le portfolio de ${name}`
        );
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        const id_p = document.createElement('p');
        id_p.textContent = id;
        const price_p = document.createElement('p');
        price_p.textContent = price + "€/jour";

    //Liens entre les différents éléments    
        // Etape#2:
        // img_container et h2 (le nom) sont enfants du lien
        photographerCardLink.appendChild(img_container);
        photographerCardLink.appendChild(h2);
        // Etape#2:
        // img est enfant de img_container
        img_container.appendChild(img);
        // Etape#2:
        // h2 h3 h4 price_p sont des enfants de l element article
        article.appendChild(photographerCardLink);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(price_p);   

        return (article);
    }
    return { name, picture, getUserCardDOM }
}


