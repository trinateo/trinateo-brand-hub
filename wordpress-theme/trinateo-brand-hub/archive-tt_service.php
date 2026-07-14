<?php
/**
 * All services — /services/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$services = tt_get_services();
?>

<main class="tt-section tt-section--first">
	<h1 class="tt-h1"><?php esc_html_e( 'Services', 'trinateo-brand-hub' ); ?></h1>
	<p class="tt-lede"><?php esc_html_e( 'Coaching and advisory work for leaders navigating complexity and change.', 'trinateo-brand-hub' ); ?></p>

	<?php if ( empty( $services ) ) : ?>
		<p class="tt-empty"><?php esc_html_e( 'No services listed yet.', 'trinateo-brand-hub' ); ?></p>
	<?php else : ?>
		<div class="tt-grid tt-grid--2">
			<?php foreach ( $services as $service ) : ?>
				<a class="tt-card" href="<?php echo esc_url( get_permalink( $service ) ); ?>">
					<h2 class="tt-card__title"><?php echo esc_html( $service->post_title ); ?></h2>
					<p class="tt-card__body"><?php echo esc_html( $service->post_excerpt ); ?></p>
					<span class="tt-card__cta"><?php echo esc_html( get_post_meta( $service->ID, '_tt_cta_label', true ) ?: 'Enquire Now' ); ?> &rarr;</span>
				</a>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</main>

<?php get_footer(); ?>
