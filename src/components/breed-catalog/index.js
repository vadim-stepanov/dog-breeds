import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { ActionTypes } from '../../utils/constants'
import { setBreedCatalogStatus } from '../../actions'
import {
	breedCatalogInfoStatus,
	breedCatalogImgStatus,
	breedCatalogInfoList,
} from '../../selectors'
import BreedCatalog from './BreedCatalog'

const getBreedsWithImg = createSelector(
	breedCatalogInfoList,
	breeds => breeds.filter(b => b.imgURL !== '')
)

const dataLoaded = createSelector(
	breedCatalogInfoList,
	breeds => breeds.length > 0 && !breeds.some(b => b.imgURL === '')
)

const mapStateToProps = state => ({
	infoStatus: breedCatalogInfoStatus(state),
	imgStatus: breedCatalogImgStatus(state),
	breeds: getBreedsWithImg(state),
	dataLoaded: dataLoaded(state),
})

const mapDispatchToProps = dispatch => ({
	loadCatalog: () => dispatch({ type: ActionTypes.LOAD_BREED_CATALOG }),
	loadNextImage: () =>
		dispatch({ type: ActionTypes.LOAD_NEXT_BREED_IMAGE, count: 20 }),
	setCatalogStatus: status => dispatch(setBreedCatalogStatus(status)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BreedCatalog)
