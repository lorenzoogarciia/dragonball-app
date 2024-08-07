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

export async function getCharacterById(id) {
  const baseUrl = "https://dragonball-api.com/api";
  const character = await fetch(`${baseUrl}/characters/${id}`);
  const json = await character.json();

  const characterData = json;
  const { name, ki, race, gender, description, image } = characterData;
  return {
    name,
    ki,
    race,
    gender,
    description,
    image,
  };
}

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

export async function getPlanetById(id) {
  const baseUrl = "https://dragonball-api.com/api";
  const planet = await fetch(`${baseUrl}/planets/${id}`);
  const json = await planet.json();

  const planetData = json;
  const { name, description, image, isDestroyed } = planetData;
  return {
    id,
    name,
    description,
    image,
    isDestroyed,
  };
}
