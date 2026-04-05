const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokedex = document.getElementById("pokedex");


async function renderAPI() {

    for (let i = 1; i <= 151; i++) {
        await fetch(apiUrl + i)
            .then((response) => response.json())
            .then(data => renderPokeCard(data))
            .catch(error => console.error("Error fetching data:", error));
    }
}

async function renderProfileAPICall(pokemon_name)
{
    await fetch(apiUrl.pokemon_name)
        .then((response) => response.json())
        .then(data => renderProfile(data))
        .catch(error => console.error("Error fetching data:", error));
}



export async function renderPokeCard(pokemon) {
    const card = document.createElement("div");
    
    let type = await getType(pokemon);

    card.classList.add("pokemon_card");
    card.innerHTML = `
            <img class="favorite-icon" src="./images/icons8-favorite-48.png" alt="Favorite">
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <p class="id">#${pokemon.id}</p>
            <h2 class="pkm_name">${(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)}</h2>
            ${type}
    `;
    pokedex.appendChild(card);

    card.addEventListener("click", function () {
        renderProfile(pokemon);
    });
}


async function getType(pokemon)
{
    let type = await pokemon.types.map((type) =>
        `<p class="pkm_type ${type.type.name}">${(type.type.name).charAt(0).toUpperCase() + (type.type.name).slice(1)}</p>`);
    type = type.join('');

    return type;
}

async function getAbility(pokemon) {
    console.log(pokemon.abilities);
    let ability = await pokemon.abilities.map((ability) =>
        `<p class="ability ${ability.ability.name}">${(ability.ability.name).charAt(0).toUpperCase() + (ability.ability.name).slice(1)}</p>`);
    ability = ability.join('');

    return ability;
}

renderAPI();

async function renderProfile(pokemon) {
    const profile = document.querySelector("#pmk_profile");

    profile.classList.replace("hide", "show");

    let type = await getType(pokemon);
    let abilities = await getAbility(pokemon);

    console.log(pokemon);
    
    profile.innerHTML = `
            <div class="profile_header">
                <img class="prof_img" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                <div class="gender">
                    <img class="m" src="./images/gender_imgm.png" alt="male">
                    <img class="f" src="./images/gender_imgf.png" alt="female">
                </div>
            </div>
            <div class="profile_body">

                <h2 class="pkm_name">${pokemon.name}</h2>
                ${type}
                <h3>POKÉDEX ENTRY</h3>
                <p class="description">${pokemon.description}</p>

                <h3>ABILITIES</h3>
                <div class="abilities">
                    ${abilities}
                </div>

                <div class="pkm_carac">

                    <div class="feature">
                        <h3>HEIGHT</h3>
                        <p>0.7 m</p>
                    </div>

                    <div class="feature">
                        <h3>WEIGHT</h3>
                        <p>6.9 kg</p>
                    </div>

                    <div class="feature">
                        <h3>WEAKNESSES</h3>
                        <div class="weakness">
                            <img src="./images/type_icons/Fire type.ico" alt="fire type icon">
                            <img src="./images/type_icons/Poison type.ico" alt="posion type icon">
                            <img src="images/type_icons/Bug type.ico" alt="bug type icon">
                        </div>
                    </div>

                    <div class="feature">
                        <h3>BASE EXP</h3>
                        <p>64</p>
                    </div>
                </div>

                <h3>STATS</h3>
                <div class="stats">
                    <div class="stat">
                        <h4>HP</h4>
                        <p>86</p>
                    </div>
                    <div class="stat">
                        <h4>AT</h4>
                        <p>45</p>
                    </div>
                    <div class="stat">
                        <h4>AT</h4>
                        <p>45</p>
                    </div>
                    <div class="stat">
                        <h4>AT</h4>
                        <p>45</p>
                    </div>
                    <div class="stat">
                        <h4>AT</h4>
                        <p>45</p>
                    </div>
                    <div class="stat">
                        <h4>AT</h4>
                        <p>45</p>
                    </div>
                    <div class="stat">
                        <h4>AT</h4>
                        <p>45</p>
                    </div>
                </div>

                <h3>EVOLUTION</h3>

                <div class="evolution">
                    <img src="images/bulbasaur.jpg" alt="">
                    <p>Lvl 16</p>
                    <img src="images/bulbasaur.jpg" alt="">
                    <p>Lvl 32</p>
                    <img src="images/bulbasaur.jpg" alt="">
                </div>
                </div>
            `
}