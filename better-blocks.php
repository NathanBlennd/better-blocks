<?php
/**
 * Plugin Name:       Better Blocks
 * Description:       Registers custom blocks.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Blennd Ninjas
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       better-blocks
 *
 * @package           better-blocks
 */

declare( strict_types = 1 );
namespace blenndiris\better_blocks;

defined( 'ABSPATH' ) || die;

define( 'BETTER_BLOCKS', __DIR__ );


/**
 * Blocks are grouped into categories to help users browse and discover them.
 * The categories provided by core are `text`, `media`, `design`, `widgets`, and `embed`.
 */
function better_blocks_block_categories_all( $block_categories, $editor_context ) {
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
add_filter( 'block_categories_all', __NAMESPACE__ . '\better_blocks_block_categories_all', 10, 2 );


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function better_blocks_init() {
	register_block_type( BETTER_BLOCKS . '/blocks/accordion-item/' );
	register_block_type( BETTER_BLOCKS . '/blocks/accordion/' );
	register_block_type( BETTER_BLOCKS . '/blocks/card/' );
	register_block_type( BETTER_BLOCKS . '/blocks/cards/' );
	// register_block_type( BETTER_BLOCKS . 'blocks/hero/' );
	// register_block_type( BETTER_BLOCKS . 'blocks/section/' );
}
add_action( 'init', __NAMESPACE__ . '\better_blocks_init' );

function better_blocks_enqueue_block_assets(){
    if ( has_block( 'better-blocks/accordion' ) ) {
		wp_enqueue_script(
			'better/accordion',
			plugins_url( 'dist/accordion.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
    }
}
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\better_blocks_enqueue_block_assets' );
