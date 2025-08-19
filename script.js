document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pokemonInput");
    const boton = document.getElementById("buscarBtn");
    const resultado = document.getElementById("resultado");

    resultado.style.display = "none";

    boton.addEventListener("click", () => {
        const nombre = input.value.trim().toLowerCase();
        buscarPokemon(nombre);
    });

    async function buscarPokemon(nombre) {
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
            
            if (!respuesta.ok) {
                throw new Error("Ups, este Pokémon no existe :(");
            }

            const data = await respuesta.json();
            mostrarPokemon(data);
        } catch (error) {
            mostrarError(error.message);
        }
    }

    function mostrarPokemon(pokemon) {
        resultado.style.display = "block"; 
        resultado.innerHTML = `
            <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
            <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
        `;
    }

    function mostrarError(mensaje) {
        resultado.style.display = "block"; 
        resultado.innerHTML = `<p style="color:red;">${mensaje}</p>`;
    }
});
