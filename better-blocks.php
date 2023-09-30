<?php
/**
 * Plugin Name:       Better Blocks
 * Plugin URI:        https://atmoz.org/better-blocks/
 * Description:       Registers custom blocks.
 * Version:           0.1.0
 * Requires at least: 6.3
 * Requires PHP:      8.2
 * Author:            Nathan Johnson
 * Author URI:        https://atmoz.org/
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       better-blocks
 * Domain Path:       /languages
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
	register_block_type( BETTER_BLOCKS . '/blocks/before-after/' );
	register_block_type( BETTER_BLOCKS . '/blocks/card/' );
	register_block_type( BETTER_BLOCKS . '/blocks/cards/' );
	register_block_type( BETTER_BLOCKS . '/blocks/social-share/' );
	register_block_type( BETTER_BLOCKS . '/blocks/tab/' );
	register_block_type( BETTER_BLOCKS . '/blocks/tabs/' );
}
add_action( 'init', __NAMESPACE__ . '\better_blocks_init' );

function better_blocks_enqueue_block_assets(){
    if ( has_block( 'better-blocks/accordion' ) ) {
		wp_enqueue_script(
			'better/accordion',
			plugins_url( 'dist/accordion/ts/accordion.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
    }
	if ( has_block( 'better-blocks/before-after' ) ) {
		wp_enqueue_script(
			'better/before-after',
			plugins_url( 'dist/before-after/ts/before-after.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
    }
	if ( has_block( 'better-blocks/tabs' ) ) {
		wp_enqueue_script(
			'better/tabs',
			plugins_url( 'dist/tabs/ts/tabs.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
    }
	if ( is_admin() && has_block( 'better-blocks/social-share' ) ) {
		wp_enqueue_script(
			'better/social-share',
			plugins_url( 'dist/social-share/ts/social-share.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
		$url = plugins_url( 'assets', __FILE__ );
		$script = 'better_blocks_assets = '. json_encode( $url ) . ';';
		wp_add_inline_script ( 'better/social-share', $script, 'before' );
    }
}
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\better_blocks_enqueue_block_assets' );
