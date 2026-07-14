<?php
/**
 * Profile is a singleton — exactly one tt_profile post holds Trina's
 * bio, tagline, headshot, LinkedIn URL, and expertise tags.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function tt_get_profile() {
	static $profile = null;
	if ( null === $profile ) {
		$posts   = get_posts( array( 'post_type' => 'tt_profile', 'numberposts' => 1, 'post_status' => 'publish' ) );
		$profile = $posts ? $posts[0] : false;
	}
	return $profile;
}

function tt_profile_field( $key, $default = '' ) {
	$profile = tt_get_profile();
	if ( ! $profile ) {
		return $default;
	}
	$value = get_post_meta( $profile->ID, $key, true );
	return '' !== $value ? $value : $default;
}

function tt_profile_expertise_tags() {
	$raw = tt_profile_field( '_tt_expertise_tags' );
	if ( ! $raw ) {
		return array();
	}
	return array_filter( array_map( 'trim', explode( ',', $raw ) ) );
}

/**
 * Prevent creating a second Profile entry from wp-admin — this content
 * type only ever has one row, same as the original `profile` table.
 */
function tt_restrict_profile_add_new() {
	global $pagenow, $post_type;
	if ( 'tt_profile' === $post_type && 'post-new.php' === $pagenow && tt_get_profile() ) {
		wp_safe_redirect( admin_url( 'post.php?post=' . tt_get_profile()->ID . '&action=edit' ) );
		exit;
	}
}
add_action( 'load-post-new.php', 'tt_restrict_profile_add_new' );
