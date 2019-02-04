import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaArrowLeft } from 'react-icons/fa'
import DogListItem from './DogListItem'
import withScrollTopButton from '../common/ScrollTopButton'
import { withRouter } from 'react-router-dom'

class DogList extends React.PureComponent {
	static propTypes = {
		breedName: PropTypes.string.isRequired,
		infoStatus: PropTypes.string.isRequired,
		dogList: PropTypes.array.isRequired,
		scrollViewRef: PropTypes.object.isRequired,
		onScroll: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.props.loadDogList(this.props.breedName)
	}

	onAddToFavorites = url => this.props.markAsFavorite(url, this.props.breedName)

	goBack = () => this.props.history.goBack()

	render() {
		return (
			<>
				<TitleBar onClick={this.goBack}>
					<FaArrowLeft />
					<div>back</div>
				</TitleBar>
				<Content
					innerRef={this.props.scrollViewRef}
					onScroll={this.props.onScroll}
				>
					{this.props.infoStatus === 'loading' && (
						<div className="status">Loading ...</div>
					)}
					{this.props.infoStatus === 'error' && (
						<div className="status">Oops... Nothing found (:</div>
					)}
					{this.props.infoStatus === 'loaded' &&
						this.props.dogList.map(el => (
							<DogListItem
								key={el.id}
								imgURL={el.url}
								favorite={el.favorite}
								addToFavorites={this.onAddToFavorites}
							/>
						))}
				</Content>
			</>
		)
	}
}

const TitleBar = styled.div`
	display: flex;
	flex-direction: row;
	height: 50px;
	line-height: 50px;
	font-size: 1.5em;
	color: white;
	background-color: ${props => props.theme.backgroundColor};
	text-shadow: 2px 2px 4px #000000;
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
	margin: 0 0 5px 15px;
	cursor: pointer;

	&:hover {
		color: #00ff00;
	}

	svg {
		margin: 14px 10px 0 10px;
	}
`

const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;

	.status {
		width: 100%;
		height: 100%;
		font-size: 3em;
		color: ${props => props.theme.backgroundColor};
		text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}
`

export default withRouter(
	withScrollTopButton({ bottom: 100, right: 50 })(DogList)
)
