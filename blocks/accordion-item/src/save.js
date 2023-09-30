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
import { RichText, useBlockProps } from '@wordpress/block-editor';

import { cleanForSlug } from '@wordpress/url';

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
	const cleanHeading = cleanForSlug( attributes.heading ?? '' );
	const cleanContent = cleanForSlug( attributes.content ?? '' );

	blockProps.className += ' accordion-item';
	return (
		<div { ...blockProps }>
			<h2 class="accordion-header" id={ cleanHeading }>
				<button class="components-button accordion-button collapsed" type="button" aria-expanded="false" aria-controls={ cleanContent }>
					<RichText.Content className="heading" tagName="h2" value={ attributes.heading } />
				</button>
			</h2>
			<div id={ cleanContent} class="accordion-collapse collapse" aria-labelledby={ cleanHeading }>
				<RichText.Content className="accordion-body" tagName="div" value={ attributes.content } />
			</div>
		</div>
	);
}
