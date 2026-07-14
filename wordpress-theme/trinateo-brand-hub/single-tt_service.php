<?php
/**
 * Single service detail page.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
while ( have_posts() ) :
	the_post();
	$service_id  = get_the_ID();
	$who_its_for = get_post_meta( $service_id, '_tt_who_its_for', true );
	$outcomes    = get_post_meta( $service_id, '_tt_outcomes', true );
	$cta_label   = get_post_meta( $service_id, '_tt_cta_label', true ) ?: 'Enquire Now';
	$cta_url     = tt_service_cta_url( get_post_field( 'post_name', $service_id ) );
	?>
	<main class="tt-detail">
		<a class="tt-detail__back" href="<?php echo esc_url( home_url( '/services/' ) ); ?>">&larr; <?php esc_html_e( 'All services', 'trinateo-brand-hub' ); ?></a>
		<h1 class="tt-detail__title"><?php the_title(); ?></h1>
		<p class="tt-detail__summary"><?php echo esc_html( get_the_excerpt() ); ?></p>

		<?php if ( get_the_content() ) : ?>
			<div class="tt-detail" style="padding:0 0 2rem"><?php the_content(); ?></div>
		<?php endif; ?>

		<?php if ( $who_its_for ) : ?>
			<section style="margin-bottom:2rem">
				<p class="tt-detail__label"><?php esc_html_e( "Who it's for", 'trinateo-brand-hub' ); ?></p>
				<p><?php echo esc_html( $who_its_for ); ?></p>
			</section>
		<?php endif; ?>

		<?php if ( $outcomes ) : ?>
			<section style="margin-bottom:2.5rem">
				<p class="tt-detail__label"><?php esc_html_e( 'Outcomes', 'trinateo-brand-hub' ); ?></p>
				<p><?php echo esc_html( $outcomes ); ?></p>
			</section>
		<?php endif; ?>

		<a class="tt-btn tt-btn--primary" href="<?php echo esc_url( $cta_url ); ?>"><?php echo esc_html( $cta_label ); ?></a>
	</main>
	<?php
endwhile;
get_footer();
