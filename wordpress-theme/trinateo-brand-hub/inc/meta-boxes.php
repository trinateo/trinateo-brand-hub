<?php
/**
 * Meta boxes for each custom post type's structured fields.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ---------------------------------------------------------------------
 * Small field-rendering helpers, shared by every meta box below.
 * ------------------------------------------------------------------ */

function tt_field_text( $post, $key, $label, $placeholder = '' ) {
	$value = get_post_meta( $post->ID, $key, true );
	printf(
		'<p><label for="%1$s"><strong>%2$s</strong></label><br /><input type="text" id="%1$s" name="%1$s" value="%3$s" placeholder="%4$s" style="width:100%%" /></p>',
		esc_attr( $key ),
		esc_html( $label ),
		esc_attr( $value ),
		esc_attr( $placeholder )
	);
}

function tt_field_url( $post, $key, $label ) {
	$value = get_post_meta( $post->ID, $key, true );
	printf(
		'<p><label for="%1$s"><strong>%2$s</strong></label><br /><input type="url" id="%1$s" name="%1$s" value="%3$s" style="width:100%%" /></p>',
		esc_attr( $key ),
		esc_html( $label ),
		esc_attr( $value )
	);
}

function tt_field_date( $post, $key, $label ) {
	$value = get_post_meta( $post->ID, $key, true );
	printf(
		'<p><label for="%1$s"><strong>%2$s</strong></label><br /><input type="date" id="%1$s" name="%1$s" value="%3$s" /></p>',
		esc_attr( $key ),
		esc_html( $label ),
		esc_attr( $value )
	);
}

function tt_field_textarea( $post, $key, $label, $rows = 4 ) {
	$value = get_post_meta( $post->ID, $key, true );
	printf(
		'<p><label for="%1$s"><strong>%2$s</strong></label><br /><textarea id="%1$s" name="%1$s" rows="%3$d" style="width:100%%">%4$s</textarea></p>',
		esc_attr( $key ),
		esc_html( $label ),
		absint( $rows ),
		esc_textarea( $value )
	);
}

function tt_field_checkbox( $post, $key, $label ) {
	$value = get_post_meta( $post->ID, $key, true );
	printf(
		'<p><label for="%1$s"><input type="checkbox" id="%1$s" name="%1$s" value="1" %3$s /> %2$s</label></p>',
		esc_attr( $key ),
		esc_html( $label ),
		checked( $value, '1', false )
	);
}

function tt_field_select( $post, $key, $label, $options ) {
	$value = get_post_meta( $post->ID, $key, true );
	printf( '<p><label for="%1$s"><strong>%2$s</strong></label><br /><select id="%1$s" name="%1$s">', esc_attr( $key ), esc_html( $label ) );
	foreach ( $options as $option_value => $option_label ) {
		printf(
			'<option value="%1$s" %3$s>%2$s</option>',
			esc_attr( $option_value ),
			esc_html( $option_label ),
			selected( $value, $option_value, false )
		);
	}
	echo '</select></p>';
}

function tt_verify_nonce_and_save( $post_id, $nonce_action, $nonce_field ) {
	if ( ! isset( $_POST[ $nonce_field ] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST[ $nonce_field ] ) ), $nonce_action ) ) {
		return false;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return false;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return false;
	}
	return true;
}

function tt_save_text_meta( $post_id, $keys ) {
	foreach ( $keys as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}

function tt_save_url_meta( $post_id, $keys ) {
	foreach ( $keys as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, esc_url_raw( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}

function tt_save_textarea_meta( $post_id, $keys ) {
	foreach ( $keys as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_textarea_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}

function tt_save_checkbox_meta( $post_id, $key ) {
	update_post_meta( $post_id, $key, isset( $_POST[ $key ] ) ? '1' : '' );
}

/* ---------------------------------------------------------------------
 * Service
 * ------------------------------------------------------------------ */

function tt_add_service_meta_box() {
	add_meta_box( 'tt_service_details', __( 'Service Details', 'trinateo-brand-hub' ), 'tt_render_service_meta_box', 'tt_service', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'tt_add_service_meta_box' );

function tt_render_service_meta_box( $post ) {
	wp_nonce_field( 'tt_save_service', 'tt_service_nonce' );
	echo '<p style="color:#666">Title = service title. Excerpt = short summary shown on cards. Content editor = full description.</p>';
	tt_field_textarea( $post, '_tt_who_its_for', __( "Who it's for", 'trinateo-brand-hub' ), 3 );
	tt_field_textarea( $post, '_tt_outcomes', __( 'Outcomes', 'trinateo-brand-hub' ), 3 );
	tt_field_text( $post, '_tt_cta_label', __( 'CTA button label', 'trinateo-brand-hub' ), 'Enquire Now' );
}

function tt_save_service_meta( $post_id ) {
	if ( ! tt_verify_nonce_and_save( $post_id, 'tt_save_service', 'tt_service_nonce' ) ) {
		return;
	}
	tt_save_textarea_meta( $post_id, array( '_tt_who_its_for', '_tt_outcomes' ) );
	tt_save_text_meta( $post_id, array( '_tt_cta_label' ) );
}
add_action( 'save_post_tt_service', 'tt_save_service_meta' );

/* ---------------------------------------------------------------------
 * Case study
 * ------------------------------------------------------------------ */

function tt_add_case_study_meta_box() {
	add_meta_box( 'tt_case_study_details', __( 'Case Study Details', 'trinateo-brand-hub' ), 'tt_render_case_study_meta_box', 'tt_case_study', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'tt_add_case_study_meta_box' );

function tt_render_case_study_meta_box( $post ) {
	wp_nonce_field( 'tt_save_case_study', 'tt_case_study_nonce' );
	tt_field_text( $post, '_tt_client_sector', __( 'Client Sector', 'trinateo-brand-hub' ) );
	tt_field_textarea( $post, '_tt_challenge', __( 'Challenge', 'trinateo-brand-hub' ), 3 );
	tt_field_textarea( $post, '_tt_approach', __( 'Approach', 'trinateo-brand-hub' ), 3 );
	tt_field_textarea( $post, '_tt_outcome', __( 'Outcome', 'trinateo-brand-hub' ), 3 );
	echo '<p style="color:#666">Use the Case Study Tags panel to add tags.</p>';
}

function tt_save_case_study_meta( $post_id ) {
	if ( ! tt_verify_nonce_and_save( $post_id, 'tt_save_case_study', 'tt_case_study_nonce' ) ) {
		return;
	}
	tt_save_text_meta( $post_id, array( '_tt_client_sector' ) );
	tt_save_textarea_meta( $post_id, array( '_tt_challenge', '_tt_approach', '_tt_outcome' ) );
}
add_action( 'save_post_tt_case_study', 'tt_save_case_study_meta' );

/* ---------------------------------------------------------------------
 * Testimonial
 * ------------------------------------------------------------------ */

function tt_add_testimonial_meta_box() {
	add_meta_box( 'tt_testimonial_details', __( 'Testimonial Details', 'trinateo-brand-hub' ), 'tt_render_testimonial_meta_box', 'tt_testimonial', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'tt_add_testimonial_meta_box' );

function tt_render_testimonial_meta_box( $post ) {
	wp_nonce_field( 'tt_save_testimonial', 'tt_testimonial_nonce' );
	echo '<p style="color:#666">Title = author name. Content editor = the quote.</p>';
	tt_field_text( $post, '_tt_author_role', __( 'Author Role', 'trinateo-brand-hub' ) );
	tt_field_text( $post, '_tt_author_company', __( 'Author Company', 'trinateo-brand-hub' ) );

	$services = get_posts( array( 'post_type' => 'tt_service', 'numberposts' => -1, 'orderby' => 'menu_order', 'order' => 'ASC' ) );
	$selected = get_post_meta( $post->ID, '_tt_related_service', true );
	echo '<p><label for="_tt_related_service"><strong>' . esc_html__( 'Related Service', 'trinateo-brand-hub' ) . '</strong></label><br /><select id="_tt_related_service" name="_tt_related_service"><option value="">' . esc_html__( 'None', 'trinateo-brand-hub' ) . '</option>';
	foreach ( $services as $service ) {
		printf( '<option value="%1$d" %3$s>%2$s</option>', $service->ID, esc_html( $service->post_title ), selected( $selected, (string) $service->ID, false ) );
	}
	echo '</select></p>';
}

function tt_save_testimonial_meta( $post_id ) {
	if ( ! tt_verify_nonce_and_save( $post_id, 'tt_save_testimonial', 'tt_testimonial_nonce' ) ) {
		return;
	}
	tt_save_text_meta( $post_id, array( '_tt_author_role', '_tt_author_company' ) );
	if ( isset( $_POST['_tt_related_service'] ) ) {
		update_post_meta( $post_id, '_tt_related_service', absint( $_POST['_tt_related_service'] ) );
	}
}
add_action( 'save_post_tt_testimonial', 'tt_save_testimonial_meta' );

/* ---------------------------------------------------------------------
 * Speaking engagement
 * ------------------------------------------------------------------ */

function tt_add_speaking_meta_box() {
	add_meta_box( 'tt_speaking_details', __( 'Speaking Engagement Details', 'trinateo-brand-hub' ), 'tt_render_speaking_meta_box', 'tt_speaking', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'tt_add_speaking_meta_box' );

function tt_render_speaking_meta_box( $post ) {
	wp_nonce_field( 'tt_save_speaking', 'tt_speaking_nonce' );
	echo '<p style="color:#666">Title = event name.</p>';
	tt_field_date( $post, '_tt_event_date', __( 'Event Date', 'trinateo-brand-hub' ) );
	tt_field_text( $post, '_tt_location', __( 'Location', 'trinateo-brand-hub' ) );
	tt_field_textarea( $post, '_tt_topic', __( 'Topic', 'trinateo-brand-hub' ), 2 );
	tt_field_text( $post, '_tt_audience_type', __( 'Audience Type', 'trinateo-brand-hub' ) );
	tt_field_url( $post, '_tt_event_url', __( 'Event URL', 'trinateo-brand-hub' ) );
	tt_field_checkbox( $post, '_tt_is_upcoming', __( 'Upcoming', 'trinateo-brand-hub' ) );
}

function tt_save_speaking_meta( $post_id ) {
	if ( ! tt_verify_nonce_and_save( $post_id, 'tt_save_speaking', 'tt_speaking_nonce' ) ) {
		return;
	}
	tt_save_text_meta( $post_id, array( '_tt_location', '_tt_audience_type', '_tt_event_date' ) );
	tt_save_textarea_meta( $post_id, array( '_tt_topic' ) );
	tt_save_url_meta( $post_id, array( '_tt_event_url' ) );
	tt_save_checkbox_meta( $post_id, '_tt_is_upcoming' );
}
add_action( 'save_post_tt_speaking', 'tt_save_speaking_meta' );

/* ---------------------------------------------------------------------
 * Resource
 * ------------------------------------------------------------------ */

function tt_add_resource_meta_box() {
	add_meta_box( 'tt_resource_details', __( 'Resource Details', 'trinateo-brand-hub' ), 'tt_render_resource_meta_box', 'tt_resource', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'tt_add_resource_meta_box' );

function tt_render_resource_meta_box( $post ) {
	wp_nonce_field( 'tt_save_resource', 'tt_resource_nonce' );
	echo '<p style="color:#666">Content editor = description.</p>';
	tt_field_select( $post, '_tt_resource_type', __( 'Type', 'trinateo-brand-hub' ), array(
		'guide'    => __( 'Guide', 'trinateo-brand-hub' ),
		'template' => __( 'Template', 'trinateo-brand-hub' ),
		'video'    => __( 'Video', 'trinateo-brand-hub' ),
	) );
	tt_field_url( $post, '_tt_file_url', __( 'File URL (for downloads)', 'trinateo-brand-hub' ) );
	tt_field_url( $post, '_tt_external_url', __( 'External URL (for links)', 'trinateo-brand-hub' ) );
}

function tt_save_resource_meta( $post_id ) {
	if ( ! tt_verify_nonce_and_save( $post_id, 'tt_save_resource', 'tt_resource_nonce' ) ) {
		return;
	}
	tt_save_text_meta( $post_id, array( '_tt_resource_type' ) );
	tt_save_url_meta( $post_id, array( '_tt_file_url', '_tt_external_url' ) );
}
add_action( 'save_post_tt_resource', 'tt_save_resource_meta' );

/* ---------------------------------------------------------------------
 * Profile (singleton)
 * ------------------------------------------------------------------ */

function tt_add_profile_meta_box() {
	add_meta_box( 'tt_profile_details', __( 'Profile Details', 'trinateo-brand-hub' ), 'tt_render_profile_meta_box', 'tt_profile', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'tt_add_profile_meta_box' );

function tt_render_profile_meta_box( $post ) {
	wp_nonce_field( 'tt_save_profile', 'tt_profile_nonce' );
	echo '<p style="color:#666">Title = full name. Content editor = bio. Featured image = headshot.</p>';
	tt_field_text( $post, '_tt_tagline', __( 'Tagline', 'trinateo-brand-hub' ) );
	tt_field_url( $post, '_tt_linkedin_url', __( 'LinkedIn URL', 'trinateo-brand-hub' ) );
	tt_field_text( $post, '_tt_expertise_tags', __( 'Expertise Tags (comma-separated)', 'trinateo-brand-hub' ) );
}

function tt_save_profile_meta( $post_id ) {
	if ( ! tt_verify_nonce_and_save( $post_id, 'tt_save_profile', 'tt_profile_nonce' ) ) {
		return;
	}
	tt_save_text_meta( $post_id, array( '_tt_tagline', '_tt_expertise_tags' ) );
	tt_save_url_meta( $post_id, array( '_tt_linkedin_url' ) );
}
add_action( 'save_post_tt_profile', 'tt_save_profile_meta' );

/* ---------------------------------------------------------------------
 * Enquiry — visitor fields are read-only in wp-admin; status and notes
 * are the only editable fields.
 * ------------------------------------------------------------------ */

function tt_add_enquiry_meta_boxes() {
	add_meta_box( 'tt_enquiry_visitor', __( 'Visitor Details', 'trinateo-brand-hub' ), 'tt_render_enquiry_visitor_meta_box', 'tt_enquiry', 'normal', 'high' );
	add_meta_box( 'tt_enquiry_status', __( 'Status & Notes', 'trinateo-brand-hub' ), 'tt_render_enquiry_status_meta_box', 'tt_enquiry', 'side', 'default' );
}
add_action( 'add_meta_boxes', 'tt_add_enquiry_meta_boxes' );

function tt_render_enquiry_visitor_meta_box( $post ) {
	$fields = array(
		'_tt_visitor_email'   => __( 'Email', 'trinateo-brand-hub' ),
		'_tt_visitor_company' => __( 'Company', 'trinateo-brand-hub' ),
		'_tt_visitor_role'    => __( 'Role', 'trinateo-brand-hub' ),
		'_tt_how_can_i_help'  => __( 'How can I help?', 'trinateo-brand-hub' ),
		'_tt_referral_source' => __( 'Referral Source', 'trinateo-brand-hub' ),
	);
	echo '<table class="form-table"><tbody>';
	foreach ( $fields as $key => $label ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf( '<tr><th scope="row">%s</th><td>%s</td></tr>', esc_html( $label ), esc_html( $value ? $value : '—' ) );
	}
	echo '</tbody></table>';
	echo '<p><strong>' . esc_html__( 'Message', 'trinateo-brand-hub' ) . '</strong></p>';
	echo '<p>' . esc_html( $post->post_content ) . '</p>';
}

function tt_render_enquiry_status_meta_box( $post ) {
	wp_nonce_field( 'tt_save_enquiry', 'tt_enquiry_nonce' );
	echo '<div class="tt-admin-meta">';
	tt_field_select( $post, '_tt_status', __( 'Status', 'trinateo-brand-hub' ), array(
		'new'       => __( 'New', 'trinateo-brand-hub' ),
		'reviewed'  => __( 'Reviewed', 'trinateo-brand-hub' ),
		'responded' => __( 'Responded', 'trinateo-brand-hub' ),
	) );
	tt_field_textarea( $post, '_tt_admin_notes', __( 'Admin Notes', 'trinateo-brand-hub' ), 4 );
	echo '</div>';
}

function tt_save_enquiry_meta( $post_id ) {
	if ( ! tt_verify_nonce_and_save( $post_id, 'tt_save_enquiry', 'tt_enquiry_nonce' ) ) {
		return;
	}
	if ( isset( $_POST['_tt_status'] ) ) {
		$status = sanitize_key( wp_unslash( $_POST['_tt_status'] ) );
		if ( in_array( $status, array( 'new', 'reviewed', 'responded' ), true ) ) {
			update_post_meta( $post_id, '_tt_status', $status );
		}
	}
	tt_save_textarea_meta( $post_id, array( '_tt_admin_notes' ) );
}
add_action( 'save_post_tt_enquiry', 'tt_save_enquiry_meta' );
