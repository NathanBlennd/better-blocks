import React from "react";

class BracketTeam extends React.Component {
	render() {
		const { display, name, rank } = this.props;

		return (
			<team>
				<teamName>
					{ display &&
						<>
							<teamRank>
								{ rank }
							</teamRank>
							{ name }
						</>
					}
				</teamName>
			</team>
		)
	}
}

export default BracketTeam
