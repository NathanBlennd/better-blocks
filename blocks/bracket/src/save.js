/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();

	const { teams, teamNames } = attributes;

	function getBaseLog(x, y) {
		return Math.log(y) / Math.log(x);
	}
	let base = 2;

	const logval = getBaseLog( base, teams );

	let numberRounds = Math.ceil( logval );
	let firstRoundGames = 2 ** numberRounds / 2;
	let rounds;
	if( teams > 0 ) {
		rounds = [...Array(numberRounds).keys()];
	}
	let currentGame = 0;
	let currentTeam = 1;

	const numberOfGamesPerRound = function( round ) {
		let numberGames = firstRoundGames;
		while( round > 0 ) {
			numberGames = numberGames / 2;
			round--;
		}
		return [...Array(Math.floor(numberGames)).keys()];
	}

	let shouldPrintTeamName = function(round,currentTeam) {
		return round === 0 && currentTeam <= teams;
	}

	// https://stackoverflow.com/a/11631472/6077935
	const seeding = function(numPlayers){
		var rounds = Math.log(numPlayers)/Math.log(2)-1;
		var pls = [1,2];
		for(var i=0;i<rounds;i++){
			pls = nextLayer(pls);
		}
		return pls;
		function nextLayer(pls){
			var out=[];
			var length = pls.length*2+1;
			pls.forEach(function(d){
				out.push(d);
				out.push(length-d);
			});
			return out;
		}
	}
	const seeds = seeding(teams);

	return (
		<div { ...blockProps }>
			{(teams > 1) &&
				<bracket>
					{rounds.map(round => (
						<round data-round={round}>
							{ numberOfGamesPerRound(round).map( game => (
								<game data-game={currentGame++}>
									<team>
										<teamName>
											{ currentTeam++ && shouldPrintTeamName(round,seeds[ currentTeam - 2  ]) &&
												<>
													<teamRank>
														{ seeds[ currentTeam - 2  ] }
													</teamRank>
													{ teamNames[ seeds[ currentTeam - 2 ] - 1 ] }
												</>
											}
										</teamName>
									</team>
									<team>
										<teamName>
											{ currentTeam++ && shouldPrintTeamName(round,seeds[ currentTeam - 2  ]) &&
												<>
													<teamRank>
														{ seeds[ currentTeam - 2 ] }
													</teamRank>
													{ teamNames[ seeds[ currentTeam - 2 ] - 1 ] }
												</>
											}
										</teamName>
									</team>
								</game>
							))}
						</round>
					))}
				</bracket>
			}
		</div>
	);
}
