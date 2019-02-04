import React from 'react'
import styled from 'styled-components'
import PuppyImage from '../../assets/404-puppy.png'

const Page404 = ({ location }) => (
	<Wrapper>
		<h1>Resource not found at '{location.pathname}'</h1>
		<img src={PuppyImage} alt="" />
	</Wrapper>
)

const Wrapper = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	margin: 0;
	align-items: center;
	background-color: ghostwhite;
	color: #000090;
	font-size: 4em;
	text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);

	h1 {
		margin-top: 10%;
	}

	img {
		margin-top: 3%;
	}
`

export default Page404
