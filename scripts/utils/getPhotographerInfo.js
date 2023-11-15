export async function getPhotographerInfo() {
    //On va chercher les données JSON
    const reponse = await fetch('./data/photographers.json');
    const { photographers } = await reponse.json();       
    // On récupère l'ID à partir d'URL (juste après le ?)
    const params = new URL(document.location).searchParams;
    //On extrait l'id sous forme d entier
    const photographerId = parseInt(params.get("id"));
    // On parcourt le tableau photographers et on renvoit la première correspondance sinon on renvoie undefined
        return photographers.find(
            (photographer) => photographer.id === photographerId,       
    );
}