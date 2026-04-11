import { apiUrl, renderPokeCard } from "./main.mjs";


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

export async function filterType(pokemonType) {

    const pokemon_card = document.querySelectorAll(".pokemon_card");
    
    pokemon_card.forEach(element => {

        const hasType = element.querySelector(`.pkm_type.${pokemonType}`);

        if (pokemonType === "all" || hasType) {
            element.classList.remove("hide");
            
        } else {
            element.classList.add("hide");
        }
    });



    /*pokedex.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(apiUrl + i)
            .then((response) => response.json())
            .then(data => {

                const types = data.types.map(type => type.type.name);
                if (types.some(tipo => tipo.includes(pokemonType))) {
                    renderPokeCard(data);
                }
            });
    };

    let typeBtn = await document.querySelectorAll(".pkm_type");
    console.log(typeBtn);
    typeBtn = Array.from(typeBtn);

    console.log(typeBtn);

    await typeBtn.forEach(element => {
        element.addEventListener("click", function () {
            console.log(element);

            let filter_type = element.classList[1];
            filterType(filter_type);
        });
    });


    console.log("element");*/
}