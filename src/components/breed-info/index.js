import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { breedInfoBreeds } from '../../selectors'
import BreedInfoListItem from './BreedInfoListItem'

class BreedInfoList extends React.PureComponent {
	static propTypes = {
		breeds: PropTypes.array.isRequired,
	}

	render() {
		return (
			<>
				{this.props.breeds.map(el => (
					<BreedInfoListItem key={el} breed={el} />
				))}
			</>
		)
	}
}

export default connect(state => ({ breeds: breedInfoBreeds(state) }))(
	BreedInfoList
)
