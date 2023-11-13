//Etape 5
//Fonction pour creation des elements DOM pour affichage des infos des photographes dans des pages spécifiques
//Fonction créée sur le module de la fonction précédente photographerTemplate(Data)
function photographerProfileFactory(data) {
    // On utilise le destructuting (désagrégation) afin d'extraire plusieurs propriétés de l'objet Data
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    // On créé la fonction getPhotographerCardDOM à l'image de getUserCardDOM
    function getPhotographerCardDOM() {
            // Création des éléments
                //On créé un l'element article
                const article = document.createElement("article");
                //Auquel on ajoute la classe photographer-card
                article.className += "photographer-card";

                //Création du lien de la page unique du photographe
                //On créé un lien auquel on ajoute une classe. On lui définit l'attribut "href". href est défini avec l'id 
                const photographerCardLink = document.createElement("a");
                photographerCardLink.className += "photographer-card-link";
                photographerCardLink.setAttribute("href", `photographer.html?id=${id}`);
                photographerCardLink.setAttribute(
                "aria-label",
                `Lien vers le portfolio de ${name}`
                );

                // Creation de la photo
                const photographerImg = document.createElement("img");
                photographerImg.className += "photographer-img";
                photographerImg.setAttribute("src", picture);
                photographerImg.setAttribute("alt", `Photo de ${name}`);

                // Creation du texte affichant le nom du photographe
                const photographerName = document.createElement("h2");
                photographerName.className += "photographer-name";
                photographerName.textContent = name;

                // Creation du texte donnant le lieu de vie photographe
                const photographerLocation = document.createElement("p");
                photographerLocation.className += "photographer-location";
                photographerLocation.textContent = `${city}, ${country}`;

                // Creation du slogant du photographe
                const photographerTagline = document.createElement("p");
                photographerTagline.className += "photographer-tagline";
                photographerTagline.textContent = tagline;

                // Creation de la carte affichant le prix du photographe
                const photographerRate = document.createElement("p");
                photographerRate.className += "photographer-rate";
                photographerRate.textContent = `${price} € / jour`;  
            
        
            //On rattache les différents éléments entre eux
                // On rattache l'img et le nom au lien
                photographerCardLink.appendChild(photographerImg);
                photographerCardLink.appendChild(photographerName);

                // Append the link, location, tagline, and rate to the article element
                article.appendChild(photographerCardLink);
                article.appendChild(photographerLocation);
                article.appendChild(photographerTagline);
                article.appendChild(photographerRate);

                // Return the article element
                return article;
            }

            // Returning an object with the name and picture properties and the getPhotographerCardDOM function
            return { name, picture, getPhotographerCardDOM };
            }