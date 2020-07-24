require("dotenv").config();
require("../config/database");

const Pokemon = require("../models/pokemon");
const axios = require("axios");

async function index() {
  const allPokemonResponse = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );
  const allPokemonDetailsPromises = allPokemonResponse.data.results.map(
    (pokemon) => axios.get(pokemon.url)
  );
  const allPokemonDetails = await Promise.all(allPokemonDetailsPromises);
  const allPokemon = allPokemonDetails.map(
    (pokemonDetail) => pokemonDetail.data
  );
  allPokemon.forEach(async (pokemon) => {
    await Pokemon.create({
      order: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      type1: pokemon.types[0].type.name,
      type2: pokemon.types[1] ? pokemon.types[1].type.name : null,
      abilities: pokemon.abilities.map((abilityObj) => abilityObj.ability.name),
      stats: pokemon.stats.map((statObj) => ({
        name: statObj.stat.name,
        stat: statObj.base_stat,
      })),
      moves: pokemon.moves.map((moveObj) => moveObj.move.name),
    });
  });
  console.log("Finished");
}

index();
