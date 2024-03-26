const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const id = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const imageHolder = document.getElementById("image-holder");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const searchPokemon = async () => {
  const pokemon = await getResponse();
  
  if (pokemon === "") {
    alert("Pokémon not found");
    return;
  }

  pokemonName.textContent = pokemon.name.toUpperCase();
  id.textContent = "#" + pokemon.id;
  weight.textContent = `Weight: ${pokemon.weight}`;
  height.textContent = `Height: ${pokemon.height}`;

  imageHolder.innerHTML = `<img id="sprite" src=${pokemon.sprites.front_default}>`;

  const types = pokemon.types;
  const typesHTML = types.map((typeItem) => `<p class="type">${capitalizeFirstLetter(typeItem.type.name)}</p>`);
  pokemonTypes.innerHTML = "";
  for (let i = 0; i < typesHTML.length; i++) {
    pokemonTypes.innerHTML += typesHTML[i];
  }

  const stats = pokemon.stats;
  hp.textContent = stats[0].base_stat;
  attack.textContent = stats[1].base_stat;
  defense.textContent = stats[2].base_stat;
  specialAttack.textContent = stats[3].base_stat;
  specialDefense.textContent = stats[4].base_stat;
  speed.textContent = stats[5].base_stat;

};

async function getResponse() {
  const searchParam = input.value.toLowerCase();

  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchParam}`);
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    return "";
  }
  
  
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);



searchBtn.addEventListener("click", searchPokemon);