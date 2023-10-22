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
import { rawHandler } from '@wordpress/blocks';
import { RawHTML } from '@wordpress/element';

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

	const { posts } = attributes;

	return (
		<div { ...blockProps }>
			{ posts?.map( ( post ) => {
				let featured_media = '';
				if( typeof( post.featured_media ) != "undefined" ) {
					featured_media = post.featured_media.description.rendered;
				}
				let content = rawHandler( { HTML: post.content } ).map( ( x ) => x.attributes.content );
				return (
					<div className="wp-block-better-blocks-custom-post-type__item">
						<RawHTML>
							{ featured_media }
						</RawHTML>
						<div className="wp-block-better-blocks-custom-post-type__title">{post.title.rendered}</div>
						<div className="wp-block-better-blocks-custom-post-type__content">{content}</div>
					</div>
				);
			})}
		</div>
	);
}
