import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { breedInfoList } from '../../selectors'
import LogoWP from '../../assets/wiki.png'
import LogoAKC from '../../assets/american-kennel-club.png'
import LogoDT from '../../assets/dogtime.png'
import LogoPW from '../../assets/petwave.png'
import LogoPurina from '../../assets/purina.png'

class BreedInfoListItem extends React.PureComponent {
	static propTypes = {
		breed: PropTypes.string.isRequired,
		info: PropTypes.object.isRequired,
	}

	render() {
		return (
			<>
				<Anchor id={this.props.breed} />
				<InfoBlock>
					<h1>{this.props.info.title}</h1>
					<div className="desc">
						<img src={this.props.info.imgUrl} alt="" />
						<p>
							{this.props.info.desc}
							<a href={this.props.info.descUrl} target="blank">
								{' '}
								Read more...
							</a>
						</p>
					</div>
					<h2>Additional info:</h2>
					<div className="logos">
						{this.props.info.wikiUrl && (
							<Logo title="https://en.wikipedia.org/">
								<a href={this.props.info.wikiUrl} target="blank">
									<img src={LogoWP} alt="" />
								</a>
							</Logo>
						)}
						{this.props.info.akcUrl && (
							<Logo title="https://www.akc.org/">
								<a href={this.props.info.akcUrl} target="blank">
									<img src={LogoAKC} alt="" />
								</a>
							</Logo>
						)}
						{this.props.info.dogtimeUrl && (
							<Logo title="https://dogtime.com/">
								<a href={this.props.info.dogtimeUrl} target="blank">
									<img src={LogoDT} alt="" />
								</a>
							</Logo>
						)}
						{this.props.info.petwaveUrl && (
							<Logo title="https://www.petwave.com/">
								<a href={this.props.info.petwaveUrl} target="blank">
									<img src={LogoPW} alt="" />
								</a>
							</Logo>
						)}
						{this.props.info.purinaUrl && (
							<Logo title="https://www.purina.com/">
								<a href={this.props.info.purinaUrl} target="blank">
									<img src={LogoPurina} alt="" />
								</a>
							</Logo>
						)}
					</div>
				</InfoBlock>
			</>
		)
	}
}

const Anchor = styled.a`
	display: block;
	position: relative;
	top: -90px;
	visibility: hidden;
`

const InfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	margin: 20px;
	padding: 20px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

	h1 {
		font-size: 2em;
		color: ${props => props.theme.backgroundColor};
		text-align: center;
		margin: 5px;
	}

	.desc {
		img {
			float: left;
			margin-top: 20px;
			max-height: 100px;
		}

		p {
			font-size: 1.2em;
			color: ${props => props.theme.backgroundColor};
			text-shadow: none;
		}

		a {
			color: blue;
		}
	}

	h2 {
		font-size: 1em;
		color: ${props => props.theme.backgroundColor};
		margin: 5px;
	}

	.logos {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
`

const Logo = styled.div`
	display: flex;
	margin-right: 5px;
	img {
		width: 60px;
	}
`

export default connect((state, ownProps) => ({
	info: breedInfoList(state)[ownProps.breed],
}))(BreedInfoListItem)
