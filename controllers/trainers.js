const Trainer = require("../models/user");
const Pokemon = require("../models/pokemon");

async function createTeam(req, res) {
  console.log(req);

  try {
    const trainer = await Trainer.findOne({ email: req.body.email });
    trainer.team.push({ name: req.body.name, pokemon: [] });
    trainer.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
}

async function addToTeam(req, res) {
  console.log("trainers/addToTeam");
  const trainer = await Trainer.findOne({ email: req.body.email });
  const team = trainer.team.id(req.params.teamId);
  const pokemon = await Pokemon.findOne({ _id: req.params.pokemonId });
  team.pokemon.push(pokemon._id);
  trainer.save();
}

async function deleteFromTeam(req, res) {
  console.log("trainers/deleteFromTeam");
  const trainer = await Trainer.findOne({ email: req.user.email });
  const team = trainer.team.id(req.params.teamId);
  console.log("team", team);
  team.pokemon.splice(req.params.pokemonIdx, 1);
  console.log("req.params.pokemonIdx", req.params.pokemonIdx);
  trainer.save();
  res.redirect("/trainers");
}

async function index(req, res, next) {
  console.log("trainers/index");
  const trainer = await Trainer.findOne({ email: req.user.email });
  const teams = await trainer.team.map(async (team) => {
    const pokemonPromises = await team.pokemon.map(async (pokemonId) => {
      const pokemonDocument = Pokemon.findOne({ _id: pokemonId });
      return (await pokemonDocument).toObject();
    });
    const pokemon = await Promise.all(pokemonPromises);

    return {
      _id: team._id,
      name: team.name,
      pokemon: pokemon,
    };
  });

  if (!trainer) {
    res.redirect("/");
  } else {
    res.render("trainers/index", {
      user: trainer,
      teams: await Promise.all(teams),
    });
  }
}

module.exports = {
  index,
  addToTeam,
  deleteFromTeam,
  createTeam,
};
