// @see https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/image

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
import { PanelBody, SelectControl, TextControl  } from '@wordpress/components';


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

	const ALLOWED_BLOCKS = [ 'better-blocks/card' ];

	const { size, type } = attributes;

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody title={ __( 'Settings', 'better-blocks' ) }>
					<SelectControl
						label={ __( 'Size', 'better-blocks' ) }
						value={ size }
						options={ [
							{ label: '1', value: '1' },
							{ label: '2', value: '2' },
							{ label: '3', value: '3' },
							{ label: '4', value: '4' },
						] }
						onChange={ ( newSize ) => { setAttributes( { size: newSize } ) } }
					/>
					<TextControl
						label={ __( 'Type', 'better-blocks' ) }
						value={ type }
						onChange={ ( newType ) => { setAttributes( { type: newType } ) } }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() } >
				<div class={"card-deck card-deck-" + size}>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			</div>
		</>
	);
}
