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
import { DateTimePicker, PanelBody } from '@wordpress/components';

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
export default function Edit( { attributes, setAttributes }) {

	const { date } = attributes;

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody title={ __( 'Settings', 'better-blocks' ) }>
					<DateTimePicker
						currentDate={ date }
						onChange = { ( newDate ) => { setAttributes( { date: newDate } ) } }
						is12Hour={ true }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div class="countdown" data-date={ date }>
					<div class="card">
						<div class="label">Days</div>
						<div class="days"></div>
					</div>
					<div class="card">
						<div class="label">Hours</div>
						<div class="hours"></div>
					</div>
					<div class="card">
						<div class="label">Minutes</div>
						<div class="minutes"></div>
					</div>
					<div class="card">
						<div class="label">Seconds</div>
						<div class="seconds"></div>
					</div>
				</div>
			</div>
		</>

	);
}


