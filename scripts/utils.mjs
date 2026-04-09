import { apiUrl, renderEvolutionAPI } from "./main.mjs";


export function showFavorites(pokeId) {
    const favorites = localStorage.getItem('favoriteList') || [];

    if (favorites.length = 0) {
        //document.querySelector('.favoriteList').innerHTML =
          //  '<p>click on the hearth to add a pokemon to your favorite!</p>';
        console.log("a");
        return;
    }
    console.log("b");
    //const favItem = favorite.map((item) => favoriteList(item));
    //document.querySelector('.favoriteList').innerHTML = favItem.join('');
}

export function addFavorite(pokeId, key = "Pokemon id") {

    const rawFavorites = localStorage.getItem('favoriteList') || [];
    const favorites = JSON.parse(rawFavorites);

    favorites.push(pokeId);

    console.log(favorites);

    localStorage.setItem("favoriteList", JSON.stringify(favorites));
    console.log(localStorage);
}

export async function changesprite(pokemon, gender) {
    const prof_img = document.querySelector(".prof_img");

    if (gender === "m") {

        prof_img.src = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;
    } else if (gender === "f") {

        let femaleSprite = pokemon.sprites.versions["generation-v"]["black-white"].animated.female_female;

        if (femaleSprite != null) {

            prof_img.src = pokemon.sprites.versions["generation-v"]["black-white"].animated.female_female;
        }
            
        return;
    }
}