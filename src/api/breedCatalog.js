import fetch from 'node-fetch'

export const getCatalog = () =>
	fetch('https://dog.ceo/api/breeds/list')
		.then(response => response.json())
		.then(data => data)
		.catch(error => error)

export const getRandomBreedImage = breed =>
	fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
		.then(response => response.json())
		.then(data => data)
		.catch(error => error)
