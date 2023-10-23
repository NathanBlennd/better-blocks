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
	register_block_type( BETTER_BLOCKS . '/blocks/accordion-item/' );
	register_block_type( BETTER_BLOCKS . '/blocks/accordion/' );
	register_block_type( BETTER_BLOCKS . '/blocks/bracket/' );
	register_block_type( BETTER_BLOCKS . '/blocks/before-after/' );
	register_block_type( BETTER_BLOCKS . '/blocks/call-to-action/' );
	register_block_type( BETTER_BLOCKS . '/blocks/card/' );
	register_block_type( BETTER_BLOCKS . '/blocks/cards/' );
	register_block_type( BETTER_BLOCKS . '/blocks/countdown/' );
	register_block_type( BETTER_BLOCKS . '/blocks/counter/' );
	register_block_type( BETTER_BLOCKS . '/blocks/custom-post-type/' );
	register_block_type( BETTER_BLOCKS . '/blocks/custom-post-type-archive/' );
	register_block_type( BETTER_BLOCKS . '/blocks/pricing/' );
	register_block_type( BETTER_BLOCKS . '/blocks/pricing-table/' );
	register_block_type( BETTER_BLOCKS . '/blocks/progress/' );
	register_block_type( BETTER_BLOCKS . '/blocks/read-time/' );
	register_block_type( BETTER_BLOCKS . '/blocks/social-share/' );
	register_block_type( BETTER_BLOCKS . '/blocks/tab/' );
	register_block_type( BETTER_BLOCKS . '/blocks/tabs/' );
}
add_action( 'init', __NAMESPACE__ . '\register_block_types' );


function register_block_patterns() {
	register_block_pattern(
		'better-blocks/accordion-image-left',
		[
			'title'      => __( 'Accordion with Image Left', 'better-blocks' ),
			'blockTypes' => [ 'core/image', 'better-blocks/accordion', 'better-blocks/accordion-item' ],
			'content'    => '<!-- wp:columns -->
			<div class="wp-block-columns"><!-- wp:column -->
			<div class="wp-block-column"><!-- wp:image -->
			<figure class="wp-block-image"><img alt=""/></figure>
			<!-- /wp:image --></div>
			<!-- /wp:column -->

			<!-- wp:column -->
			<div class="wp-block-column"><!-- wp:better-blocks/accordion -->
			<div class="wp-block-better-blocks-accordion"><!-- wp:better-blocks/accordion-item -->
			<div class="wp-block-better-blocks-accordion-item accordion-item"><div class="accordion-header" id=""><button class="components-button accordion-button collapsed" type="button" aria-expanded="false" aria-controls=""><span class="heading"></span></button></div><div id="" class="accordion-collapse collapse" aria-labelledby=""><div class="accordion-body"></div></div></div>
			<!-- /wp:better-blocks/accordion-item -->

			<!-- wp:better-blocks/accordion-item -->
			<div class="wp-block-better-blocks-accordion-item accordion-item"><div class="accordion-header" id=""><button class="components-button accordion-button collapsed" type="button" aria-expanded="false" aria-controls=""><span class="heading"></span></button></div><div id="" class="accordion-collapse collapse" aria-labelledby=""><div class="accordion-body"></div></div></div>
			<!-- /wp:better-blocks/accordion-item --></div>
			<!-- /wp:better-blocks/accordion --></div>
			<!-- /wp:column --></div>
			<!-- /wp:columns -->',
		]
	);
	register_block_pattern(
		'better-blocks/accordion-image-right',
		[
			'title'      => __( 'Accordion with Image Right', 'better-blocks' ),
			'blockTypes' => [ 'core/image', 'better-blocks/accordion', 'better-blocks/accordion-item' ],
			'content'    => '<!-- wp:columns -->
			<div class="wp-block-columns"><!-- wp:column {"width":"50%"} -->
			<div class="wp-block-column" style="flex-basis:50%"><!-- wp:better-blocks/accordion -->
			<div class="wp-block-better-blocks-accordion"><!-- wp:better-blocks/accordion-item -->
			<div class="wp-block-better-blocks-accordion-item accordion-item"><div class="accordion-header" id=""><button class="components-button accordion-button collapsed" type="button" aria-expanded="false" aria-controls=""><span class="heading"></span></button></div><div id="" class="accordion-collapse collapse" aria-labelledby=""><div class="accordion-body"></div></div></div>
			<!-- /wp:better-blocks/accordion-item --></div>
			<!-- /wp:better-blocks/accordion --></div>
			<!-- /wp:column -->

			<!-- wp:column {"width":"50%"} -->
			<div class="wp-block-column" style="flex-basis:50%"><!-- wp:image -->
			<figure class="wp-block-image"><img alt=""/></figure>
			<!-- /wp:image --></div>
			<!-- /wp:column --></div>
			<!-- /wp:columns -->',
		]
	);
	register_block_pattern(
		'better-blocks/three-level-pricing',
		[
			'title' => __( 'Three level pricing', 'better-blocks' ),
			'blockTypes' => [ 'core/spacer', 'core/columns', 'core/column', 'better-blocks/pricing', 'core/header', 'core/paragraph', 'core/list', 'core/list-item' ],
			'content' => '<!-- wp:spacer {"height":"6rem"} -->
			<div style="height:6rem" aria-hidden="true" class="wp-block-spacer"></div>
			<!-- /wp:spacer -->

			<!-- wp:columns {"align":"wide"} -->
			<div class="wp-block-columns alignwide"><!-- wp:column -->
			<div class="wp-block-column">
			<!-- wp:better-blocks/pricing -->
			<div class="wp-block-better-blocks-pricing">
			<!-- wp:heading {"textAlign":"center","level":3,"placeholder":"Header"} -->
			<h3 class="wp-block-heading has-text-align-center">Developer</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"align":"center","placeholder":"Price"} -->
			<p class="has-text-align-center">$0</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"align":"center","placeholder":"Summary"} -->
			<p class="has-text-align-center">totally free, start now</p>
			<!-- /wp:paragraph -->

			<!-- wp:list -->
			<ul><!-- wp:list-item -->
			<li>Search</li>
			<!-- /wp:list-item -->

			<!-- wp:list-item -->
			<li>Stuff</li>
			<!-- /wp:list-item -->

			<!-- wp:list-item -->
			<li>Now</li>
			<!-- /wp:list-item --></ul>
			<!-- /wp:list --></div>
			<!-- /wp:better-blocks/pricing --></div>
			<!-- /wp:column -->

			<!-- wp:column -->
			<div class="wp-block-column">
			<!-- wp:better-blocks/pricing {"backgroundColor":"secondary","textColor":"base","className":"featured"} -->
			<div class="wp-block-better-blocks-pricing featured has-base-color has-secondary-background-color has-text-color has-background">
			<!-- wp:heading {"textAlign":"center","level":3,"placeholder":"Header"} -->
			<h3 class="wp-block-heading has-text-align-center">Starter</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"align":"center","placeholder":"Price"} -->
			<p class="has-text-align-center">$199</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"align":"center","placeholder":"Summary"} -->
			<p class="has-text-align-center">best way to start as a business</p>
			<!-- /wp:paragraph -->

			<!-- wp:list -->
			<ul><!-- wp:list-item -->
			<li>Something</li>
			<!-- /wp:list-item --></ul>
			<!-- /wp:list --></div>
			<!-- /wp:better-blocks/pricing --></div>
			<!-- /wp:column -->

			<!-- wp:column -->
			<div class="wp-block-column">
			<!-- wp:better-blocks/pricing -->
			<div class="wp-block-better-blocks-pricing">
			<!-- wp:heading {"textAlign":"center","level":3,"placeholder":"Header"} -->
			<h3 class="wp-block-heading has-text-align-center">Enterprise</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"align":"center","placeholder":"Price"} -->
			<p class="has-text-align-center">$1999</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"align":"center","placeholder":"Summary"} -->
			<p class="has-text-align-center">enterprise-level support</p>
			<!-- /wp:paragraph -->

			<!-- wp:list -->
			<ul><!-- wp:list-item -->
			<li>Shamrock</li>
			<!-- /wp:list-item --></ul>
			<!-- /wp:list --></div>
			<!-- /wp:better-blocks/pricing --></div>
			<!-- /wp:column --></div>
			<!-- /wp:columns -->'
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
				'content'     => '
				<!-- wp:cover {"hasParallax":true,"dimRatio":50,"overlayColor":"contrast","contentPosition":"center center","align":"full","className":"is-light is-position-center-center"} -->
				<div class="wp-block-cover alignfull has-parallax is-light is-position-center-center"><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:columns {"align":"wide"} -->
				<div class="wp-block-columns alignwide"><!-- wp:column {"width":"33.33%"} -->
				<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:heading {"textColor":"base"} -->
				<h2 class="wp-block-heading has-base-color has-text-color"></h2>
				<!-- /wp:heading --></div>
				<!-- /wp:column -->

				<!-- wp:column {"width":"66.66%"} -->
				<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:woocommerce/handpicked-products {"contentVisibility":{"title":true,"price":false,"rating":false,"button":true},"products":[],"alignButtons":true} /--></div>
				<!-- /wp:column --></div>
				<!-- /wp:columns --></div></div>
				<!-- /wp:cover -->',
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
