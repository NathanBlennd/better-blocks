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

	const { final, initial, prefix, suffix, title } = attributes;

	return (
		<div { ...blockProps }>
			<div className="counter" data-initial={initial} data-final={final} data-prefix={prefix} data-suffix={suffix}>
				<div className="counter-number">
					{ prefix &&
						<span className="counter-prefix">
							{ prefix }
						</span>
					}
					<span className="counter-value"/>
					{ suffix && 
						<span className="counter-suffix">
							{ suffix }
						</span>
					}
				</div>
				<div className="counter-title">
					{ title }
				</div>
			</div>
		</div>
	);
}
