import {
  crearCardPersonaje,
  obtenerPersonajes,
} from "./pintarPersonajes.helper";

const pintarPersonajes = async (filtro: string = "") => {
  const personajes = await obtenerPersonajes();
  const contenedorCards = document.getElementById("contenedorCards");

  if (contenedorCards) {
    contenedorCards.innerHTML = "";
    personajes
      .filter((personaje) =>
        personaje.nombre.toLowerCase().includes(filtro.toLowerCase())
      )
      .forEach((personaje) => {
        const card = crearCardPersonaje(personaje);
        contenedorCards.appendChild(card);
      });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const inputFiltro = document.getElementById("nombre");

  if (inputFiltro && inputFiltro instanceof HTMLInputElement) {
    inputFiltro.addEventListener("input", () => {
      pintarPersonajes(inputFiltro.value);
    });
  } else {
    throw new Error("No se encontro la busqueda");
  }

  pintarPersonajes();
});
