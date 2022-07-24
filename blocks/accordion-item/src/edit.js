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
export default function Edit( { attributes, setAttributes, context } ) {

	setAttributes( { parentId: context[ 'blennder-blocks/accordionId' ] } );

	const md5 = require( 'md5' );

	const blockProps = useBlockProps.save();
	const cleanHeading = cleanForSlug( attributes.heading );
	const contentID = 'id-' + md5( attributes.content );
	const contentTarget = '#' + contentID;

	const { parentId } = attributes;
	const id = '#' + cleanForSlug( parentId );

	return (
		<div { ...useBlockProps() }>
			<div class="accordion-item">
				<h2 class="accordion-header" id={ cleanHeading }>
					<button class="components-button accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={ contentTarget } aria-expanded="false" aria-controls={ cleanHeading }>
					<RichText
						tagName="h2"
						value={ attributes.heading }
						allowedFormats={ [] }
						onChange={ ( heading ) => setAttributes( { heading } ) }
						placeholder={ __( 'Heading...' ) }
					/>
					</button>
				</h2>
				<div id={ contentID } class="accordion-collapse collapse" aria-labelledby={ cleanHeading } data-bs-parent={ id }>
				<RichText
					tagName="p"
					value={ attributes.content }
					allowedFormats={ [] }
					onChange={ ( content ) => setAttributes( { content } ) }
					placeholder={ __( 'Content...' ) }
				/>
				</div>
			</div>
		</div>
	);
}
