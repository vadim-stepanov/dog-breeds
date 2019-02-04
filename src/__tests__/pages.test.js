import React from 'react'
import { configure, shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import 'jest-enzyme'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import configureStore from 'redux-mock-store'
import Home from '../components/pages/Home'
import About from '../components/pages/About'
import DogBreeds from '../components/pages/DogBreeds'
import Favorites from '../components/pages/Favorites'
import UsedAPI from '../components/pages/UsedAPI'
import Page404 from '../components/pages/Page404'
import DogListPage from '../components/pages/DogList'
import i18n from '../components/common/i18n'

configure({ adapter: new Adapter() })

const mockStore = configureStore()

describe.skip('Pages', () => {
	const initialState = {
		breedInfo: {
			status: 'notset',
			loadingProgress: 0,
			breeds: [],
			infoList: {},
		},
		breedCatalog: {
			infoList: [],
			infoStatus: 'notset',
			imgStatus: 'notset',
		},
		dogList: {
			list: [],
			status: 'notset',
		},
		sortFavorites: { by: 'date', byDate: 'asc', byBreed: 'asc' },
		favorites: [],
		language: 'en',
		theme: 'gray',
	}

	let store

	beforeAll(() => {
		store = mockStore(initialState)
		store.dispatch = jest.fn()
	})

	describe('Home', () => {
		it('should be defined', () => {
			expect(Home).toBeDefined()
		})

		it('should match the full render snapshot', () => {
			const tree = render(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<Home />
					</I18nextProvider>
				</Provider>
			)
			expect(toJson(tree)).toMatchSnapshot()
		})

		it('should match the shallow snapshot', () => {
			const tree = shallow(<Home store={store} />)
			expect(toJson(tree)).toMatchSnapshot()
		})
	})

	describe('About', () => {
		it('should be defined', () => {
			expect(About).toBeDefined()
		})

		it('should match the full render snapshot', () => {
			const tree = render(
				<I18nextProvider i18n={i18n}>
					<About />
				</I18nextProvider>
			)
			expect(toJson(tree)).toMatchSnapshot()
		})

		it('should match the shallow snapshot', () => {
			const tree = shallow(<About />)
			expect(toJson(tree)).toMatchSnapshot()
		})
	})

	describe('Page404', () => {
		const props = { location: { pathname: 'invalid-path' } }

		it('should be defined', () => {
			expect(Page404).toBeDefined()
		})

		it('should match the full render snapshot', () => {
			const tree = render(
				<I18nextProvider i18n={i18n}>
					<Page404 {...props} />
				</I18nextProvider>
			)
			expect(toJson(tree)).toMatchSnapshot()
		})

		it('should match the shallow snapshot', () => {
			const tree = shallow(<Page404 {...props} />)
			expect(toJson(tree)).toMatchSnapshot()
		})
	})

	describe('UsedAPI', () => {
		it('should be defined', () => {
			expect(UsedAPI).toBeDefined()
		})

		it('should match the snapshot', () => {
			const tree = shallow(<UsedAPI />)
			expect(toJson(tree)).toMatchSnapshot()
		})
	})

	describe('Favorites', () => {
		it('should be defined', () => {
			expect(Favorites).toBeDefined()
		})

		it('should match the full render snapshot', () => {
			const tree = render(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<Favorites />
					</I18nextProvider>
				</Provider>
			)
			expect(toJson(tree)).toMatchSnapshot()
		})

		it('should match the shallow snapshot', () => {
			const tree = shallow(<Favorites />)
			expect(toJson(tree)).toMatchSnapshot()
		})
	})

	describe('DogBreeds', () => {
		it('should be defined', () => {
			expect(DogBreeds).toBeDefined()
		})

		it('should match the full render snapshot', () => {
			const tree = render(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<DogBreeds />
					</I18nextProvider>
				</Provider>
			)
			expect(toJson(tree)).toMatchSnapshot()
		})

		it('should match the shallow snapshot', () => {
			const tree = shallow(<DogBreeds />)
			expect(toJson(tree)).toMatchSnapshot()
		})
	})

	describe('DogListPage', () => {
		const props = { match: { params: { breedName: 'affenpinscher' } } }

		it('should be defined', () => {
			expect(DogBreeds).toBeDefined()
		})

		it('should match the full render snapshot', () => {
			const tree = render(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<DogListPage {...props} />
					</I18nextProvider>
				</Provider>
			)
			expect(toJson(tree)).toMatchSnapshot()
		})

		it('should match the shallow snapshot', () => {
			const tree = shallow(<DogListPage {...props} />)
			expect(toJson(tree)).toMatchSnapshot()
		})
	})
})
