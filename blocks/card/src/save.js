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
	return (
		<div className="card">
			<img className="card-image" src={ attributes.imageUrl }/>
			<div className="card-body">
				<RichText.Content className="card-heading" tagName="h2" value={ attributes.heading } />
				<RichText.Content className="card-content" tagName="div" value={ attributes.content } />
			</div>
		</div>
	);
}
