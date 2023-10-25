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
import { InspectorControls, InnerBlocks, MediaPlaceholder, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RadioControl  } from '@wordpress/components';

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
	const mediaPreview = !! attributes.imageUrl && (
		<img src={ attributes.imageUrl } />
	);

	const { layout } = attributes;

	const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/buttons' ];

	const blockProps = useBlockProps({
		"data-layout": layout
	});

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody title={ __( 'Settings', 'better-blocks' ) }>
					<div className="wp-block-better-blocks-call-to-action">
						<RadioControl
							label= { __( 'Layout', 'better-blocks' ) }
							selected={ layout }
							options={ [
								{ label: '1', value: '1' },
								{ label: '2', value: '2' },
							] }
							onChange={ ( newLayout ) => { setAttributes( { layout: newLayout } ) } }
						/>
					</div>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>

					{ ( ! mediaPreview || isSelected ) &&
						<div class="wp-block-better-blocks-call-to-action__image">
							<MediaPlaceholder
								onSelect = {
									( el ) => {
										setAttributes( { imageUrl: el.url } );
									}
								}
								allowedTypes = { [ 'image' ] }
								multiple = { false }
								labels = { { title: __( 'The Image', 'better-blocks' ) } }
								mediaPreview={ mediaPreview }
							/>
						</div>
					}
					{ ( mediaPreview && ! isSelected ) &&
						<img className="wp-block-better-blocks-call-to-action__image" src={ attributes.imageUrl }/>
					}
				<div className="wp-block-better-blocks-call-to-action__body">
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			</div>
		</>
	);
}
