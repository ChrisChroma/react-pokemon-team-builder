const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export function getAllPokemon() {
  return fetch(`${BASE_URL}?limit=1000`, { mode: "cors" }).then((res) =>
    res.json()
  );
}

export function getPokemonDetails(idx) {
  return fetch(`${BASE_URL}${idx}`, { mode: "cors" }).then((res) => res.json());
}

export function searchPokemon() {}
