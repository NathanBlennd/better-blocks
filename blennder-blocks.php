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
add_filter( 'block_categories_all', 'blennder_blocks_block_categories_all', 10, 2 );


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function blennder_blocks_init() {
	register_block_type( BLENNDER_BLOCKS . 'blocks/accordion/' );
	register_block_type( BLENNDER_BLOCKS . 'blocks/hero/' );
	register_block_type( BLENNDER_BLOCKS . 'blocks/section/' );
	register_block_type( BLENNDER_BLOCKS . 'blocks/swiper/' );
}
add_action( 'init', 'blennder_blocks_init' );


/**
 * Enqueues the frontend scripts.
 */
function blennder_blocks_enqueue_scripts() {
	wp_enqueue_script( 'blennder-blocks-swiper', plugins_url( '/dist/swiper.js' , __FILE__ ), null, false, true );
}
add_action( 'wp_enqueue_scripts', 'blennder_blocks_enqueue_scripts' );

function add_type_attribute($tag, $handle, $src) {
	// if not your script, do nothing and return original $tag
	if ( 'blennder-blocks-swiper' !== $handle ) {
			return $tag;
	}
	// change the script tag by adding type="module" and return it.
	$tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
	return $tag;
}
add_filter( 'script_loader_tag', 'add_type_attribute' , 10, 3 );
