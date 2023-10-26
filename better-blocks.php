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

function register_post_types() {
	$labels = array(
		'name'                  => _x( 'Projects', 'Post type general name', 'better-blocks' ),
		'singular_name'         => _x( 'Project', 'Post type singular name', 'better-blocks' ),
		'menu_name'             => _x( 'Projects', 'Admin Menu text', 'better-blocks' ),
		'name_admin_bar'        => _x( 'Project', 'Add New on Toolbar', 'better-blocks' ),
		'add_new'               => __( 'Add New', 'better-blocks' ),
		'add_new_item'          => __( 'Add New Project', 'better-blocks' ),
		'new_item'              => __( 'New Project', 'better-blocks' ),
		'edit_item'             => __( 'Edit Project', 'better-blocks' ),
		'view_item'             => __( 'View Project', 'better-blocks' ),
		'all_items'             => __( 'All Projects', 'better-blocks' ),
		'search_items'          => __( 'Search Projects', 'better-blocks' ),
		'parent_item_colon'     => __( 'Parent Projects:', 'better-blocks' ),
		'not_found'             => __( 'No projects found.', 'better-blocks' ),
		'not_found_in_trash'    => __( 'No projects found in Trash.', 'better-blocks' ),
		'featured_image'        => _x( 'Project Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'better-blocks' ),
		'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'better-blocks' ),
		'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'better-blocks' ),
		'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'better-blocks' ),
		'archives'              => _x( 'Project archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'better-blocks' ),
		'insert_into_item'      => _x( 'Insert into project', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'better-blocks' ),
		'uploaded_to_this_item' => _x( 'Uploaded to this project', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'better-blocks' ),
		'filter_items_list'     => _x( 'Filter projects list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'better-blocks' ),
		'items_list_navigation' => _x( 'Projects list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'better-blocks' ),
		'items_list'            => _x( 'Projects list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'better-blocks' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_rest'       => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'project' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
	);

	register_post_type( 'project', $args );

	$labels = array(
		'name'              => _x( 'Skills', 'taxonomy general name', 'better-blocks' ),
		'singular_name'     => _x( 'Skill', 'taxonomy singular name', 'better-blocks' ),
		'search_items'      => __( 'Search Skills', 'better-blocks' ),
		'all_items'         => __( 'All Skills', 'better-blocks' ),
		'parent_item'       => __( 'Parent Skill', 'better-blocks' ),
		'parent_item_colon' => __( 'Parent Skill:', 'better-blocks' ),
		'edit_item'         => __( 'Edit Skill', 'better-blocks' ),
		'update_item'       => __( 'Update Skill', 'better-blocks' ),
		'add_new_item'      => __( 'Add New Skill', 'better-blocks' ),
		'new_item_name'     => __( 'New Skill Name', 'better-blocks' ),
		'menu_name'         => __( 'Skills', 'better-blocks' ),
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_rest'      => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'skill' ),
	);

	register_taxonomy( 'skill', [ 'project' ], $args );
}
add_action( 'init', __NAMESPACE__ . '\register_post_types' );

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
	if ( has_block( 'better-blocks/portfolio' ) ) {
		wp_enqueue_script(
			'better-blocks/portfolio',
			plugins_url( 'dist/portfolio/ts/portfolio.js', __FILE__ ),
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

function create_api_posts_meta_field() {
	register_rest_field( 'project', 'cover_image', array(
		'get_callback'    => function( $object ) {
			return (object) [
				'rendered' => get_the_post_thumbnail( $object->ID ?? null ),
			];
		},
	 )
 );
}
add_action( 'rest_api_init', __NAMESPACE__ . '\create_api_posts_meta_field' );
