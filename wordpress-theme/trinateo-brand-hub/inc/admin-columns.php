<?php
/**
 * wp-admin list table polish for Enquiries: status badges, quick actions,
 * and "new" enquiries sorted first (matching the original admin inbox).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function tt_enquiry_columns( $columns ) {
	$new = array();
	foreach ( $columns as $key => $label ) {
		$new[ $key ] = $label;
		if ( 'title' === $key ) {
			$new['tt_status']  = __( 'Status', 'trinateo-brand-hub' );
			$new['tt_from']    = __( 'From', 'trinateo-brand-hub' );
			$new['tt_message'] = __( 'Message', 'trinateo-brand-hub' );
		}
	}
	unset( $new['title'] );
	$reordered          = array( 'cb' => $columns['cb'] ?? '', 'title' => $columns['title'] ?? __( 'Name', 'trinateo-brand-hub' ) );
	$reordered['tt_status']  = __( 'Status', 'trinateo-brand-hub' );
	$reordered['tt_from']    = __( 'From', 'trinateo-brand-hub' );
	$reordered['tt_message'] = __( 'Message', 'trinateo-brand-hub' );
	$reordered['date']       = $columns['date'] ?? __( 'Date', 'trinateo-brand-hub' );
	return $reordered;
}
add_filter( 'manage_tt_enquiry_posts_columns', 'tt_enquiry_columns' );

function tt_enquiry_column_content( $column, $post_id ) {
	switch ( $column ) {
		case 'tt_status':
			$status = get_post_meta( $post_id, '_tt_status', true );
			if ( ! $status ) {
				$status = 'new';
			}
			$labels = array( 'new' => __( 'New', 'trinateo-brand-hub' ), 'reviewed' => __( 'Reviewed', 'trinateo-brand-hub' ), 'responded' => __( 'Responded', 'trinateo-brand-hub' ) );
			printf( '<span class="tt-badge tt-badge--%1$s">%2$s</span>', esc_attr( $status ), esc_html( $labels[ $status ] ?? $status ) );

			echo '<div style="margin-top:6px;font-size:12px">';
			if ( 'reviewed' !== $status ) {
				printf(
					'<a href="%s">%s</a> ',
					esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=tt_mark_enquiry&status=reviewed&post_id=' . $post_id ), 'tt_mark_enquiry_' . $post_id ) ),
					esc_html__( 'Mark Reviewed', 'trinateo-brand-hub' )
				);
			}
			if ( 'responded' !== $status ) {
				printf(
					'<a href="%s">%s</a>',
					esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=tt_mark_enquiry&status=responded&post_id=' . $post_id ), 'tt_mark_enquiry_' . $post_id ) ),
					esc_html__( 'Mark Responded', 'trinateo-brand-hub' )
				);
			}
			echo '</div>';
			break;

		case 'tt_from':
			$email   = get_post_meta( $post_id, '_tt_visitor_email', true );
			$company = get_post_meta( $post_id, '_tt_visitor_company', true );
			echo esc_html( $email );
			if ( $company ) {
				echo '<br /><span style="color:#666">' . esc_html( $company ) . '</span>';
			}
			break;

		case 'tt_message':
			$content = get_post_field( 'post_content', $post_id );
			echo esc_html( wp_trim_words( $content, 12 ) );
			break;
	}
}
add_action( 'manage_tt_enquiry_posts_custom_column', 'tt_enquiry_column_content', 10, 2 );

/**
 * Quick-action links (mirrors the "Mark Reviewed" / "Mark Responded"
 * buttons from the original admin UI) — no page reload needed beyond
 * the standard admin-post.php redirect back to the list.
 */
function tt_handle_mark_enquiry() {
	$post_id = isset( $_GET['post_id'] ) ? absint( $_GET['post_id'] ) : 0;
	$status  = isset( $_GET['status'] ) ? sanitize_key( wp_unslash( $_GET['status'] ) ) : '';

	if ( ! $post_id || ! in_array( $status, array( 'reviewed', 'responded' ), true ) ) {
		wp_die( esc_html__( 'Invalid request.', 'trinateo-brand-hub' ) );
	}
	check_admin_referer( 'tt_mark_enquiry_' . $post_id );
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		wp_die( esc_html__( 'You do not have permission to do that.', 'trinateo-brand-hub' ) );
	}

	update_post_meta( $post_id, '_tt_status', $status );

	wp_safe_redirect( wp_get_referer() ? wp_get_referer() : admin_url( 'edit.php?post_type=tt_enquiry' ) );
	exit;
}
add_action( 'admin_post_tt_mark_enquiry', 'tt_handle_mark_enquiry' );

/**
 * New enquiries first, then newest-first within each group — same
 * ranking rule as docs/INTELLIGENCE_LAYER.md.
 */
function tt_enquiry_default_orderby( $query ) {
	if ( ! is_admin() || ! $query->is_main_query() ) {
		return;
	}
	if ( 'tt_enquiry' !== $query->get( 'post_type' ) ) {
		return;
	}
	if ( $query->get( 'orderby' ) ) {
		return;
	}
	add_filter( 'posts_orderby', 'tt_enquiry_status_orderby_sql', 10, 2 );
}
add_action( 'pre_get_posts', 'tt_enquiry_default_orderby' );

function tt_enquiry_status_orderby_sql( $orderby, $query ) {
	global $wpdb;
	if ( ! is_admin() || 'tt_enquiry' !== $query->get( 'post_type' ) ) {
		return $orderby;
	}
	remove_filter( 'posts_orderby', 'tt_enquiry_status_orderby_sql', 10 );
	return "(SELECT CASE WHEN meta_value = 'new' OR meta_value IS NULL THEN 0 ELSE 1 END FROM {$wpdb->postmeta} WHERE {$wpdb->postmeta}.post_id = {$wpdb->posts}.ID AND meta_key = '_tt_status') ASC, {$wpdb->posts}.post_date DESC";
}
