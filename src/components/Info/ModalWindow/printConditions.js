import { Link } from "react-router-dom";

export const printConditions = (type, information) => {
  console.log(fetchData(information.homeworld).then(data => {return data})); 

  async function fetchData(url) {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  }

  switch (type) {
    case "people":
      return (
        <div>
          <h2>Information</h2>
          <p>Name: {information.name}</p>
          <p>Height: {information.height}</p>
          <p>Mass: {information.mass}</p>
          <p>Hair color: {information.hair_color}</p>
          <p>Skin color: {information.skin_color}</p>
          <p>Eye color: {information.eye_color}</p>
          <p>Birth year: {information.birth_year}</p>
          <p>Gender: {information.gender}</p>
          <p>Homeworld: {}</p>
        </div>
      );
    case "planets":
      return (
        <div>
          <h2>Information</h2>
          <p>Name: {information.name}</p>
          <p>Rotation period: {information.rotation_period}</p>
          <p>Orbital period: {information.orbital_period}</p>
          <p>Diameter: {information.diameter}</p>
          <p>Climate: {information.climate}</p>
          <p>Gravity: {information.gravity}</p>
          <p>Terrain: {information.terrain}</p>
          <p>Surface water: {information.surface_water}</p>
          <p>Population: {information.population}</p>
        </div>
      );
    case "films":
      return (
        <div>
          <h2>Information</h2>
          <p>Title: {information.title}</p>
          <p>Episode id: {information.episode_id}</p>
          <p>Director: {information.director}</p>
          <p>Producer: {information.producer}</p>
          <p>Release date: {information.release_date}</p>
        </div>
      );

    case "species":
      return (
        <div>
          <h2>Information</h2>
          <p>Name: {information.name}</p>
          <p>Classification: {information.classification}</p>
          <p>Designation: {information.designation}</p>
          <p>Average height: {information.average_height}</p>
          <p>Skin colors: {information.skin_colors}</p>
          <p>Hair colors: {information.hair_colors}</p>
          <p>Eye colors: {information.eye_colors}</p>
          <p>Average lifespan: {information.average_lifespan}</p>
          <p>Language: {information.language}</p>
        </div>
      );

    case "vehicles":
      return (
        <div>
          <h2>Information</h2>
          <p>Name: {information.name}</p>
          <p>Model: {information.model}</p>
          <p>Manufacturer: {information.manufacturer}</p>
          <p>Cost in credits: {information.cost_in_credits}</p>
          <p>Length: {information.length}</p>
          <p>Max atmosphering speed: {information.max_atmosphering_speed}</p>
          <p>Crew: {information.crew}</p>
          <p>Passengers: {information.passengers}</p>
          <p>Cargo capacity: {information.cargo_capacity}</p>
          <p>Consumables: {information.consumables}</p>
          <p>Vehicle class: {information.vehicle_class}</p>
        </div>
      );

    case "starships":
      return (
        <div>
          <h2>Information</h2>
          <p>Name: {information.name}</p>
          <p>Model: {information.model}</p>
          <p>Manufacturer: {information.manufacturer}</p>
          <p>Cost in credits: {information.cost_in_credits}</p>
          <p>Length: {information.length}</p>
          <p>Max atmosphering speed: {information.max_atmosphering_speed}</p>
          <p>Crew: {information.crew}</p>
          <p>Passengers: {information.passengers}</p>
          <p>Cargo capacity: {information.cargo_capacity}</p>
          <p>Consumables: {information.consumables}</p>
          <p>Hyperdrive rating: {information.hyperdrive_rating}</p>
          <p>MGLT: {information.MGLT}</p>
          <p>Starship Class: {information.starship_class}</p>
        </div>
      );

    default:
      break;
  }
};
