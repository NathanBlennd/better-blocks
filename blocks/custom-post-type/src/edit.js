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
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { rawHandler } from '@wordpress/blocks';
import { useEntityRecords } from '@wordpress/core-data';

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

	const { customPostType, posts } = attributes;

	const filteredPostTypes = useSelect( ( select ) => {
		const { getPostTypes } = select( 'core' );
		const excludedPostTypes = [ 'attachment', 'post', 'page' ];
		const filteredPostTypes = getPostTypes( { per_page: -1 } )?.filter(
			( { viewable, slug } ) => viewable && ! excludedPostTypes.includes( slug )
		);
		const result = ( filteredPostTypes || [] ).map(function({slug,name}){
			return {
				'value' : slug ?? '',
				'label' : name ?? ''
			};
		});
		return result;
	}, [] );

	const { hasResolved, records } = useEntityRecords( 'postType', customPostType );

	if( hasResolved === true ) {
		let newPosts = records?.map(function(x){
			return {
				"id": x.id,
				"title": x.title,
				"content": x.content.raw
			};
		})
		if( JSON.stringify( ( posts ) ) !== JSON.stringify( newPosts ) ) {
			setAttributes( { posts: newPosts } )
		}
	}

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody title={ __( 'Settings' ) }>
					<SelectControl
						label="Custom Post Type"
						value={ customPostType }
						options={ [ { value: '', label: 'Select Custom Post Type', disabled: true } ].concat( filteredPostTypes ) }
						onChange={ ( newCustomPostType ) => {
							setAttributes( { customPostType: newCustomPostType } )
							setAttributes( { posts: [] } )
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div>Custom Post Type</div>
				{ records?.map( ( post ) => {
					let content = rawHandler( { HTML: post.content.raw } ).map( ( x ) => x.attributes.content );
					return (
						<div className="custom-post-type">
							<div className="title">{post.title.rendered}</div>
							<div className="content">{content}</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
