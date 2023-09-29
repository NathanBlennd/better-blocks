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
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl  } from '@wordpress/components';

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
export default function Edit( { attributes, setAttributes, clientId } ) {

	const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/buttons' ];

	const { label } = attributes;

	const parentBlockID = wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName( clientId, [ 'better-blocks/tabs' ] );
	const getBlockIndex = wp.data.select( 'core/block-editor' ).getBlockOrder( parentBlockID[0] ).indexOf( clientId );

	const onChangeTabLabel = newLabel => {
		setAttributes( { label: newLabel} );
		setAttributes( { index: getBlockIndex } );
		wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( parentBlockID, { updateChild: true } );
	};


	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<TextControl
						label="Label"
						value={ label }
						onChange={onChangeTabLabel}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		</>
	);
}
