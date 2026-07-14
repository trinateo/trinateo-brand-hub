<?php
/**
 * Theme bootstrap.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TT_THEME_VERSION', '1.0.0' );

require get_template_directory() . '/inc/post-types.php';
require get_template_directory() . '/inc/meta-boxes.php';
require get_template_directory() . '/inc/admin-columns.php';
require get_template_directory() . '/inc/enquiry-form.php';
require get_template_directory() . '/inc/profile-settings.php';
require get_template_directory() . '/inc/seed-content.php';
require get_template_directory() . '/inc/template-helpers.php';

/**
 * Theme setup.
 */
function tt_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Navigation', 'trinateo-brand-hub' ),
		)
	);
}
add_action( 'after_setup_theme', 'tt_setup' );

/**
 * Assets.
 */
function tt_enqueue_assets() {
	wp_enqueue_style( 'trinateo-brand-hub-style', get_stylesheet_uri(), array(), TT_THEME_VERSION );
}
add_action( 'wp_enqueue_scripts', 'tt_enqueue_assets' );

/**
 * Sensible defaults: excerpts as SEO descriptions, no admin bar clutter
 * beyond what's needed, and a friendly 404 for the site's own image sizes.
 */
add_image_size( 'tt-headshot', 320, 320, true );
