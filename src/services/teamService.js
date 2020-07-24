const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export async function addPokemonToTeam(teamId, pokemonId, email) {
  try {
    const res = fetch(`${BASE_URL}/trainers/teams/add/${teamId}/${pokemonId}`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ email }),
    });
    return res;
  } catch (error) {
    throw new Error("unable to add pokemon");
  }
}

export async function deleteTeam(teamId, trainerId) {
  try {
    const res = await fetch(`${BASE_URL}/teams/remove/${trainerId}/${teamId}`, {
      mode: "cors",
      headers: new Headers({ "Content-Type": "application/json" }),
      method: "GET",
    });
    return res;
  } catch (error) {
    throw new Error("unable to delete pokemon");
  }
}

export async function createTeam(name, email) {
  try {
    const res = await fetch(`${BASE_URL}/trainers/teams/new`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    });
    return await res;
  } catch (error) {
    throw new Error("unable to create team");
  }
}

export async function getFavorites(trainerId) {
  return fetch(`${BASE_URL}/trainers/${trainerId}/favorites`, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
  });
}

export async function getAllTeams() {
  return fetch(`${BASE_URL}/teams`, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
  });
}

export async function addPokemonToFavorite(id, email) {
  return fetch(`${BASE_URL}/trainers/favorites/add/${id}`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ id, email }),
  });
}

export async function removePokemonFromFavorite(id, email) {
  try {
    const res = await fetch(`${BASE_URL}/trainers/favorites/remove/${id}`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        id: id,
        email: email,
      }),
    });
    return res.json();
  } catch (error) {
    throw new Error("unable to add pokemon");
  }
}
