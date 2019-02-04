import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { ActionTypes } from '../../utils/constants'
import { dogListList, dogListStatus, favorites } from '../../selectors'
import DogList from './DogList'

const makeDogList = (dogList, favorites) => {
	const result = []
	for (const item of dogList) {
		const favorite = favorites.some(el => el.url === item.url)
		result.push({ ...item, favorite: favorite })
	}
	return result
}

const makeDogListSelector = createSelector(
	dogListList,
	favorites,
	(dogList, favorites) => makeDogList(dogList, favorites)
)

const mapStateToProps = state => ({
	infoStatus: dogListStatus(state),
	dogList: makeDogListSelector(state),
})

const mapDispatchToProps = dispatch => ({
	loadDogList: breed => dispatch({ type: ActionTypes.LOAD_DOG_LIST, breed }),
	markAsFavorite: (url, breed) =>
		dispatch({ type: ActionTypes.MAKE_FAVORITE, url, breed }),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DogList)
