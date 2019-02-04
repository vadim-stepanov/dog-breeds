import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { withNamespaces } from 'react-i18next'

const activeClassName = 'active'
const Menu = ({ t }) => (
	<Wrapper>
		<StyledNavLink to="/about" activeClassName={activeClassName}>
			{t('About')}
		</StyledNavLink>
		<StyledNavLink to="/breeds" activeClassName={activeClassName}>
			{t('Dog Breeds')}
		</StyledNavLink>
		<StyledNavLink to="/favorites" activeClassName={activeClassName}>
			{t('Favorites')}
		</StyledNavLink>
		<StyledNavLink to="/used-api" activeClassName={activeClassName}>
			{t('Used API')}
		</StyledNavLink>
	</Wrapper>
)

const Wrapper = styled.nav`
	display: flex;
	flex-direction: column;
	width: 20%;
	height: 45%;
	background-color: ${props => props.theme.backgroundColor};
	text-shadow: 2px 2px 4px #000000;

	a {
		color: white;
		text-align: center;
		padding: 1em;
		font-size: 1.5em;

		&:hover {
			color: #000080;
			text-shadow: none;
		}
	}
`

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
	&.${activeClassName} {
		background-color: white;
		color: ${props => props.theme.backgroundColor};
		text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);

		&:hover {
			text-shadow: none;
		}
	}
`

export default withNamespaces('translations')(Menu)
