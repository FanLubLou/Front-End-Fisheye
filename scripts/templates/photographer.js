function photographerTemplate(data) {
    // Etape 2, j'enrichis la fonction pour pouvoir récupérer toutes les données
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const img = document.createElement('img');
        img.setAttribute("src", picture)

        // Etape#2: 
        // Je créé ici un container pour l image pour gérer le cercle
        const img_container = document.createElement('div');
        img_container.className="image-container"

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
        
        

        // Etape#2:
        // img_container est enfant de l article
        article.appendChild(img_container);
        // Etape#2:
        // img est enfant de img_container
        img_container.appendChild(img);

        // article.appendChild(id_p);
        // article.appendChild(tagline_p);
        // article.appendChild(price_p);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(price_p);
        

        return (article);
    }
    return { name, picture, getUserCardDOM }
}