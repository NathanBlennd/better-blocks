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
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { select } from '@wordpress/data';

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

	const { networks, permalink, share } = attributes;

	let newPermalink = select( 'core/editor' ).getPermalink();
	setAttributes( { permalink: newPermalink } );

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
		<>
			<InspectorControls key="setting">
				<PanelBody title={ __( 'Settings', 'better-blocks' ) }>
					<SelectControl
						multiple
						label={ __( 'Networks', 'better-blocks' ) }
						value={ networks }
						options={ [
							{ label: __( 'Facebook', 'better-blocks' ), value: 'facebook' },
							{ label: __( 'Linkedin', 'better-blocks' ), value: 'linkedin' },
							{ label: __( 'Twitter', 'better-blocks' ), value: 'twitter' },
							{ label: __( 'Pinterest', 'better-blocks' ), value: 'pinterest' },
						] }
						onChange={ ( newNetworks ) => { setAttributes( { networks: newNetworks } ) } }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ ( ! Array.isArray(networks) || ! networks.length > 0 ) &&
					<p>Select networks in side panel</p>
				}
				{ (Array.isArray(networks) && networks.length > 0 ) &&
					<>
						<RichText
							tagName="span"
							className="share"
							value={ share }
							allowedFormats={ [] }
							onChange={ ( newShare ) => { setAttributes( { share: newShare } ) } }
							placeholder={ __( 'Share: ' ) }
						/>
						<ul className="list">
							{networks.map((network) => {
								let shareURL = getShareURL(network);
								let shareIcon = getShareIcon(network);
								return ( <li className="network"><a target="_blank" rel="noopener" href={shareURL}>{shareIcon}</a></li>);
							})}
						</ul>
					</>
				}
			</div>
		</>
	);
}
