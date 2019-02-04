import fetch from 'node-fetch'

export const getBreedImages = breed =>
	fetch(`https://dog.ceo/api/breed/${breed}/images`)
		.then(response => response.json())
		.then(data => data)
		.catch(error => error)
