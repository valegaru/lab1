/* Este codigo, al ejecutarse, le pide un nombre (o incluso acepta caracteres) de personajes de Ricky y Morty al usuario y lo contrasta con la informacion
del api para devolver una lista de coincidencias. Es bastante tolerante con las busquedas, si escribo "A", me muestra todos los personajes que
tenga la A en su nombre.

Para usarse desde el navegador (con la asistencia de Express), se corre el comando "npm run dev" en la consola en la raiz del proyecto,
se abre el navegador, y se ingresa "localhost:3000" en el buscador
*/
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

/*
Dependencias del proyecto
axios: Se utiliza para hacer solicitudes HTTP a la API de Rick y Morty. La elegí porque es una biblioteca fácil de usar para hacer solicitudes HTTP en Node.js.

express: Lo utilizo aqui para abrir el programa en pagina web.


Dependencias de desarrollador
nodemon: Se utiliza para reiniciar automáticamente la aplicación cuando se detectan cambios en los archivos. Evita tener que reiniciar manualmente cada vez que se hacen cambios en el código.

eslint : Se utiliza para analizar el código en busca de errores y aplicar un estilo de codificación consistente.

*/
