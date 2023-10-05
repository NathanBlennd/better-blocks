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
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl  } from '@wordpress/components';

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

	const { isFeatured } = attributes;

	const PRICING_TEMPLATE = [
		[ 'core/heading', { placeholder: 'Header', textAlign: 'center', level: '3' } ],
		[ 'core/paragraph', { placeholder: 'Price', align: 'center' } ],
		[ 'core/paragraph', { placeholder: 'Summary', align: 'center' } ],
		[ 'core/separator', { align: 'center' } ],
		[ 'core/list', {} ],
		[ 'core/buttons', {} ],
	];

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody title = { __( 'Settings' ) }>
					<ToggleControl
						label="Featured"
						help={
							isFeatured
								? 'This is a featured pricing'
								: 'This is a normal pricing'
						}
						checked={ isFeatured }
						onChange = { ( newIsFeatured ) => { setAttributes( { isFeatured: newIsFeatured } ) } }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps({
				"data-featured": isFeatured
			}) }>
				<InnerBlocks
					template={ PRICING_TEMPLATE }
					templateLock="all"
				/>
			</div>
		</>
	);
}
