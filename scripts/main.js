const apiUrl = "https://pokeapi.co/api/v2/pokemon/";


for (let i = 1; i <= 151; i++) {
        fetch(apiUrl + i)
            .then((response) => response.json())
            .then(data => renderPokeCard(data))
            .catch(error => console.error("Error fetching data:", error));
    }

export function renderPokeCard(pokemon) {
    const pokedex = document.getElementById("pokedex");
    const card = document.createElement("div");

    let type = pokemon.types.map(type =>
        `<p class="pkm_type ${type.type.name}">${(type.type.name).charAt(0).toUpperCase() + (type.type.name).slice(1)}</p>`);
    type = type.join('');

    card.classList.add("pokemon_card");
    card.innerHTML = `
            <img class="favorite-icon" src="./images/icons8-favorite-48.png" alt="Favorite">
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <p class="id">#${pokemon.id}</p>
            <h2 class="pkm_name">${(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)}</h2>
            ${type}
    `;
    pokedex.appendChild(card);
}

renderPokeCard();