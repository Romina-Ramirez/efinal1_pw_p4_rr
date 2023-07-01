<template>
  <div class="container">
    <img :src="imagenFuente" alt="No se puede mostrar la imagen." />
    <label for="">{{ nombrePokemon.toUpperCase() }}</label>
  </div>
</template>

<script>
export default {
  props: {
    pokemonImg: {
      type: Number,
      required: true,
    },
    pokemonNombre: {
      type: String,
      required: true,
    },
    inicio: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    imagenFuente() {
      if (this.inicio === false) {
        return `https://cdn-icons-png.flaticon.com/512/1/1601.png`;
      } else {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonImg}.svg`;
      }
    },
    nombrePokemon() {
      if (this.inicio === false) {
        return "XXXXXXXXXXXXX";
      } else {
        return this.pokemonNombre;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

img {
  height: 250px;
  width: 250px;
  margin-block: 15px;
  border: 5px solid black;
  background: white;
}

label {
  font-weight: bold;
}
</style>