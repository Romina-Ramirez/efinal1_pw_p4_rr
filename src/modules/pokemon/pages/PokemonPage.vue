<template>
  <h1>Juego Casino</h1>
  <div v-if="!juegoTerminado">
    <div class="containerPI">
      <label for="">Puntaje: {{ puntaje }}</label>
      <label for="">Intento: {{ intentos }}</label>
    </div>
    <div class="containerImg">
      <PokemonImg
        :inicio="juegoIniciado"
        :pokemonImg="imgP1"
        :pokemonNombre="nombreP1"
      />
      <PokemonImg
        :inicio="juegoIniciado"
        :pokemonImg="imgP2"
        :pokemonNombre="nombreP2"
      />
      <PokemonImg
        :inicio="juegoIniciado"
        :pokemonImg="imgP3"
        :pokemonNombre="nombreP3"
      />
    </div>
    <button :disabled="btn_bloqueado" @click="botonJuego()">JUGAR</button>
  </div>
  <div v-if="juegoTerminado" class="containerMsj">
    <h2 :class="cambioColor">{{ mensajeMostrado1 }}</h2>
    <h2 :class="cambioColor">{{ mensajeMostrado2 }}</h2>
    <button @click="nuevoJuego()">Nuevo Juego</button>
  </div>
</template>

<script>
import PokemonImg from "../components/PokemonImg.vue";

import obtenerFachadaPokemons from "../helpers/clientePokemonAPI";
export default {
  components: {
    PokemonImg,
  },
  data() {
    return {
      nombreP1: "",
      nombreP2: "",
      nombreP3: "",
      imgP1: null,
      imgP2: null,
      imgP3: null,
      puntaje: 0,
      intentos: 0,
      juegoTerminado: false,
      juegoIniciado: false,
      ganaste: false,
      btn_bloqueado: false,
    };
  },
  mounted() {
    this.cargaJuegoInicial();
  },
  computed: {
    mensajeMostrado1() {
      if (this.juegoTerminado === true) {
        if (this.ganaste === true) {
          return "Puntaje: " + this.puntaje;
        } else {
          return "Haz utilizado tus 5 intentos.";
        }
      } else {
        return "";
      }
    },
    mensajeMostrado2() {
      if (this.juegoTerminado === true) {
        if (this.ganaste === true) {
          return "Felicitaciones, has ganado un premio de $10.000,00";
        } else {
          return "El juego ha terminado, intentalo nuevamente.";
        }
      } else {
        return "";
      }
    },
    cambioColor() {
      if (this.ganaste === true) {
        return "gana";
      } else {
        return "pierde";
      }
    },
  },
  methods: {
    async cargaJuegoInicial() {
      const poke1 = await obtenerFachadaPokemons();
      this.imgP1 = poke1.id;
      const poke2 = await obtenerFachadaPokemons();
      this.imgP2 = poke2.id;
      const poke3 = await obtenerFachadaPokemons();
      this.imgP3 = poke3.id;
    },
    async cargaJuego() {
      const poke1 = await obtenerFachadaPokemons();
      this.nombreP1 = poke1.nombre;
      this.imgP1 = poke1.id;
      const poke2 = await obtenerFachadaPokemons();
      this.nombreP2 = poke2.nombre;
      this.imgP2 = poke2.id;
      const poke3 = await obtenerFachadaPokemons();
      this.nombreP3 = poke3.nombre;
      this.imgP3 = poke3.id;
      this.calcularPI(this.imgP1, this.imgP2, this.imgP3);
    },
    async botonJuego() {
      this.juegoIniciado = true;
      await this.cargaJuego();
    },
    calcularPI(idP1, idP2, idP3) {
      if (idP1 === idP2 && idP2 === idP3) {
        this.puntaje += 5;
        this.intentos += 1;
      } else if (idP1 === idP2 || idP1 === idP3 || idP2 === idP3) {
        this.puntaje += 2;
        this.intentos += 1;
      } else if (idP1 != idP2 && idP2 != idP3) {
        this.intentos += 1;
      }

      this.decidirMensaje(this.intentos, this.puntaje);
    },
    decidirMensaje(int, punt) {
      this.intentos = int;
      this.puntaje = punt;
      if (this.intentos === 5 && this.puntaje < 10) {
        this.mensaje = false;
        this.btn_bloqueado = true;
        this.juegoTerminado = true;
        this.ganaste = false;
      }
      if (this.puntaje >= 10) {
        this.mensaje = true;
        this.btn_bloqueado = true;
        this.juegoTerminado = true;
        this.ganaste = true;
      }
    },
    nuevoJuego() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.containerImg {
  display: flex;
  justify-content: center;
}

label {
  margin-inline: 50px;
  font-size: 20px;
  font-weight: bold;
}

button {
  padding: 10px 75px;
  font-size: 28px;
  font-weight: bold;
  border-radius: 5px;
  border: 5px solid black;
  background: gold;
}

.gana {
  color: rgb(0, 0, 127);
}

.pierde {
  color: rgb(134, 0, 0);
}
</style>