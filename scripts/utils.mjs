const apiUrl = "https://pokeapi.co/api/v2/pokemon/";


    for (let i = 1; i <= 151; i++) {
        fetch(apiUrl + i)
            .then((response) => response.json())
            .then(data => renderPokeCard(data))
            .catch(error => console.error("Error fetching data:", error));
    }

export async function renderPokeCard(pokemon) {
    let tipo = pokemon.types;
    console.log(tipo);

    const pokedex = document.getElementById("pokedex");
    const card = document.createElement("div");

    card.classList.add("pokemon_card");
    card.innerHTML = `
        <div class="pokemon_card">
            <a href=#"><img class="favorite-icon" src="./images/icons8-favorite-48.png" alt="Favorite"></a>
            <img src="${pokemon.sprites.front_default}" alt="${poke.name}">
            <p class="id">#${poke.id}</p>
            <h2 class="pkm_name">${poke.name}</h2>
            <p class="pkm_type grass">${poke.type}</p>
            <p class="pkm_type poison">Poison</p>
        </div>
    `;
    pokedex.appendChild(card);
}

renderPokeCard();