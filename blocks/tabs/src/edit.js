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
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';


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

	const ALLOWED_BLOCKS = [ 'better-blocks/tab' ];

	const { labels, updateChild } = attributes;

	const buildTabLabelsArray = () => {
		const parentBlockID = clientId;
		const { innerBlockCount } = useSelect(select => ({
			innerBlockCount: select('core/block-editor').getBlockCount(parentBlockID)
		}));

		var tabLabels = [];
		
		for (let block = 0; block < innerBlockCount; block++) {
			let tabLabel = wp.data.select( 'core/block-editor' ).getBlocks( parentBlockID )[block].attributes.label;
			tabLabels.push(tabLabel);
		}
	
		return tabLabels;
	}

	var labelsArray = buildTabLabelsArray();
	var labelLengthChange = labelsArray.length !== labels.length;
	
	if( labelLengthChange || updateChild ){
		setAttributes ({ labels: labelsArray  });
		setAttributes ({ updateChild: false });
	}

	return (
		<div { ...useBlockProps() } >
			<ul className="tab-labels" role="tablist" aria-label="tabbed content">
				{labels.map((label, i) => {
					return ( <li className={i == 0 ? "tab-label active" : "tab-label"} role="tab" aria-selected={i == 0 ? "true" : "false"} aria-controls={label} tabindex="0"><RawHTML>{label}</RawHTML></li>);	
				})}
			</ul>
			<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
		</div>
	);
}
