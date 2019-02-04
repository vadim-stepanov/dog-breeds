import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { FaHome } from 'react-icons/fa'
import { withNamespaces } from 'react-i18next'
import LangAndThemeSwitcher from '../../common/LangAndThemeSwitcher'

const activeClassName = 'active'
const Header = ({ t, theme }) => (
	<Wrapper>
		<NavLink to="/" className="home-icon">
			<FaHome />
		</NavLink>
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
		<LangAndThemeSwitcher />
	</Wrapper>
)

const Wrapper = styled.nav`
	display: flex;
	flex-direction: row;
	height: 6vh;
	background-color: ${props => props.theme.backgroundColor};
	text-shadow: 2px 2px 4px #000000;

	a {
		width: calc(100% - 1em);
		text-align: center;
		text-decoration: none;
		color: white;
		padding: 0.5em;
		font-size: 1.5em;

		&:hover {
			color: #000080;
			text-shadow: none;
		}
	}

	a.home-icon {
		svg:hover {
			fill: #00ff00;
		}
		margin-left: 19px;
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

export default withNamespaces('translations')(Header)
