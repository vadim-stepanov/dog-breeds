import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Progress } from 'react-sweet-progress'
import 'react-sweet-progress/lib/style.css'
import { breedInfoLoadingProgress } from '../../selectors'
import PuppyImage from '../../assets/loader-puppy.png'
import { connect } from 'react-redux'

const HomePageLoader = ({ loadingProgress }) => (
	<Wrapper>
		<img src={PuppyImage} alt="" />
		<Progress type="circle" percent={loadingProgress} width={70} />
	</Wrapper>
)

HomePageLoader.propTypes = {
	loadingProgress: PropTypes.string.isRequired,
}

const Wrapper = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	margin: 0;
	justify-content: center;
	align-items: center;
	background-color: ghostwhite;
	color: #000090;
	font-size: 4em;
	//text-shadow: 4px 4px 2px rgba(150, 150, 150, 1);
	text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);

	img {
		max-width: 50%;
		max-height: 50%;
	}

	div {
		margin-top: 3%;
		text-shadow: none;
	}
`

export default connect(state => ({
	loadingProgress: Number(breedInfoLoadingProgress(state)).toFixed(),
}))(HomePageLoader)
