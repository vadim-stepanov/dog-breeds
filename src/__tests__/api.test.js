import {
	getCatalog,
	getRandomBreedImage,
	getBreedImages,
	getBreedInfoList,
	getBreedInfo,
} from '../api'

describe.skip('API', () => {
	describe('getCatalog', () => {
		let response = null

		beforeAll(async () => {
			response = await getCatalog()
		})

		it('should match the snapshot', () => expect(response).toMatchSnapshot())

		it('should be success', () => expect(response.status).toEqual('success'))

		it('should not have empty data', () =>
			expect(response.message.length).not.toBe(0))

		it('should data to be array', () =>
			expect(Array.isArray(response.message)).toBe(true))
	})

	describe('getRandomBreedImage', () => {
		let response = null

		beforeAll(() => {
			return getRandomBreedImage('affenpinscher').then(
				data => (response = data)
			)
		})

		it('should be success', () => expect(response.status).toEqual('success'))

		it('should not have empty data', () =>
			expect(response.message.length).not.toBe(0))

		it('should data to be string', () =>
			expect(typeof response.message).toBe('string'))

		it('should get error', async () => {
			response = await getRandomBreedImage('')
			expect(response.status).toBeUndefined()
		})
	})

	describe('getBreedImages', () => {
		let response = null

		beforeAll(async () => {
			response = await getBreedImages('affenpinscher')
		})

		it('should match the snapshot', () => expect(response).toMatchSnapshot())

		it('should be success', () => expect(response.status).toEqual('success'))

		it('should not have empty data', () =>
			expect(response.message.length).not.toBe(0))

		it('should data to be array', () =>
			expect(Array.isArray(response.message)).toBe(true))

		it('should get error', async () => {
			response = await getBreedImages('')
			expect(response.status).toBeUndefined()
		})
	})

	describe('getBreedInfoList', () => {
		let response = null

		beforeAll(async () => {
			response = await getBreedInfoList()
		})

		it('should match the snapshot', () => expect(response).toMatchSnapshot())

		it('should be success', () => expect(response.status).toEqual('success'))

		it('should not have empty data', () =>
			expect(response.message.length).not.toBe(0))

		it('should data to be array', () =>
			expect(Array.isArray(response.message)).toBe(true))
	})

	describe('getBreedInfo', () => {
		let response = null

		beforeAll(async () => {
			response = await getBreedInfo('affenpinscher')
		})

		it('should match the snapshot', () => expect(response).toMatchSnapshot())

		it('should be success', () => expect(response.status).toEqual('success'))

		it('should not have empty data', () =>
			expect(response.message.length).not.toBe(0))

		it('should data to be an object', () =>
			expect(typeof response.message).toBe('object'))

		it('should get error', async () => {
			response = await getBreedInfo('')
			console.log(response)
			expect(response.status).toBeUndefined()
		})
	})
})
