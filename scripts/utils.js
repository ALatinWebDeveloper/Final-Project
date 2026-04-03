const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

/*export async function getData() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET", // or POST, PUT, DELETE
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Check if the response is OK (status 200–299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON
        console.log("API Data:", data);
    } catch (error) {
        console.error("Error fetching API:", error.message);
    }
}*/

export function renderPokeCard(pokemon) {
    const pokedex = document.getElementById("pokedex");
    const card = document.createElement("div");
    card.classList.add("pokemon_card");
    card.innerHTML = `
        <img class="favorite-icon" src="./images/icons8-favorite-48.png" alt="Favorite">
        <a href="#"><img src="${pokemon[0].url}" alt="${pokemon.name}"></a>
        <h2 class="pkm_name">${pokemon.name}</h2>
        <p>Type: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
    `;
    pokedex.appendChild(card);
}


for (let i = 1; i <= 151; i++) {
    fetch(apiUrl + i)
        .then((response => response.json())
        .then((data) => console.log(data))
        .catch(error => console.error("Error fetching data:", error)));
        console.log(data);
}