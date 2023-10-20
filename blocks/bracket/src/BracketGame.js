import React from "react";
import BracketTeam from './BracketTeam.js'

class BracketGame extends React.Component {
	render() {
		const { game, teams, round } = this.props;

		return (
			<game data-game={ game } data-round={ round }>
				{ teams.length === 2 &&
					<>
						{ teams.map( team => (
							<BracketTeam
								display = { team.display }
								name = { team.name }
								rank = { team.rank }
							/>
						))}
					</>
				}
			</game>
		)
	}
}

export default BracketGame
