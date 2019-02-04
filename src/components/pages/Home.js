import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Parallax } from 'react-parallax'
import { withNamespaces } from 'react-i18next'
import { breedInfoStatus } from '../../selectors'
import BackgroundImage from '../../assets/background-home.jpg'
import { ActionTypes } from '../../utils/constants'
import BreedInfoList from '../breed-info'
import HomePageLoader from '../common/HomePageLoader'
import LangAndThemeSwitcher from '../common/LangAndThemeSwitcher'

class Home extends React.PureComponent {
	state = {
		showLoader: this.props.breedInfoStatus === 'notset',
		loaderVisible: true,
	}

	static propTypes = {
		breedInfoStatus: PropTypes.string.isRequired,
		loadBreedInfo: PropTypes.func.isRequired,
	}

	componentDidMount() {
		if (this.props.breedInfoStatus !== 'loaded') {
			this.props.loadBreedInfo()
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.breedInfoStatus === 'loaded' &&
			prevProps.breedInfoStatus !== 'loaded' &&
			prevState.showLoader
		) {
			this.setState({ loaderVisible: false })
			setTimeout(() => {
				this.setState({ showLoader: false })
			}, 2000)
		}
	}

	render() {
		if (this.state.showLoader) {
			return (
				<Fade out={!this.state.loaderVisible}>
					<HomePageLoader />
				</Fade>
			)
		} else {
			const { t } = this.props
			return (
				<Wrapper>
					<Parallax bgImage={BackgroundImage} strength={600}>
						<div className="plx-image" />
					</Parallax>
					<nav>
						<Link to="about" className="left-el">
							{t('About')}
						</Link>
						<Link to="breeds">{t('Dog Breeds')}</Link>
						<Link to="favorites">{t('Favorites')}</Link>
						<Link to="used-api">{t('Used API')}</Link>
						<LangAndThemeSwitcher />
					</nav>
					<BreedInfoList />
				</Wrapper>
			)
		}
	}
}

const fadeInAnimation = keyframes`${fadeIn}`
const fadeOutAnimation = keyframes`${fadeOut}`
const Fade = styled.div`
	visibility: ${props => (props.out ? 'hidden' : 'visible')};
	animation: ${props => (props.out ? fadeOutAnimation : fadeInAnimation)} 2s
		linear;
	transition: visibility 2s linear;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	background-color: #fffaf0;

	.plx-image {
		height: 87vh;
	}

	.left-el {
		margin-left: 20%;
	}

	nav {
		background-color: ${props => props.theme.backgroundColor};
		padding: 1em;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
		text-shadow: 2px 2px 4px #000000;

		position: sticky;
		top: 0;

		margin-bottom: 30px;

		a {
			font-size: 2em;
			color: white;
			flex-basis: 200px;

			&:hover {
				color: #000080;
				text-shadow: none;
			}
		}
	}

	animation: fadein 2s;
	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`

export default connect(
	state => ({ breedInfoStatus: breedInfoStatus(state) }),
	dispatch => ({
		loadBreedInfo: () => dispatch({ type: ActionTypes.LOAD_BREED_INFO }),
	})
)(withNamespaces('translations')(Home))
