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
import { MediaPlaceholder, RichText, useBlockProps } from '@wordpress/block-editor';

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
	const mediaPreview = !! attributes.imageUrl && (
		<img src={ attributes.imageUrl } />
	);

	return (
		<div { ...useBlockProps() }>
			<div class="card-image">
				<MediaPlaceholder
					onSelect = {
						( el ) => {
							setAttributes( { imageUrl: el.url } );
						}
					}
					allowedTypes = { [ 'image' ] }
					multiple = { false }
					labels = { { title: 'The Image' } }
					mediaPreview={ mediaPreview }
				/>
			</div>
			<div className="card-body">
				<h2 class="card-header">
					<RichText
						tagName="h2"
						value={ attributes.heading }
						allowedFormats={ [] }
						onChange={ ( heading ) => setAttributes( { heading } ) }
						placeholder={ __( 'Heading...' ) }
					/>
				</h2>
				<div class="card-body">
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
