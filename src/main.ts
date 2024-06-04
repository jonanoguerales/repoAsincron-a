import axios from "axios";

interface Personaje {
  id: number;
  nombre: string;
  amigos: string;
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

  const imagen = crearElementoImagen(personaje.imagen, personaje.nombre);
  const nombre = crearElementoParrafo(`Nombre: ${personaje.nombre}`);
  const amigos = crearElementoParrafo(`Amigos: ${personaje.amigos}`);
  const apodo = crearElementoParrafo(`Apodo: ${personaje.apodo}`);
  const especialidad = crearElementoParrafo(
    `Especialidad: ${personaje.especialidad}`
  );
  const habilidades = crearElementoParrafo(
    `Habilidades: ${personaje.habilidades.join(", ")}`
  );

  card.appendChild(imagen);
  card.appendChild(nombre);
  card.appendChild(amigos);
  card.appendChild(apodo);
  card.appendChild(especialidad);
  card.appendChild(habilidades);

  return card;
};

const pintarPersonajes = async () => {
  const personajes = await obtenerPersonajes();
  const contenedorCards = document.getElementById("contenedorCards");

  if (contenedorCards) {
    personajes.forEach((personaje) => {
      const card = crearCardPersonaje(personaje);
      contenedorCards.appendChild(card);
    });
  }
};

document.addEventListener("DOMContentLoaded", pintarPersonajes);
