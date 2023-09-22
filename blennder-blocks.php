<?php
/**
 * Plugin Name:       Blennder Blocks
 * Description:       Registers blocks to be used in the Blennder theme.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Blennd Ninjas
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blennder-blocks
 *
 * @package           blennder-blocks
 */

declare( strict_types = 1 );
namespace blenndiris\blennder_blocks;

defined( 'ABSPATH' ) || die;

define( 'BLENNDER_BLOCKS', plugin_dir_path( __FILE__ ) );


/**
 * Blocks are grouped into categories to help users browse and discover them.
 * The categories provided by core are `text`, `media`, `design`, `widgets`, and `embed`.
 */
function blennder_blocks_block_categories_all( $block_categories, $editor_context ) {
	if ( ! empty( $editor_context->post ) ) {
		array_unshift(
			$block_categories,
			[
				'slug'  => 'components',
				'title' => 'Components',
				'icon'  => 'block-default',
			]
		);
	}
	return $block_categories;
}
add_filter( 'block_categories_all', __NAMESPACE__ . '\blennder_blocks_block_categories_all', 10, 2 );


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function blennder_blocks_init() {
	register_block_type( BLENNDER_BLOCKS . 'blocks/accordion-item/' );
	register_block_type( BLENNDER_BLOCKS . 'blocks/accordion/' );
	register_block_type( BLENNDER_BLOCKS . 'blocks/card/' );
	register_block_type( BLENNDER_BLOCKS . 'blocks/cards/' );
	// register_block_type( BLENNDER_BLOCKS . 'blocks/hero/' );
	// register_block_type( BLENNDER_BLOCKS . 'blocks/section/' );
}
add_action( 'init', __NAMESPACE__ . '\blennder_blocks_init' );

function register_script() {
	wp_enqueue_script(
		'blennder/accordion',
		plugins_url( 'dist/accordion.js', __FILE__ ),
		[],
		'0.1.0',
		true
	);
}
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\register_script' );
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\register_script' );
