<?php
declare( strict_types = 1 );
namespace better_blocks\better_blocks;

function _find_blocks( array $block, array $blocks, \WP_Post $_post ) : array {
	foreach( $block[ 'innerBlocks' ] as $inner_block ) {
		$blocks = _find_blocks( $inner_block, $blocks, $_post );
	}
	if( ! isset( $block[ 'blockName' ] ) ) {
		return $blocks;
	}
	if( str_starts_with( $block[ 'blockName' ] ?? '', 'better-blocks' ) ) {
		if( ! isset( $blocks[ $block[ 'blockName' ] ]) ){
			$blocks[ $block[ 'blockName' ] ] = [ 'count' => 0, 'pages' => [] ];
		}
		$blocks[ $block[ 'blockName' ] ][ 'count' ]++;
		$blocks[ $block[ 'blockName' ] ][ 'pages' ][] = $_post->ID;
		$blocks[ $block[ 'blockName' ] ][ 'pages' ] = array_unique( $blocks[ $block[ 'blockName' ] ][ 'pages' ] );
	}
	return $blocks;
}

function find_better_blocks() {

	$post_types = get_post_types(
		[
			'public'  => true,
			'show_ui' => true,
		]
	);
	$posts = get_posts(
		[
			'posts_per_page' => -1,
			'post_type'      => $post_types,
			'post_status'    => [ 'publish', 'private', 'pending', 'future' ],
		]
	);

	$global_blocks = [];
	foreach( $posts as $_post ) {

		if( ! has_blocks( $_post->post_content ) ) {
			continue;
		}

		$blocks = parse_blocks( $_post->post_content );

		foreach( $blocks as $block ) {
			$global_blocks = _find_blocks( $block, $global_blocks, $_post );
		}
	}
	return $global_blocks;
}
