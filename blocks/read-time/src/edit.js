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
import { useBlockProps } from '@wordpress/block-editor';

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

	const { readTime } = attributes;

	let numberOfImages = 0;
	let numberOfWords = 0;
	let readingTime = 0;

	let blocks = wp.data.select( 'core/block-editor' ).getBlocks();

	function getWordCount( content ) {
		var getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;
		let nodeList = getNodes(content);
		var wordCount = 0;
		for ( var i = 0; i < nodeList.length; i++ ) {
			wordCount += nodeList[i].textContent.trim().split(' ').length;
		}
		return wordCount;
	}

	blocks.forEach( function( block ) {
		if( 'core/image' === block.name ) {
			numberOfImages++;
		}
		numberOfWords += getWordCount( block.originalContent );
	});

	readingTime = (numberOfWords / 238) + (numberOfImages * 0.083);
	readingTime = Math.ceil(readingTime);

	setAttributes( { readTime: readingTime } );

	return (
		<div { ...useBlockProps() }>
			<p>Estimated Reading Time: { readTime } minutes</p>
		</div>
	);
}
