const obtenerPokemon = async () => {
    const Obj = await obtenerNombresPokemon(obtenerNumero());
    return Obj;
};

function getNumeroAleatorio(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
}

const obtenerNumero = () => {
    const arregloIds = [25, 54, 230, 501, 202];
    return arregloIds[getNumeroAleatorio(0, 4)]
};

const consumirApi = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
        (result) => result.json()
    );
    return data;
};

const obtenerNombresPokemon = async (id) => {
    const data = await consumirApi(id);
    const obj = {
        nombre: data.name,
        id: data.id,
    };
    return obj;
};

const obtenerFachadaPokemons = async () => {
    return await obtenerPokemon();
};

export default obtenerFachadaPokemons;