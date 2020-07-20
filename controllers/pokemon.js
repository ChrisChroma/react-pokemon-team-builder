const Pokemon = require("../models/pokemon");
const Trainer = require("../models/user");

module.exports = {
  show,
  index,
};

function show(req, res) {
  console.log("pokemon/show");
  Pokemon.findOne({ _id: req.params.id }, function (err, pokemon) {
    res.render("pokemon/show", { pokemon: pokemon });
  });
}

async function index(req, res) {
  console.log("pokemon/index");
  if (req.params.teamId) {
    const trainer = await Trainer.findOne({ email: req.user.email });
    const team = trainer.team.id(req.params.teamId);
    console.log(team);
    Pokemon.find({}, function (err, pokemons) {
      res.render("pokemon/index", {
        allPokemon: pokemons.sort((a, b) => a.order - b.order),
        user: req.user,
        team,
      });
    });
  } else {
    Pokemon.find({}, function (err, pokemons) {
      res.render("pokemon/index", {
        allPokemon: pokemons.sort((a, b) => a.order - b.order),
        user: req.user,
        team: false,
      });
    });
  }
}
