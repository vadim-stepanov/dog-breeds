import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaEllipsisV } from 'react-icons/fa'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { setLanguage, setTheme } from '../../actions'
import { language, theme } from '../../selectors'

class LangAndThemeSwitcher extends React.PureComponent {
	static propTypes = {
		language: PropTypes.string.isRequired,
		theme: PropTypes.string.isRequired,
		setLanguage: PropTypes.func.isRequired,
		setTheme: PropTypes.func.isRequired,
	}

	componentDidMount() {
		if (this.props.i18n.language === undefined) {
			this.props.i18n.changeLanguage(this.props.language)
		}
	}

	onChangeLanguage = (i18n, e) => {
		i18n.changeLanguage(e.target.value)
		this.props.setLanguage(e.target.value)
	}

	onChangeTheme = e => {
		this.props.setTheme(e.target.value)
	}

	render() {
		const { t, i18n } = this.props

		return (
			<Wrapper>
				<FaEllipsisV />
				<div className="switch-container">
					<div className="rb-group">
						<input
							type="radio"
							value="en"
							name="lang"
							checked={this.props.language === 'en'}
							onChange={e => this.onChangeLanguage(i18n, e)}
						/>{' '}
						{t('en')}
						<input
							type="radio"
							value="ru"
							name="lang"
							checked={this.props.language === 'ru'}
							onChange={e => this.onChangeLanguage(i18n, e)}
						/>{' '}
						{t('ru')}
					</div>
					<div className="rb-group" onChange={this.onChangeTheme}>
						<input
							type="radio"
							value="gray"
							name="theme"
							checked={this.props.theme === 'gray'}
							onChange={this.onChangeTheme}
						/>{' '}
						{t('gray')}
						<input
							type="radio"
							value="blue"
							name="theme"
							checked={this.props.theme === 'blue'}
							onChange={this.onChangeTheme}
						/>{' '}
						{t('blue')}
					</div>
				</div>
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	svg {
		fill: #506171;
		height: 30px;
	}

	.switch-container {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		margin-right: 15px;
	}

	.rb-group {
		display: flex;
		flex-direction: row;
		color: #d3d3d3;
		text-shadow: none;
		box-shadow: none;
	}
`

export default connect(
	state => ({ language: language(state), theme: theme(state) }),
	{
		setLanguage,
		setTheme,
	}
)(withNamespaces('translations')(LangAndThemeSwitcher))
