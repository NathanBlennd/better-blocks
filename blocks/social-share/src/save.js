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
import { select } from '@wordpress/data';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();

	const { networks, share } = attributes;

	const permalink = select( 'core/editor' ).getPermalink();

	const getShareURL = function( network ) {
		let url = encodeURI(permalink);
		let lookup = {
			'facebook': "https://www.facebook.com/sharer/sharer.php?u=" + url,
			'linkedin': "https://www.linkedin.com/shareArticle?url=" + url,
			'twitter': "https://twitter.com/intent/tweet?url=" + url,
			'pinterest': "https://pinterest.com/pin/create/button/?url=" + url
		};
		return lookup[network] ?? '';
	}

	const getShareIcon = function( network ) {
		let url = better_blocks_assets + '/' + network + '.svg';
		let alt = network += ' logo';
		return <img src={url} width="16" height="16" alt={alt} />
	}

	return (
		<div { ...blockProps }>
			<span className="share">{share}</span>
				<ul className="list">
					{networks.map((network) => {
						let shareURL = getShareURL(network);
						let shareIcon = getShareIcon(network);
						return ( <li className="network"><a target="_blank" rel="noopener" href={shareURL}>{shareIcon}</a></li>);	
					})}
				</ul>
		</div>
	);
}
