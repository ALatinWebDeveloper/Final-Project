import { toggleFavorite, changesprite, filterType, showFavoriteIcon, closeProfile, showFavorites, searchBar } from "./utils.mjs";

export const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const apiEvolution = "https://pokeapi.co/api/v2/evolution-chain/";
const pokedex = document.getElementById("pokedex");
const filterAll = document.querySelector(".filterAll");
const favoriteFilter = document.querySelector(".favoriteFilter");

const searchBtn = document.getElementById('searchBtn');

filterAll.addEventListener("click", () => {
    filterType("all");
});

export async function renderPokemon(pokeId) {
    try {
        
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`);
        const speciesData = await speciesRes.json();

        
        const evolutionUrl = speciesData.species.url;

        const evoRes = await fetch(evolutionUrl);
        const data = await evoRes.json();

        return data;

    } catch (error) {
        console.error("Error al obtener la evolución:", error);
    }
}

async function renderAPI() {

    for (let i = 1; i <= 151; i++) {
        await fetch(apiUrl + i)
            .then((response) => response.json())
            .then(data => renderPokeCard(data))
            .catch(error => console.error("Error fetching data:", error));
    }

    let typeBtn = await document.querySelectorAll(".pkm_type");
    typeBtn = Array.from(typeBtn);

    typeBtn.forEach(element => {
        element.addEventListener("click", function () {

            let filter_type = element.classList[1];
            filterType(filter_type);
        });
    });
}

favoriteFilter.addEventListener("click", function () {
    showFavorites();
});


export async function renderPokeCard(pokemon) {
    const card = document.createElement("div");
    
    let type = await getType(pokemon);

    card.classList.add("pokemon_card");
    card.innerHTML = `
            <img class="favorite-icon" src="./images/notFavoriteIcon.png" alt="Favorite_icon">
            <img class="card_prof_img" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <p class="id">#${pokemon.id}</p>
            <h2 class="pkm_name">${(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)}</h2>
            ${type}
    `;
    pokedex.appendChild(card);

    card.addEventListener("click", function () {
        renderProfile(pokemon, pokemon.id);
        renderPokemon(pokemon.id, pokemon);

    });
    const favbts = document.getElementsByClassName("favorite-icon");

    showFavoriteIcon(pokemon.id, favbts[pokemon.id - 1]);
}


async function getType(pokemon)
{
    let type = await pokemon.types.map((type) =>
        `<p class="pkm_type ${type.type.name}">${(type.type.name).charAt(0).toUpperCase() + (type.type.name).slice(1)}</p>`);
    type = type.join('');
    
    return type;
}

async function getAbility(pokemon) {
    let ability = await pokemon.abilities.map((ability) =>
        `<p class="ability ${ability.ability.name}">${(ability.ability.name).charAt(0).toUpperCase() + (ability.ability.name).slice(1)}</p>`);
    ability = ability.join('');

    return ability;
}

async function getStats(pokemon) {

    let stats = [];
    
    pokemon.stats.forEach(stat => {

        let statf_letter = stat.stat.name.charAt(0).toUpperCase();

        stats.push(
        `<div class="stat">
            <h4>${(statf_letter + stat.stat.name.slice(1, 2) + stat.stat.name.slice(8, 9)).toUpperCase()}</h4>
            <p>${stat.base_stat}</p>
        </div>`);

    });

    stats = stats.join("");
    return stats;
}

async function getDescription(pokemon) {
    
    let description = await renderPokemon(pokemon.id, pokemon);

    description = description.flavor_text_entries.find(element => element.language.name === "en" && element.version.name == "white");

    return description.flavor_text;
}

renderAPI();
searchBar(searchBtn);


async function renderProfile(pokemon, pokeId) {
    const profile = document.querySelector(".pkm_profile");
    const mainBody = document.querySelector("body");

    mainBody.classList.add("mainCompresed");
    profile.classList.add("profileOpened");

    profile.classList.replace("hide", "show");

    let type = await getType(pokemon);
    let abilities = await getAbility(pokemon);
    let stats = await getStats(pokemon);
    let description = await getDescription(pokemon, pokeId);
    
    profile.innerHTML = `
            <div class="profile_header">
                <img class="prof_img" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                
                <div class="gender">
                    <a class="closeBtn" href="#">X</a>
                    <img class="maleBtn" src="./images/gender_imgm.png" alt="male">
                    <img class="femBtn" src="./images/gender_imgf.png" alt="female">
                </div>
            </div>
            <div class="profile_body">

                <h2 class="pkm_name">${pokemon.name.toUpperCase()}</h2>
                ${type}
                <h3>POKÉDEX ENTRY</h3>
                <p class="description">${description}</p>

                <h3>ABILITIES</h3>
                <div class="abilities">
                ${abilities}
                </div>

                <div class="pkm_carac">

                    <div class="feature">
                        <h3>HEIGHT</h3>
                        <p>${pokemon.height} m</p>
                    </div>

                    <div class="feature">
                        <h3>WEIGHT</h3>
                        <p>${pokemon.weight} kg</p>
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
                        <p>${pokemon.base_experience}</p>
                    </div>
                </div>

                <h3>STATS</h3>
                <div class="stats">
                    ${stats}
                </div>
                </div>
            `
    
    //add events to the buttons

    const closeBtn = document.querySelector(".closeBtn");
    closeBtn.addEventListener("click", function () {
        console.log("close button clicked");
        closeProfile(profile, mainBody);
    });

    const favbtns = await document.querySelectorAll(".favorite-icon");
    favbtns.forEach(element => {
        element.addEventListener("click", () => {

            toggleFavorite(pokemon.id, favbtns[pokemon.id - 1]);
        });
    });

    const genderMbtn = await document.querySelector(".maleBtn");
    const genderFbtn = await document.querySelector(".femBtn");

    genderMbtn.addEventListener("click", function () {
        changesprite(pokemon, "m");
    });

    genderFbtn.addEventListener("click", function (){
        changesprite(pokemon, "f")
    });

    //add the profile image an animation to enter when the user clicks on a pokemon

    const prof_img = document.querySelector(".prof_img");
    prof_img.classList.add("prof_img_animation");
}