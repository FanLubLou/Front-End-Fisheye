// Pour la page principale
// Récupération des données pour affichage sur la page d'accueil
async function getPhotographers() {
    try {
        // Etape 2 : Importer les datas // Récupération des données de la base de données
        const reponse = await fetch('./data/photographers.json');
        const photographers = await reponse.json();
        return photographers;
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des informations des photographes :", error);
    }
}
    
// Affichage des aperçus des photographes sur la page d accueil du site
async function displayData(photographers) {
    // On récupère ici la section qui va accueillir les cartes des photographes
    const photographersSection = document.querySelector(".photographer_section");
    // On parcourt ici le tableau des photographes afin de créer une carte pour chacun des photographes
    photographers.forEach((photographer) => {
        // Création d'un modèle grâce à la fonction photographerTemplate
        const photographerModel = photographerTemplate(photographer);
        // Appel de la fonction UserCarDOM pour créer l'affichage de chacune des cartes
        const userCardDOM = photographerModel.getUserCardDOM();
        // Affichage dans la section .photographer_section
        photographersSection.appendChild(userCardDOM);
    });
}




    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);              
        

    }
    
    init();
    
