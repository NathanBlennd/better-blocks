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
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { RawHTML } from '@wordpress/element';
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

// @see https://wordpress.stackexchange.com/questions/406384/how-to-output-child-block-attributes-on-a-parent-block

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();

	const { labels } = attributes;

	return (
		<div { ...blockProps }>
			<ul className="tab-labels" role="tablist" aria-label="tabbed content">
				{labels.map((label, i) => {
					const cleanLabel = cleanForSlug( label ?? '' );
					return ( <li className={i == 0 ? "tab-label active" : "tab-label"} role="tab" aria-selected={i == 0 ? "true" : "false"} aria-controls={cleanLabel} tabindex="0"><RawHTML>{label}</RawHTML></li>);	
				})}
			</ul>
			<InnerBlocks.Content />
		</div>
	);
}
