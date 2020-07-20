const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export async function addPokemonToTeam(id, email) {
  try {
    const res = await fetch(`${BASE_URL}/trainers/teams/add/${1}/${id}`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
    });
    return res.json();
  } catch (error) {
    throw new Error("unable to add pokemon");
  }
}

export async function createTeam(name, email) {
  try {
    const res = await fetch(`${BASE_URL}/trainers/teams/new`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    });
    return await res.json();
  } catch (error) {
    throw new Error("unable to add pokemon");
  }
}
