import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import styled from 'styled-components'
import { FaInfoCircle } from 'react-icons/fa'

const BreedCatalogItem = ({ name, imgURL }) => {
	return (
		<Wrapper>
			<div className="title">
				<Link to={`/breeds/${name}`}>
					<p>{name}</p>
				</Link>
				<HashLink
					to={`/#${name}`}
					scroll={el =>
						el.scrollIntoView({ behavior: 'instant', block: 'start' })
					}
				>
					<FaInfoCircle />
				</HashLink>
			</div>
			<div className="img-container">
				<div
					style={{
						background: `url(${imgURL}) center center / cover no-repeat`,
					}}
				/>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 400px;
	height: 300px;
	background-color: ${props => props.theme.backgroundColor};
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
	margin: 15px;

	.title {
		display: flex;
		flex-direction: row;
		justify-content: center;

		a:nth-child(1) {
			flex: 2;
			color: white;
			&:hover {
				color: #00ff00;
			}
		}

		svg {
			cursor: pointer;
			color: white;
			width: 20px;
			height: 20px;
			margin-top: 5px;
			margin-right: 5px;
			&:hover {
				color: #0000ff;
			}
		}

		p {
			font-size: 2em;
			text-align: center;
			text-shadow: 2px 2px 4px #000000;
			padding-top: 3px;
			margin: 0;
		}
	}

	.img-container {
		margin: 10px;
		height: 240px;
		width: 380px;
		box-sizing: inherit;

		overflow: hidden;

		div {
			height: 130%;
			width: 130%;

			transition: all 0.2s ease-in-out;
			&:hover {
				transform: scale(0.9) translate(-28px, -20px);
			}
		}
	}
`

export default BreedCatalogItem
