import { connect } from 'react-redux'
import createCachedSelector from 're-reselect'
import { ActionTypes } from '../../utils/constants'
import {
	favorites,
	sortFavoritesBy,
	sortFavoritesByDate,
	sortFavoritesByBreed,
} from '../../selectors'
import FavoritesList from './FavoritesList'
import { removeFromFavorites, setFavoritesSortType } from '../../actions'

const sortItemList = (sortBy, sortByDate, sortByBreed, favorites) => {
	if (sortBy === 'date') {
		if (sortByDate === 'asc') {
			return [...favorites].sort(
				(a, b) => new Date(a.timestamp) - new Date(b.timestamp)
			)
		} else {
			return [...favorites].sort(
				(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
			)
		}
	} else {
		if (sortByBreed === 'asc') {
			return [...favorites].sort((a, b) =>
				a.breed.toLowerCase() < b.breed.toLowerCase() ? -1 : 1
			)
		} else {
			return [...favorites].sort((a, b) =>
				a.breed.toLowerCase() < b.breed.toLowerCase() ? 1 : -1
			)
		}
	}
}

const sortItemListCachedSelector = createCachedSelector(
	sortFavoritesBy,
	sortFavoritesByDate,
	sortFavoritesByBreed,
	favorites,
	(sortBy, sortByDate, sortByBreed, favorites) =>
		sortItemList(sortBy, sortByDate, sortByBreed, favorites)
)(
	(state, sortBy, sortByDate, sortByBreed) =>
		`${sortBy}:${sortByDate}:${sortByBreed}`
)

const mapStateToProps = state => ({
	itemList: sortItemListCachedSelector(
		state,
		sortFavoritesBy(state),
		sortFavoritesByDate(state),
		sortFavoritesByBreed(state)
	),
	sortType: sortFavoritesBy(state),
	sortByDateOrder: sortFavoritesByDate(state),
	sortByBreedOrder: sortFavoritesByBreed(state),
})

const mapDispatchToProps = dispatch => ({
	remove: url => dispatch(removeFromFavorites(url)),
	sortBy: type => dispatch(setFavoritesSortType(type)),
	sortByDate: () =>
		dispatch({ type: ActionTypes.SET_SORT_FAVORITES_BY_DATE_ORDER }),
	sortByBreed: () =>
		dispatch({ type: ActionTypes.SET_SORT_FAVORITES_BY_BREED_ORDER }),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FavoritesList)
