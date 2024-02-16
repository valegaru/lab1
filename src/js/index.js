const express = require('express'); // framework que crea el canva web
const axios = require('axios'); //lo que trae lo que necesitamos del api

const app = express(); // es el que muestra el canvas en blanco en la web
const port = 3000; // hay que ingresar al localhost:3000 en el navegador

app.use(express.urlencoded({ extended: true }));

const apiUrl = 'https://rickandmortyapi.com/api/character/'; //api de ricky & Ricky y Morty

//metodo que muestra el input donde va a escribir el usuario el personaje que busca
app.get('/', (req, res) => {
	res.send(`
    <form action="/" method="post">
      <label for="characterName">Ingrese parte del nombre del personaje de Rick y Morty:</label>
      <input type="text" id="characterName" name="characterName">
      <button type="submit">Buscar</button>
    </form>
  `);
});

//
app.post('/', async (req, res) => {
	const characterName = req.body.characterName;
	try {
		const response = await axios.get(apiUrl, {
			params: {
				name: characterName, // lo que ingresa el usuario
			},
		});
		const characters = response.data.results.filter((char) =>
			char.name.toLowerCase().includes(characterName.toLowerCase())
		);
		if (characters.length > 0) {
			const characterList = characters.map((char) => `<li>${char.name}</li>`).join(''); // lista de coincidencias que muestra en html apenas acabe la busqueda
			res.send(`
        <h2>Personajes encontrados:</h2>
        <ul>${characterList}</ul>
      `);
		} else {
			res.send(`<p>No se encontraron personajes cuyos nombres contengan "${characterName}"</p>`);
		}
	} catch (error) {
		console.error('Error al buscar personajes:', error.message);
		res.send(`<p>Error al buscar personajes: ${error.message}</p>`);
	}
});

app.listen(port, () => {
	console.log(`Aplicación escuchando en http://localhost:${port}`);
});
