import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaTimesCircle } from 'react-icons/fa'
import { withNamespaces } from 'react-i18next'
import BreedCatalogItem from './BreedCatalogItem'
import AutocompleteTextInput from '../common/AutocompleteTextInput'

let lastScrollPos = 0
class BreedCatalog extends React.PureComponent {
	state = {
		selectedBreed: '',
	}

	static propTypes = {
		infoStatus: PropTypes.string.isRequired,
		imgStatus: PropTypes.string.isRequired,
		dataLoaded: PropTypes.bool.isRequired,
		breeds: PropTypes.array.isRequired,
		loadCatalog: PropTypes.func.isRequired,
		loadNextImage: PropTypes.func.isRequired,
		setCatalogStatus: PropTypes.func.isRequired,
	}

	inputRef = React.createRef()
	scrollViewRef = React.createRef()

	componentDidMount() {
		this.props.loadCatalog()

		if (lastScrollPos) {
			this.scrollViewRef.current.scrollTop = lastScrollPos
		}
	}

	componentWillUnmount() {
		lastScrollPos = this.scrollViewRef.current.scrollTop
	}

	onScroll = e => {
		if (!this.props.dataLoaded) {
			if (
				e.target.offsetHeight + e.target.scrollTop ===
				e.target.scrollHeight
			) {
				this.props.loadNextImage()
			}
		}
	}

	onSelect = breed => {
		this.setState({ selectedBreed: breed })
	}

	onReset = () => {
		this.inputRef.current.reset()
		this.setState({ selectedBreed: '' })
	}

	render() {
		const { t } = this.props

		return (
			<>
				<TitleBar>
					<AutocompleteTextInput
						data={this.props.breeds.map(el => el.name)}
						onSelect={this.onSelect}
						placeholder={t('search for a breed...')}
						ref={this.inputRef}
					/>
					<div className="reset-button" onClick={this.onReset}>
						<FaTimesCircle />
					</div>
				</TitleBar>
				<Content innerRef={this.scrollViewRef} onScroll={this.onScroll}>
					{this.props.infoStatus !== 'loaded' ? (
						<div className="loader">Loading ...</div>
					) : this.state.selectedBreed !== '' ? (
						this.props.breeds.map(b =>
							b.name === this.state.selectedBreed ? (
								<BreedCatalogItem key={b.id} {...b} />
							) : null
						)
					) : (
						this.props.breeds.map(b => <BreedCatalogItem key={b.id} {...b} />)
					)}
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

	.reset-button {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 10px;
		font-size: 1.5em;

		svg {
			cursor: pointer;

			&:hover {
				color: #ff0000;
			}
		}
	}
`

const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;

	.loader {
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

export default withNamespaces('translations')(BreedCatalog)
