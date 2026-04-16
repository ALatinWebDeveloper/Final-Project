import { apiUrl, renderPokeCard } from "./main.mjs";


export function showFavoriteIcon(pokeId, favIcon) {
    const favorites = JSON.parse(localStorage.getItem('favoriteList')) || [];
    const id = String(pokeId);

    if (favorites.includes(id)) {
        favIcon.classList.add('isFavorite');
        favIcon.src = "./images/favoriteIcon.png";
    } else {
        favIcon.classList.remove('isFavorite');
        favIcon.src = "./images/notFavoriteIcon.png";
    }
}

export function showFavorites() {

    const pokeCards = document.querySelectorAll(".pokemon_card");
    
    pokeCards.forEach(element => {

        const isFavorite = element.querySelector(`.isFavorite`);

        if (isFavorite) {
            element.classList.remove("hide");

        } else {
            element.classList.add("hide");
        }
    });
}

export function toggleFavorite(pokeId, favIcon) {
    const id = String(pokeId);

    let favorites = JSON.parse(localStorage.getItem('favoriteList')) || [];
    
    const isFavorite = favorites.includes(id);

    favIcon.classList.toggle("isFavorite");
    
    if (isFavorite) {
        favorites = favorites.filter(favId => String(favId) !== id);
        favIcon.src = "./images/notFavoriteIcon.png";
    } else {

        favorites.push(id);
        favIcon.src = "./images/favoriteIcon.png";
    }

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
}

export function closeProfile(profile, mainBody) {
        
    profile.classList.remove("show", "hide");
    profile.classList.remove("profileOpened");
    mainBody.classList.remove("mainCompresed");
}

export async function searchBar(pokemonName) {

    let pokemonList = []; // Aquí guardaremos todos los nombres

    // 1. Al cargar la página, obtenemos todos los nombres de la API
    window.onload = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            pokemonList = data.results.map(p => p.name);
        } catch (error) {
            console.error("Error cargando lista:", error);
        }
    };

    const input = document.getElementById('pokemonName');
    const suggestionsContainer = document.getElementById('suggestions');

    // 2. Filtrar mientras el usuario escribe
    input.addEventListener('input', () => {
        const value = input.value.toLowerCase();
        const suggestionsList = document.querySelector(".suggestions-list");
        suggestionsContainer.innerHTML = ''; // Limpiar sugerencias anteriores

        if (value.length < 2) {
            
            suggestionsList.classList.toggle("show", "hide");
            return; // Empezar a sugerir tras 2 letras
        }

        const matches = pokemonList.filter(name => name.includes(value)).slice(0, 5); // Mostrar top 5

        matches.forEach(match => {
            const div = document.createElement('div');
            div.textContent = match;
            div.classList.add('suggestion-item');
            div.onmousedown = () => {
                input.value = match;
                suggestionsContainer.innerHTML = '';
                renderSearch(apiUrl + match); // Buscar automáticamente al hacer click
            };
            suggestionsContainer.appendChild(div);
        });
    });

    // 3. Función de búsqueda (la misma de antes, pero reutilizable)
    async function renderSearch(match)
    {
        const pokedex = document.getElementById('pokedex');

        pokedex.innerHTML = "";
        try {
            const response = await fetch(match);
            console.log(match);
            if (!response.ok) throw new Error("No encontrado");
            const data = await response.json();

            renderPokeCard(data);
        } catch (err) {
            alert("Pokémon no encontrado");
        }
    
    }

}