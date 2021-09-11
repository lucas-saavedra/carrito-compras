$(document).ready(function () {
  getPokemon(`https://pokeapi.co/api/v2/pokemon/${getRandomNumber()}`);
});
const getRandomNumber = () => {
  return Math.floor(Math.random() * 151);
}
const getPokemon = (url) => {
  $.get(url, cont = (res, estado) => {
    if (estado === "success") {
      console.log(res);
      const pokemon = {
        name: res.name,
        img: res.sprites.other.dream_world.front_default,
        weight: res.weight,
        height: res.height
      }
      printCard(pokemon)

    }
  });
}
const printCard = (pokemon) => {
  document.getElementById('pokeImg').setAttribute('src', `${pokemon.img}`);
  document.getElementById('pokeName').textContent = pokemon.name;
  document.getElementById('pokeWeight').textContent = pokemon.weight / 10;
  document.getElementById('pokeHeight').textContent = pokemon.height / 10;
}

$('#pokeBtn').click(() => {
  const URLGET = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  $.get(URLGET, function (res, estado) {
    if (estado === "success") {
      const pokemonFilter = res.results.filter(e => e.name == $('#pokeInput').val());
      if (pokemonFilter.length == 0) {
        Swal.fire(
          'Error',
          'No existe ese pokemón',
          'error'
        )
      } else {
        getPokemon(pokemonFilter[0].url)
      }
    }
  });
});

$("#btn1").click(() => {
  getPokemon(`https://pokeapi.co/api/v2/pokemon/${getRandomNumber()}`);
});