const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api/pokemon";

export async function getAllPokemon() {
  const res = await fetch(`${BASE_URL}/pokemon`, { mode: "cors" });
  return res.json();
}

export async function getPokemonDetails(idx) {
  const res = await fetch(`${BASE_URL}/pokemon/${idx}`, { mode: "cors" });
  return res.json();
}

export function searchPokemon() {}
