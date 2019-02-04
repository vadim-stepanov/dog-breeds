import React from 'react'
import styled from 'styled-components'
import { FaGithub } from 'react-icons/fa'

const Footer = () => (
	<Wrapper>
		<Wrapper>
			<a href="https://github.com/vadim-stepanov/dog-breeds/" target="blank">
				<FaGithub />
				<div>GitHub</div>
			</a>
		</Wrapper>
	</Wrapper>
)

const Wrapper = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: center;
	height: 6vh;
	background-color: ${props => props.theme.backgroundColor};
	text-shadow: 2px 2px 4px #000000;

	a {
		display: flex;
		text-decoration: none;
		color: white;
		padding: 0.5em;
		font-size: 1.5em;

		svg {
			margin-top: 2px;
			margin-right: 5px;
		}

		&:hover {
			color: #000080;
			text-shadow: none;
		}
	}
`

export default Footer
