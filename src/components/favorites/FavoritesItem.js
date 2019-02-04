import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import styled from 'styled-components'
import { FaTrash, FaInfoCircle } from 'react-icons/fa'
import { withNamespaces } from 'react-i18next'

const FavoritesItem = ({ breed, url, timestamp, remove, t }) => {
	const onClick = () => remove(url)

	return (
		<Wrapper>
			<div className="title">
				<Link to={`/breeds/${breed}`}>
					<p>{breed}</p>
				</Link>
				<HashLink
					to={`/#${breed}`}
					scroll={el =>
						el.scrollIntoView({ behavior: 'instant', block: 'start' })
					}
				>
					<FaInfoCircle />
				</HashLink>
			</div>
			<div className="img-container">
				<div
					style={{ background: `url(${url}) center center / cover no-repeat` }}
				/>
			</div>

			<div className="favorites-panel">
				<div className="date">{new Date(timestamp).toLocaleString()}</div>
				<label title={t('remove from favorites')}>
					<div className="remove">
						<FaTrash onClick={onClick} />
					</div>
				</label>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 400px;
	height: 340px;
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
			height: 100%;
			width: 100%;

			transition: all 0.2s ease-in-out;
			&:hover {
				transform: scale(1.1);
			}
		}
	}

	.favorites-panel {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0 10px 0 10px;

		.date {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1em;
			color: white;
			text-shadow: 2px 2px 4px #000000;
		}

		.remove {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 2em;
			color: white;

			svg {
				cursor: pointer;

				&:hover {
					color: #ff0000;
				}
			}
		}
	}
`

export default withNamespaces('translations')(FavoritesItem)
