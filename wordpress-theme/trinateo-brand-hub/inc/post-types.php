<?php
/**
 * Custom post types.
 *
 * Every content type from the original data model maps onto a native
 * WordPress construct where one exists (post_title, post_excerpt,
 * post_content, menu_order, post_status, featured image) and a post meta
 * field everywhere else. No plugins required.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function tt_register_post_types() {

	register_post_type(
		'tt_service',
		array(
			'labels'       => array(
				'name'          => __( 'Services', 'trinateo-brand-hub' ),
				'singular_name' => __( 'Service', 'trinateo-brand-hub' ),
				'add_new_item'  => __( 'Add New Service', 'trinateo-brand-hub' ),
			),
			'public'       => true,
			'has_archive'  => true,
			'rewrite'      => array( 'slug' => 'services' ),
			'menu_icon'    => 'dashicons-briefcase',
			'supports'     => array( 'title', 'excerpt', 'editor', 'page-attributes' ),
			'show_in_rest' => true,
		)
	);

	register_post_type(
		'tt_case_study',
		array(
			'labels'       => array(
				'name'          => __( 'Case Studies', 'trinateo-brand-hub' ),
				'singular_name' => __( 'Case Study', 'trinateo-brand-hub' ),
				'add_new_item'  => __( 'Add New Case Study', 'trinateo-brand-hub' ),
			),
			'public'       => true,
			'has_archive'  => false,
			'rewrite'      => array( 'slug' => 'case-studies' ),
			'menu_icon'    => 'dashicons-chart-line',
			'supports'     => array( 'title', 'editor', 'page-attributes' ),
			'show_in_rest' => true,
		)
	);

	register_post_type(
		'tt_testimonial',
		array(
			'labels'       => array(
				'name'          => __( 'Testimonials', 'trinateo-brand-hub' ),
				'singular_name' => __( 'Testimonial', 'trinateo-brand-hub' ),
				'add_new_item'  => __( 'Add New Testimonial', 'trinateo-brand-hub' ),
			),
			'public'       => true,
			'has_archive'  => false,
			'rewrite'      => array( 'slug' => 'testimonials' ),
			'menu_icon'    => 'dashicons-format-quote',
			'supports'     => array( 'title', 'editor', 'page-attributes' ),
			'show_in_rest' => true,
		)
	);

	register_post_type(
		'tt_speaking',
		array(
			'labels'       => array(
				'name'          => __( 'Speaking Engagements', 'trinateo-brand-hub' ),
				'singular_name' => __( 'Speaking Engagement', 'trinateo-brand-hub' ),
				'add_new_item'  => __( 'Add New Speaking Engagement', 'trinateo-brand-hub' ),
			),
			'public'       => true,
			'has_archive'  => false,
			'rewrite'      => array( 'slug' => 'speaking' ),
			'menu_icon'    => 'dashicons-microphone',
			'supports'     => array( 'title' ),
			'show_in_rest' => true,
		)
	);

	register_post_type(
		'tt_resource',
		array(
			'labels'       => array(
				'name'          => __( 'Resources', 'trinateo-brand-hub' ),
				'singular_name' => __( 'Resource', 'trinateo-brand-hub' ),
				'add_new_item'  => __( 'Add New Resource', 'trinateo-brand-hub' ),
			),
			'public'       => true,
			'has_archive'  => false,
			'rewrite'      => array( 'slug' => 'resources' ),
			'menu_icon'    => 'dashicons-media-document',
			'supports'     => array( 'title', 'editor', 'page-attributes' ),
			'show_in_rest' => true,
		)
	);

	register_post_type(
		'tt_profile',
		array(
			'labels'       => array(
				'name'          => __( 'Profile', 'trinateo-brand-hub' ),
				'singular_name' => __( 'Profile', 'trinateo-brand-hub' ),
			),
			'public'       => false,
			'show_ui'      => true,
			'has_archive'  => false,
			'menu_icon'    => 'dashicons-admin-users',
			'supports'     => array( 'title', 'editor', 'thumbnail' ),
			'show_in_rest' => true,
		)
	);

	register_post_type(
		'tt_enquiry',
		array(
			'labels'       => array(
				'name'          => __( 'Enquiries', 'trinateo-brand-hub' ),
				'singular_name' => __( 'Enquiry', 'trinateo-brand-hub' ),
			),
			'public'       => false,
			'show_ui'      => true,
			'has_archive'  => false,
			'menu_icon'    => 'dashicons-email-alt',
			'supports'     => array( 'title', 'editor' ),
			'capabilities' => array(
				'create_posts' => 'do_not_allow',
			),
			'map_meta_cap' => true,
			'show_in_rest' => false,
		)
	);

	// Case studies use free-form tags, same idea as the original text[] tags column.
	register_taxonomy(
		'tt_case_study_tag',
		'tt_case_study',
		array(
			'labels'       => array( 'name' => __( 'Case Study Tags', 'trinateo-brand-hub' ) ),
			'public'       => true,
			'hierarchical' => false,
			'show_in_rest' => true,
			'rewrite'      => array( 'slug' => 'case-study-tag' ),
		)
	);
}
add_action( 'init', 'tt_register_post_types' );

/**
 * Enquiries are created only through the public contact form
 * (inc/enquiry-form.php), never from wp-admin's "Add New".
 */
function tt_hide_enquiry_add_new() {
	global $pagenow, $post_type;
	if ( 'tt_enquiry' === $post_type && in_array( $pagenow, array( 'post-new.php' ), true ) ) {
		wp_die( esc_html__( 'Enquiries are created by visitors through the contact form and cannot be added manually.', 'trinateo-brand-hub' ) );
	}
}
add_action( 'load-post-new.php', 'tt_hide_enquiry_add_new' );
