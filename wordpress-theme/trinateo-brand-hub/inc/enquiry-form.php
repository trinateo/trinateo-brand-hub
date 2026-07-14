<?php
/**
 * Public enquiry form handler.
 *
 * Posts to admin-post.php (works for logged-out visitors via the
 * `nopriv` hook), validates, creates a tt_enquiry post, and redirects
 * back to the contact page with a status flag the template reads.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function tt_handle_enquiry_submit() {
	if ( ! isset( $_POST['tt_enquiry_nonce'] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['tt_enquiry_nonce'] ) ), 'tt_submit_enquiry' ) ) {
		wp_die( esc_html__( 'Security check failed. Please go back and try again.', 'trinateo-brand-hub' ) );
	}

	$redirect_url = ! empty( $_POST['tt_redirect'] ) ? esc_url_raw( wp_unslash( $_POST['tt_redirect'] ) ) : home_url( '/contact/' );

	$visitor_name    = isset( $_POST['visitor_name'] ) ? sanitize_text_field( wp_unslash( $_POST['visitor_name'] ) ) : '';
	$visitor_email   = isset( $_POST['visitor_email'] ) ? sanitize_email( wp_unslash( $_POST['visitor_email'] ) ) : '';
	$visitor_company = isset( $_POST['visitor_company'] ) ? sanitize_text_field( wp_unslash( $_POST['visitor_company'] ) ) : '';
	$visitor_role    = isset( $_POST['visitor_role'] ) ? sanitize_text_field( wp_unslash( $_POST['visitor_role'] ) ) : '';
	$message         = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';
	$how_can_i_help  = isset( $_POST['how_can_i_help'] ) ? sanitize_text_field( wp_unslash( $_POST['how_can_i_help'] ) ) : '';

	$errors = array();
	if ( '' === $visitor_name ) {
		$errors[] = 'name';
	}
	if ( '' === $visitor_email ) {
		$errors[] = 'email_required';
	} elseif ( ! is_email( $visitor_email ) ) {
		$errors[] = 'email_invalid';
	}
	if ( '' === $message ) {
		$errors[] = 'message';
	}

	if ( ! empty( $errors ) ) {
		wp_safe_redirect( add_query_arg( 'tt_errors', implode( ',', $errors ), $redirect_url ) . '#tt-contact-form' );
		exit;
	}

	$post_id = wp_insert_post(
		array(
			'post_type'    => 'tt_enquiry',
			'post_title'   => $visitor_name,
			'post_content' => $message,
			'post_status'  => 'publish',
		),
		true
	);

	if ( is_wp_error( $post_id ) ) {
		wp_safe_redirect( add_query_arg( 'tt_errors', 'server', $redirect_url ) . '#tt-contact-form' );
		exit;
	}

	update_post_meta( $post_id, '_tt_visitor_email', $visitor_email );
	update_post_meta( $post_id, '_tt_visitor_company', $visitor_company );
	update_post_meta( $post_id, '_tt_visitor_role', $visitor_role );
	update_post_meta( $post_id, '_tt_how_can_i_help', $how_can_i_help );
	update_post_meta( $post_id, '_tt_status', 'new' );

	tt_send_enquiry_notification( $visitor_name, $visitor_email, $visitor_company, $visitor_role, $message, $how_can_i_help );

	wp_safe_redirect( add_query_arg( array( 'tt_success' => '1', 'tt_name' => rawurlencode( $visitor_name ) ), $redirect_url ) . '#tt-contact-form' );
	exit;
}
add_action( 'admin_post_nopriv_tt_submit_enquiry', 'tt_handle_enquiry_submit' );
add_action( 'admin_post_tt_submit_enquiry', 'tt_handle_enquiry_submit' );

/**
 * Uses WordPress's built-in mail function — works out of the box on any
 * host with mail configured, no third-party API key needed. Filterable
 * via `tt_enquiry_notification_email` if you'd rather send it elsewhere.
 */
function tt_send_enquiry_notification( $name, $email, $company, $role, $message, $how_can_i_help ) {
	$to = apply_filters( 'tt_enquiry_notification_email', get_option( 'admin_email' ) );
	if ( ! $to ) {
		return;
	}

	$subject = sprintf( 'New enquiry from %s', $name );
	$lines   = array(
		"Name: {$name}",
		"Email: {$email}",
	);
	if ( $company ) {
		$lines[] = "Company: {$company}";
	}
	if ( $role ) {
		$lines[] = "Role: {$role}";
	}
	if ( $how_can_i_help ) {
		$lines[] = "Interested in: {$how_can_i_help}";
	}
	$lines[] = '';
	$lines[] = $message;

	wp_mail( $to, $subject, implode( "\n", $lines ) );
}

/**
 * Field-level error/success state for the contact template, read from
 * the query string set by the redirect above.
 */
function tt_get_enquiry_form_state() {
	$errors = array();
	if ( ! empty( $_GET['tt_errors'] ) ) {
		$errors = array_map( 'sanitize_key', explode( ',', sanitize_text_field( wp_unslash( $_GET['tt_errors'] ) ) ) );
	}
	$success = ! empty( $_GET['tt_success'] );
	$name    = isset( $_GET['tt_name'] ) ? sanitize_text_field( wp_unslash( $_GET['tt_name'] ) ) : '';

	return array(
		'errors'  => $errors,
		'success' => $success,
		'name'    => $name,
	);
}
