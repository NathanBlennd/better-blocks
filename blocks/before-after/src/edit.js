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
import { MediaPlaceholder, useBlockProps } from '@wordpress/block-editor';

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
export default function Edit( { attributes, setAttributes, isSelected } ) {
	const blockProps = useBlockProps();
	const media1Preview = !! attributes.image1Url && (
		<img src={ attributes.image1Url } />
	);
	const media2Preview = !! attributes.image2Url && (
		<img src={ attributes.image2Url } />
	);

	return (
		<section { ...blockProps }>
			<div class="card-image">
				{ ( ! media1Preview || isSelected ) &&
					<MediaPlaceholder
						onSelect = {
							( el ) => {
								setAttributes( { image1Url: el.url } );
							}
						}
						allowedTypes = { [ 'image' ] }
						multiple = { false }
						labels = { { title: 'The Image' } }
						mediaPreview={ media1Preview }
					/>
				}
				{ ( media1Preview && ! isSelected ) &&
					<img className="card-image" src={ attributes.image1Url }/>
				}
			</div>
			<div class="card-image">
				{ ( ! media2Preview || isSelected ) &&
					<MediaPlaceholder
						onSelect = {
							( el ) => {
								setAttributes( { image2Url: el.url } );
							}
						}
						allowedTypes = { [ 'image' ] }
						multiple = { false }
						labels = { { title: 'The Image' } }
						mediaPreview={ media2Preview }
					/>
				}
				{ ( media2Preview && ! isSelected ) &&
					<img className="card-image" src={ attributes.image2Url }/>
				}
			</div>
		</section>
	);
}
