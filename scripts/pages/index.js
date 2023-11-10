    async function getPhotographers() {
        try {
            // Etape 2 : Importer les datas // Récupération des données de la base de données
            const reponse = await fetch('./data/photographers.json');
            const photographers = await reponse.json();
            return photographers;
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des photographes :", error);
        }
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);

        // console.log(photographers);
        // console.log(photographers[0])
        // console.log(photographers[0].name)
        
        // console.log(global)

    }
    
    init();
    
