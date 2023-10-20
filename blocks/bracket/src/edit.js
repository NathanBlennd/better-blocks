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

import BracketGame from './BracketGame.js';
import { getTeams, numberOfGamesPerRound, numberOfRounds } from './functions.js';

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
					{ [...Array(teams).keys()].map( teamNumber => (
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

				{ (teams > 1 ) &&
					<bracket>
						{ numberOfRounds( teams ).map( round => (
							<round data-round = { round } >
								{ numberOfGamesPerRound( teams, round ).map( game => (
									<BracketGame
										game = { game }
										round = { round }
										teams = { getTeams( teams, teamNames, round, game ) }
									>
									</BracketGame>
								))}
							</round>
						))}
					</bracket>
				}

			</div>
		</>
	);
}
