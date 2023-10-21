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
	const { date } = attributes;

	return (
		<div { ...blockProps }>
			<div class="countdown" data-date={ date }>
				<div class="card">
					<div class="label">Days</div>
					<div class="days"></div>
				</div>
				<div class="card">
					<div class="label">Hours</div>
					<div class="hours"></div>
				</div>
				<div class="card">
					<div class="label">Minutes</div>
					<div class="minutes"></div>
				</div>
				<div class="card">
					<div class="label">Seconds</div>
					<div class="seconds"></div>
				</div>
			</div>
		</div>
	);
}
