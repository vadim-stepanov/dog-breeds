import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import 'jest-enzyme'
import 'jest-styled-components'
import configureStore from 'redux-mock-store'
import { I18nextProvider } from 'react-i18next'
import FavoritesList from '../components/favorites/FavoritesList'
import FavoritesListContainer from '../components/favorites'
import i18n from '../components/common/i18n'
import { ActionTypes } from '../utils/constants'

configure({ adapter: new Adapter() })

const mockStore = configureStore()

describe.skip('Favorites', () => {
	const props = {
		itemList: [],
		sortType: '',
		sortByDateOrder: '',
		sortByBreedOrder: '',
		remove: jest.fn(),
		sortBy: jest.fn(),
		sortByDate: jest.fn(),
		sortByBreed: jest.fn(),
		scrollViewRef: null,
	}

	describe('FavoritesList component', () => {
		it('should matche the snapshot', () => {
			const tree = shallow(<FavoritesList {...props} />)
			expect(toJson(tree)).toMatchSnapshot()
		})

		describe('buttons', () => {
			let wrapper, sortBy, sortByDate, sortByBreed

			beforeEach(() => {
				sortBy = jest.fn()
				sortByDate = jest.fn()
				sortByBreed = jest.fn()
				props.sortBy = sortBy
				props.sortByDate = sortByDate
				props.sortByBreed = sortByBreed
				//wrapper = shallow(<FavoritesList {...props} />)
				wrapper = mount(
					<I18nextProvider i18n={i18n}>
						<FavoritesList {...props} />
					</I18nextProvider>
				)
			})

			afterEach(() => {
				wrapper.unmount()
			})

			it('check prop data-selected default value', () => {
				expect(
					wrapper
						.find('div.sort-type')
						.at(0)
						.prop('data-selected')
				).toBe(false)
			})

			it('should trigger sortBy callback on clicking', () => {
				wrapper
					.find('div.sort-type')
					.at(0)
					.simulate('click')
				expect(sortBy).toHaveBeenCalled()
			})

			it('should trigger sortByDate callback on clicking', () => {
				wrapper
					.find('FaArrowDown')
					.at(0)
					.simulate('click')
				expect(sortByDate).toHaveBeenCalled()
			})

			it('should trigger sortByBreed callback on clicking', () => {
				wrapper
					.find('FaArrowDown')
					.at(1)
					.simulate('click')
				expect(sortByBreed).toHaveBeenCalled()
			})
		})
	})

	describe('FavoritesList container', () => {
		let wrapper, store

		beforeAll(() => {
			const initialState = {
				sortFavorites: { by: 'date', byDate: 'asc', byBreed: 'asc' },
				favorites: [],
			}
			store = mockStore(initialState)
			store.dispatch = jest.fn()
			wrapper = shallow(<FavoritesListContainer store={store} />)
		})

		it('check all props', () => {
			expect(wrapper.props()).toEqual(
				expect.objectContaining({
					itemList: expect.any(Array),
					sortType: expect.any(String),
					sortByDateOrder: expect.any(String),
					sortByBreedOrder: expect.any(String),
					remove: expect.any(Function),
					sortBy: expect.any(Function),
					sortByDate: expect.any(Function),
					sortByBreed: expect.any(Function),
				})
			)
		})

		it('check default value of props', () => {
			expect(wrapper.props().sortType).toBe('date')
			expect(wrapper.props().sortByDateOrder).toBe('asc')
			expect(wrapper.props().sortByBreedOrder).toBe('asc')
		})

		it('maps sortBy to dispatch setSortType action', () => {
			wrapper.props().sortBy()
			expect(store.dispatch).toHaveBeenCalledWith({
				type: ActionTypes.SORT_FAVORITES_BY,
			})
		})
	})
})
