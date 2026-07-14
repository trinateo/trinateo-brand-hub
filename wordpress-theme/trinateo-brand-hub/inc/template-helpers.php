<?php
/**
 * Query helpers used by the page templates. Front-end WP_Query already
 * defaults to post_status = publish, which is the WordPress equivalent
 * of the original `published = true` filter.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function tt_get_services( $limit = -1 ) {
	return get_posts( array(
		'post_type'      => 'tt_service',
		'posts_per_page' => $limit,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	) );
}

function tt_get_service_by_slug( $slug ) {
	$posts = get_posts( array(
		'post_type'      => 'tt_service',
		'name'           => $slug,
		'posts_per_page' => 1,
	) );
	return $posts ? $posts[0] : null;
}

function tt_get_case_studies( $limit = -1 ) {
	return get_posts( array(
		'post_type'      => 'tt_case_study',
		'posts_per_page' => $limit,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	) );
}

function tt_get_testimonials( $limit = -1 ) {
	return get_posts( array(
		'post_type'      => 'tt_testimonial',
		'posts_per_page' => $limit,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	) );
}

function tt_get_speaking_engagements() {
	return get_posts( array(
		'post_type'      => 'tt_speaking',
		'posts_per_page' => -1,
		'meta_key'       => '_tt_event_date',
		'orderby'        => 'meta_value',
		'order'          => 'DESC',
	) );
}

function tt_get_resources() {
	return get_posts( array(
		'post_type'      => 'tt_resource',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	) );
}

function tt_service_cta_url( $service_slug ) {
	$contact = get_page_by_path( 'contact' );
	$base    = $contact ? get_permalink( $contact ) : home_url( '/contact/' );
	return add_query_arg( 'service', $service_slug, $base );
}

function tt_status_badge( $status ) {
	$labels = array( 'new' => 'New', 'reviewed' => 'Reviewed', 'responded' => 'Responded' );
	printf( '<span class="tt-badge tt-badge--%1$s">%2$s</span>', esc_attr( $status ), esc_html( $labels[ $status ] ?? $status ) );
}
