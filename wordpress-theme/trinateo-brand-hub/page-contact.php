<?php
/**
 * Template Name: Contact
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$state          = tt_get_enquiry_form_state();
$services       = tt_get_services();
$default_service = isset( $_GET['service'] ) ? sanitize_title( wp_unslash( $_GET['service'] ) ) : '';

$error_messages = array(
	'name'           => __( 'Name is required.', 'trinateo-brand-hub' ),
	'email_required' => __( 'Email is required.', 'trinateo-brand-hub' ),
	'email_invalid'  => __( 'Please enter a valid email address.', 'trinateo-brand-hub' ),
	'message'        => __( 'Message is required.', 'trinateo-brand-hub' ),
	'server'         => __( 'Something went wrong. Please try again.', 'trinateo-brand-hub' ),
);
?>

<main class="tt-detail" id="tt-contact-form">
	<h1 class="tt-h1"><?php esc_html_e( 'Get in touch', 'trinateo-brand-hub' ); ?></h1>
	<p class="tt-lede"><?php esc_html_e( "Tell me a bit about what you're looking for and I'll be in touch.", 'trinateo-brand-hub' ); ?></p>

	<?php if ( $state['success'] ) : ?>
		<div class="tt-confirmation">
			<h2><?php printf( esc_html__( 'Thank you, %s!', 'trinateo-brand-hub' ), esc_html( $state['name'] ) ); ?></h2>
			<p><?php esc_html_e( 'Your enquiry has been received. Trina will personally review it and be in touch with you soon.', 'trinateo-brand-hub' ); ?></p>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="display:inline-block;margin-top:1rem;font-size:0.875rem;font-weight:500;color:var(--tt-green-900)">&larr; <?php esc_html_e( 'Back to home', 'trinateo-brand-hub' ); ?></a>
		</div>
	<?php else : ?>
		<?php if ( in_array( 'server', $state['errors'], true ) ) : ?>
			<p class="tt-error" role="alert"><?php echo esc_html( $error_messages['server'] ); ?></p>
		<?php endif; ?>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="tt_submit_enquiry" />
			<input type="hidden" name="tt_redirect" value="<?php echo esc_url( get_permalink() ); ?>" />
			<?php wp_nonce_field( 'tt_submit_enquiry', 'tt_enquiry_nonce' ); ?>

			<div class="tt-field">
				<label for="visitor_name"><?php esc_html_e( 'Name', 'trinateo-brand-hub' ); ?></label>
				<input type="text" id="visitor_name" name="visitor_name" />
				<?php if ( in_array( 'name', $state['errors'], true ) ) : ?>
					<p class="tt-error"><?php echo esc_html( $error_messages['name'] ); ?></p>
				<?php endif; ?>
			</div>

			<div class="tt-field">
				<label for="visitor_email"><?php esc_html_e( 'Email', 'trinateo-brand-hub' ); ?></label>
				<input type="email" id="visitor_email" name="visitor_email" />
				<?php if ( in_array( 'email_required', $state['errors'], true ) ) : ?>
					<p class="tt-error"><?php echo esc_html( $error_messages['email_required'] ); ?></p>
				<?php elseif ( in_array( 'email_invalid', $state['errors'], true ) ) : ?>
					<p class="tt-error"><?php echo esc_html( $error_messages['email_invalid'] ); ?></p>
				<?php endif; ?>
			</div>

			<div class="tt-field-row">
				<div class="tt-field">
					<label for="visitor_company"><?php esc_html_e( 'Company', 'trinateo-brand-hub' ); ?></label>
					<input type="text" id="visitor_company" name="visitor_company" />
				</div>
				<div class="tt-field">
					<label for="visitor_role"><?php esc_html_e( 'Role', 'trinateo-brand-hub' ); ?></label>
					<input type="text" id="visitor_role" name="visitor_role" />
				</div>
			</div>

			<div class="tt-field">
				<label for="how_can_i_help"><?php esc_html_e( 'How can I help?', 'trinateo-brand-hub' ); ?></label>
				<select id="how_can_i_help" name="how_can_i_help">
					<option value=""><?php esc_html_e( 'Select a service (optional)', 'trinateo-brand-hub' ); ?></option>
					<?php foreach ( $services as $service ) : ?>
						<option value="<?php echo esc_attr( $service->post_name ); ?>" <?php selected( $default_service, $service->post_name ); ?>><?php echo esc_html( $service->post_title ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>

			<div class="tt-field">
				<label for="message"><?php esc_html_e( 'Message', 'trinateo-brand-hub' ); ?></label>
				<textarea id="message" name="message" rows="5"></textarea>
				<?php if ( in_array( 'message', $state['errors'], true ) ) : ?>
					<p class="tt-error"><?php echo esc_html( $error_messages['message'] ); ?></p>
				<?php endif; ?>
			</div>

			<button type="submit" class="tt-btn tt-btn--primary"><?php esc_html_e( 'Send Enquiry', 'trinateo-brand-hub' ); ?></button>
		</form>
	<?php endif; ?>
</main>

<?php get_footer(); ?>
