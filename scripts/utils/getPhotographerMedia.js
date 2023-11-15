
//Fonction très très semblable à getPhotographerInfo()
export async function getPhotographerMedia() {
    //On va chercher les données JSON
    const reponse = await fetch('./data/photographers.json');
    const { media } = await reponse.json();           
    // On récupère l'ID à partir d'URL (juste après le ?)
    const params = new URL(document.location).searchParams;
    //On extrait l'id sous forme d entier
    const photographerId = parseInt(params.get("id"));
    // On parcourt le tableau photographers et on renvoie un tableau contenant uniquement les 
    // éléments de média qui appartiennent au photographe spécifié par l'ID extrait de l'URL
        return media.filter(
            (mediaItem) => mediaItem.photographerId === photographerId,       
    );    
}