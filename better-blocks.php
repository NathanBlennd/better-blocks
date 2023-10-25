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
namespace better_blocks\better_blocks;

defined( 'ABSPATH' ) || die;

define( 'BETTER_BLOCKS', __DIR__ );

require __DIR__ . '/functions.php';

/**
 * Blocks are grouped into categories to help users browse and discover them.
 * The categories provided by core are `text`, `media`, `design`, `widgets`, and `embed`.
 */
function add_block_categories( $block_categories, $editor_context ) {
	if ( ! empty( $editor_context->post ) ) {

		array_unshift(
			$block_categories,
			[
				'slug' => 'interactive',
				'title' => 'Interactive',
				'icon' => '',
			],
			[
				'slug' => 'content',
				'title' => 'Content',
				'icon' => 'dashicons-editor-ul',
			]
		);
	}
	return $block_categories;
}
add_filter( 'block_categories_all', __NAMESPACE__ . '\add_block_categories', 10, 2 );


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function register_block_types() {
	$blocks = array_filter( glob( BETTER_BLOCKS . '/blocks/*'), 'is_dir' );
	foreach( $blocks as $block ) {
		register_block_type( $block );
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block_types' );


function register_block_patterns() {
	register_block_pattern(
		'better-blocks/accordion-image-left',
		[
			'title'      => __( 'Accordion with Image Left', 'better-blocks' ),
			'blockTypes' => [ 'core/image', 'better-blocks/accordion', 'better-blocks/accordion-item' ],
		]
	);
	register_block_pattern(
		'better-blocks/accordion-image-right',
		[
			'title'      => __( 'Accordion with Image Right', 'better-blocks' ),
			'blockTypes' => [ 'core/image', 'better-blocks/accordion', 'better-blocks/accordion-item' ],
		]
	);
	register_block_pattern(
		'better-blocks/three-level-pricing',
		[
			'title' => __( 'Three level pricing', 'better-blocks' ),
			'blockTypes' => [ 'core/spacer', 'core/columns', 'core/column', 'better-blocks/pricing', 'core/header', 'core/paragraph', 'core/list', 'core/list-item' ],
		]
	);

	if( class_exists( 'WooCommerce') ) {
		register_block_pattern(
			'better-blocks/woocommerce-products-cover',
			[
				'title'       => __( 'WooCommerce Products Cover', 'better-blocks' ),
				'categories'  => [ 'shop' ],
				'keywords'    => [ __( 'Shop', 'better-blocks' ) ],
				'description' => __( 'A handpicked products section with a full background image.', 'better-blocks' ),
			]
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block_patterns' );

function register_block_pattern_categories() {
	register_block_pattern_category( 'shop', [ 'label' => __( 'Shop', 'better-blocks' ) ] );
}
add_action( 'init', __NAMESPACE__ . '\register_block_pattern_categories' );

function enqueue_block_assets(){
	if ( is_admin() || has_block( 'better-blocks/accordion' ) ) {
		wp_enqueue_script(
			'better-blocks/accordion',
			plugins_url( 'dist/accordion/ts/accordion.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
	}
	if ( has_block( 'better-blocks/before-after' ) ) {
		wp_enqueue_script(
			'better-blocks/before-after',
			plugins_url( 'dist/before-after/ts/before-after.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
	}
	if ( has_block( 'better-blocks/countdown' ) ) {
		wp_enqueue_script(
			'better-blocks/countdown',
			plugins_url( 'dist/countdown/ts/countdown.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
	}
	if ( has_block( 'better-blocks/counter' ) ) {
		wp_enqueue_script(
			'better-blocks/counter',
			plugins_url( 'dist/counter/ts/counter.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
	}
	if ( has_block( 'better-blocks/custom-post-type-archive' ) ) {
		wp_enqueue_script(
			'better-blocks/custom-post-type-archive',
			plugins_url( 'dist/custom-post-type-archive/ts/custom-post-type-archive.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
	}
	if ( has_block( 'better-blocks/progress' ) ) {
		wp_enqueue_script(
			'better-blocks/progress',
			plugins_url( 'dist/progress/ts/progress.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
	}
	if ( has_block( 'better-blocks/tabs' ) ) {
		wp_enqueue_script(
			'better-blocks/tabs',
			plugins_url( 'dist/tabs/ts/tabs.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
	}
	if ( is_admin() ) {
		wp_enqueue_script(
			'better-blocks/social-share',
			plugins_url( 'dist/social-share/ts/social-share.js', __FILE__ ),
			[],
			'0.1.0',
			true
		);
		$url = plugins_url( 'assets', __FILE__ );
		$script = 'better_blocks_assets = '. json_encode( $url ) . ';';
		wp_add_inline_script ( 'better-blocks/social-share', $script, 'before' );
	}
}
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_block_assets' );

function wpdocs_add_dashboard_widgets() {
	wp_add_dashboard_widget( 'dashboard_widget', 'Better Blocks', __NAMESPACE__ . '\dashboard_widget_function' );
}
add_action( 'wp_dashboard_setup', __NAMESPACE__ . '\wpdocs_add_dashboard_widgets' );

function dashboard_widget_function( $post, $callback_args ) {
	$better_blocks = find_better_blocks();
	ksort( $better_blocks );
	esc_html_e( 'The following blocks are currently used on this site:', 'better-blocks' );
	echo '<ul>';
	foreach( $better_blocks as $key => $block ) {
		$key = str_replace( 'better-blocks/', '', $key );
		$pages = count( $block[ 'pages' ] );
		$t = _n( 'time', 'times', $block[ 'count' ], 'better-blocks' );
		$p = _n( 'page', 'pages', $pages, 'better-blocks' );
		echo "<li>$key: used {$block[ 'count' ]} $t on $pages $p</li>";
	}
	echo '</ul>';
}
