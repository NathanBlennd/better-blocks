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

import BracketGame from './BracketGame.js'
import { getTeams, numberOfGamesPerRound, numberOfRounds } from './functions.js';

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

	return (
		<div { ...blockProps }>
			{(teams > 1) &&
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
	);
}
