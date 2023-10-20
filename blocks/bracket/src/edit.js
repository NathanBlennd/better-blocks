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
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

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
	let teamsArray =[...Array(teams).keys()];
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
		<>
			<InspectorControls key="setting">
				<PanelBody title={ __( 'Settings' ) }>
					<NumberControl
						isShiftStepEnabled = { true }
						label = "Number of Teams"
						max = { 64 }
						min = { 2 }
						onChange = { ( newTeams ) => { setAttributes( { teams: newTeams } ) } }
						shiftStep = { 10 }
						step = { 1 }
						value = { teams }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Teams' ) } initialOpen={ false } >
					{teamsArray.map( teamNumber => (
						<TextControl
							label = { "Team Ranked " + ( teamNumber + 1 ) }
							onChange = { ( newTeam ) => {
								let newTeamNames = [...teamNames];
								newTeamNames[teamNumber] = newTeam;
								setAttributes( { teamNames: newTeamNames } )
							} }
							value = { teamNames[teamNumber] }
						/>
					))}
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>

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
		</>
	);
}
