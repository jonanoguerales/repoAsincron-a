import axios from "axios";
import { Personaje } from "./pintarPersonajes.models";

export const crearElementoImagen = (
  imagen: string,
  nombre: string
): HTMLImageElement => {
  const img = document.createElement("img");
  img.src = `http://localhost:3000/${imagen}`;
  img.alt = `Imagen de ${nombre}`;
  return img;
};

export const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = texto;
  return parrafo;
};

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  const { data } = await axios.get("http://localhost:3000/personajes");
  return data;
};

export const crearCardPersonaje = (personaje: Personaje): HTMLDivElement => {
  const card = document.createElement("div");
  card.classList.add("cardPersonajes");
  const divImagen = document.createElement("div");
  divImagen.classList.add("divImagen");
  const divParrafos = document.createElement("div");

  const imagen = crearElementoImagen(personaje.imagen, personaje.nombre);
  const nombre = crearElementoParrafo(
    `<strong>Nombre</strong>: ${personaje.nombre}`
  );
  const amigo = crearElementoParrafo(
    `<strong>Amigos</strong>: ${personaje.amigo}`
  );
  const apodo = crearElementoParrafo(
    `<strong>Apodo</strong>: ${personaje.apodo}`
  );
  const especialidad = crearElementoParrafo(
    `<strong>Especialidad</strong>: ${personaje.especialidad}`
  );
  const habilidades = crearElementoParrafo(
    `<strong>Habilidades</strong>: ${personaje.habilidades.join(", ")}`
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
