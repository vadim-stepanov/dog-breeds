import { breedInfoData } from '../utils/breedInfoData'

export const getBreedInfoList = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				status: 'success',
				message: Object.keys(breedInfoData),
			})
		}, 1000)
	})
}

export const getBreedInfo = breed => {
	return new Promise(resolve => {
		setTimeout(() => {
			if (breed in breedInfoData) {
				resolve({ status: 'success', message: breedInfoData[breed] })
			} else {
				resolve({ type: `not found ${breed}` })
			}
		}, 30)
	})
}
