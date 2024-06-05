import axios from "axios";

interface Personaje {
  id: number;
  nombre: string;
  amigo: string;
  apodo: string;
  especialidad: string;
  habilidades: string[];
  imagen: string;
}

const crearElementoImagen = (
  imagen: string,
  nombre: string
): HTMLImageElement => {
  const img = document.createElement("img");
  img.src = `http://localhost:3000/${imagen}`;
  img.alt = `Imagen de ${nombre}`;
  return img;
};

const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  return parrafo;
};

const obtenerPersonajes = async (): Promise<Personaje[]> => {
  const { data } = await axios.get("http://localhost:3000/personajes");
  return data;
};

const crearCardPersonaje = (personaje: Personaje): HTMLDivElement => {
  const card = document.createElement("div");
  card.classList.add("cardPersonajes");
  const divImagen = document.createElement("div");
  divImagen.classList.add("divImagen");
  const divParrafos = document.createElement("div");

  const imagen = crearElementoImagen(personaje.imagen, personaje.nombre);
  const nombre = crearElementoParrafo(`Nombre: ${personaje.nombre}`);
  const amigo = crearElementoParrafo(`Amigos: ${personaje.amigo}`);
  const apodo = crearElementoParrafo(`Apodo: ${personaje.apodo}`);
  const especialidad = crearElementoParrafo(
    `Especialidad: ${personaje.especialidad}`
  );
  const habilidades = crearElementoParrafo(
    `Habilidades: ${personaje.habilidades.join(", ")}`
  );

  card.appendChild(divImagen);
  card.appendChild(divParrafos);
  divImagen.appendChild(imagen);
  divParrafos.appendChild(nombre);
  divParrafos.appendChild(amigo);
  divParrafos.appendChild(apodo);
  divParrafos.appendChild(especialidad);
  divParrafos.appendChild(habilidades);

  return card;
};

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
  const inputFiltro = document.getElementById("nombre") as HTMLInputElement;

  if (inputFiltro) {
    inputFiltro.addEventListener("input", () => {
      pintarPersonajes(inputFiltro.value);
    });
  }

  pintarPersonajes();
});
