    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        

        // Etape 2 : Importer les datas

                // Je commente ici les données précédemment écrites à la main
                        // let photographers = [
                        //     {
                        //         "name": "EllieRoseWilkens",
                        //         "id": 1,
                        //         "city": "Paris",
                        //         "country": "France",
                        //         "tagline": "Ceci est ma data test",
                        //         "price": 400,
                        //         "portrait": "EllieRoseWilkens.jpg"
                        //     },
                        //     {
                        //         "name": "MarcelNikolic",
                        //         "id": 2,
                        //         "city": "Londres",
                        //         "country": "UK",
                        //         "tagline": "Ceci est ma data test 2",
                        //         "price": 500,
                        //         "portrait": "MarcelNikolic.jpg"
                        //     },

                        //     {
                        //         "name": "Mimi Keel",
                        //         "id": 3,
                        //         "city": "Londres",
                        //         "country": "UK",
                        //         "tagline": "Ceci est ma data test 2",
                        //         "price": 500,
                        //         "portrait": "MimiKeel.jpg"
                        //     },
                        //     {
                        //         "name": "Nabeel Bradford",
                        //         "id": 3,
                        //         "city": "Londres",
                        //         "country": "UK",
                        //         "tagline": "Ceci est ma data test 2",
                        //         "price": 500,
                        //         "portrait": "NabeelBradford.jpg"
                        //     },

                // ]
        
        // Etape 2 : Importer les datas // Récupération des données de la base de données
        
        const reponse = await fetch('./data/photographers.json');
        const photographers = await reponse.json();
        return photographers;

        //Je commente l'ancienne méthode
        // et bien retourner le tableau photographers seulement une fois récupéré
    //     return ({
    //         photographers: [...photographers, ...photographers, ...photographers]})
     
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

        console.log(photographers);
        console.log(photographers[0])
        console.log(photographers[0].name)
        
        console.log(global)

    }
    
    init();
    
