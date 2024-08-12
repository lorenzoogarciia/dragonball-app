//Archvivo que contiene las funciones para obtener los datos de la API

//Función que obtiene todos los personajes
export async function getAllCharacters() {
  const baseUrl = "https://dragonball-api.com/api";
  const characters = await fetch(`${baseUrl}/characters?limit=58`);
  const json = await characters.json();

  const charactersData = json.items;

  return charactersData.map((item) => {
    const { id, name, ki, race, gender, description, image } = item;
    return {
      id,
      name,
      ki,
      race,
      gender,
      description,
      image,
    };
  });
}

//Función que obtiene un personaje por su id
export async function getCharacterById(id) {
  const baseUrl = "https://dragonball-api.com/api";
  const character = await fetch(`${baseUrl}/characters/${id}`);
  const json = await character.json();

  const characterData = json;
  const { name, ki, race, gender, description, image, originPlanet } =
    characterData;

  const originPlanetId = originPlanet.id;

  return {
    id,
    name,
    ki,
    race,
    gender,
    description,
    image,
    originPlanet: originPlanetId,
  };
}

//Función que obtiene todos los planetas
export async function getAllPlanets() {
  const baseUrl = "https://dragonball-api.com/api";
  const planets = await fetch(`${baseUrl}/planets?limit=20`);
  const json = await planets.json();

  const planetsData = json.items;

  return planetsData.map((item) => {
    const { id, name, image } = item;
    return {
      id,
      name,
      image,
    };
  });
}

//Función que obtiene un planeta por su id
export async function getPlanetById(id) {
  const baseUrl = "https://dragonball-api.com/api";
  const planet = await fetch(`${baseUrl}/planets/${id}`);
  const json = await planet.json();

  const planetData = json;
  const { name, description, image } = planetData;
  return {
    id,
    name,
    description,
    image,
  };
}

//Función que obtiene las transformaciones de un personaje por su id
export async function getTransformations(id) {
  const baseUrl = "https://dragonball-api.com/api";
  const character = await fetch(`${baseUrl}/characters/${id}`);
  const json = await character.json();
  return json.transformations;
}

export async function getCharactersPlanet(id) {
  const baseUrl = "https://dragonball-api.com/api";
  const planet = await fetch(`${baseUrl}/planets/${id}`);
  const json = await planet.json();
  return json.characters;
}
