// index.js
const axios = require('axios');
const prompt = require('prompt-sync')();

const apiUrl = 'https://rickandmortyapi.com/api/character/';

async function fetchCharacterInfo(characterName) {
	try {
		const response = await axios.get(apiUrl, {
			params: {
				name: characterName,
			},
		});
		const character = response.data.results[0];
		if (character) {
			console.log('Información del personaje:');
			console.log(`Nombre: ${character.name}`);
			console.log(`Especie: ${character.species}`);
			console.log(`Origen: ${character.origin.name}`);
		} else {
			console.log(`No se encontró ningún personaje con el nombre "${characterName}"`);
		}
	} catch (error) {
		console.error('Error al buscar el personaje:', error.message);
	}
}

const characterName = prompt('Ingrese el nombre del personaje de Rick y Morty: ');
fetchCharacterInfo(characterName);