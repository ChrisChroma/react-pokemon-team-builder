const Pokemon = require("../models/pokemon");

module.exports = {
  show,
  index,
};

function show(req, res) {
  console.log("pokemon/show");
  Pokemon.findOne({ _id: req.params.id }, function (err, pokemon) {
    res.json({ pokemon });
  });
}

async function index(req, res) {
  console.log("pokemon/index");
  Pokemon.find({}, function (err, pokemons) {
    return res.json({
      allPokemon: pokemons.sort((a, b) => a.order - b.order),
      team: false,
    });
  });
}
