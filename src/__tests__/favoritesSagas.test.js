import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import { makeFavorite } from '../sagas/favorites'
import { addToFavorites, removeFromFavorites } from '../actions'
import { favorites } from '../selectors'

describe.skip('favorites sagas', () => {
	const storeState = { favorites: [] }
	const url = 'https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg'
	const breed = 'affenpinscher'

	it('snapshot test', () => {
		return expectSaga(makeFavorite, { url, breed })
			.withState(storeState)
			.run()
			.then(result => {
				expect(result.toJSON()).toMatchSnapshot()
			})
	})

	describe('unit tests', () => {
		it('should add not existed entry', () => {
			const items = []
			testSaga(makeFavorite, { url, breed })
				.next()
				.select(favorites)
				.next(items)
				.put(addToFavorites({ url, breed }))
				.next()
				.isDone()
		})

		it('should remove existed entry', () => {
			const items = [
				{
					id: 'd91a5034-3520-42ed-b524-5a2b5ecd9c2e',
					breed: 'affenpinscher',
					url:
						'https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg',
					timestamp:
						'Sat Jul 14 2018 10:29:48 GMT+0300 (Восточная Европа, летнее время)',
				},
			]
			testSaga(makeFavorite, { url, breed })
				.next()
				.select(favorites)
				.next(items)
				.put(removeFromFavorites(url))
				.next()
				.isDone()
		})
	})

	describe('integration tests', () => {
		it('should add not existed entry', () => {
			const items = []
			return expectSaga(makeFavorite, { url, breed })
				.withState(storeState)
				.provide([[select(favorites), items]])
				.put(addToFavorites({ url, breed }))
				.run()
		})

		it('should remove existed entry', () => {
			const items = [
				{
					id: 'd91a5034-3520-42ed-b524-5a2b5ecd9c2e',
					breed: 'affenpinscher',
					url:
						'https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg',
					timestamp:
						'Sat Jul 14 2018 10:29:48 GMT+0300 (Восточная Европа, летнее время)',
				},
			]
			return expectSaga(makeFavorite, { url, breed })
				.withState(storeState)
				.provide([[select(favorites), items]])
				.put(removeFromFavorites(url))
				.run()
		})
	})
})
