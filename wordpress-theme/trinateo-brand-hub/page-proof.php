<?php
/**
 * Template Name: Proof
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$case_studies = tt_get_case_studies();
$testimonials = tt_get_testimonials();
?>

<main class="tt-section tt-section--first">
	<h1 class="tt-h1"><?php esc_html_e( 'Proof', 'trinateo-brand-hub' ); ?></h1>
	<p class="tt-lede"><?php esc_html_e( 'Case studies and client testimonials.', 'trinateo-brand-hub' ); ?></p>

	<section style="margin-bottom:4rem">
		<h2 class="tt-h2" style="margin-bottom:1.5rem"><?php esc_html_e( 'Case Studies', 'trinateo-brand-hub' ); ?></h2>
		<?php if ( empty( $case_studies ) ) : ?>
			<p class="tt-empty"><?php esc_html_e( 'No case studies listed yet.', 'trinateo-brand-hub' ); ?></p>
		<?php else : ?>
			<div class="tt-grid tt-grid--2">
				<?php foreach ( $case_studies as $cs ) : ?>
					<?php
					$sector   = get_post_meta( $cs->ID, '_tt_client_sector', true );
					$challenge = get_post_meta( $cs->ID, '_tt_challenge', true );
					$outcome  = get_post_meta( $cs->ID, '_tt_outcome', true );
					$tags     = wp_get_post_terms( $cs->ID, 'tt_case_study_tag', array( 'fields' => 'names' ) );
					?>
					<article class="tt-card" style="cursor:default">
						<?php if ( $sector ) : ?>
							<p style="font-size:0.75rem;font-weight:500;color:var(--tt-blue-600);margin:0 0 0.5rem"><?php echo esc_html( $sector ); ?></p>
						<?php endif; ?>
						<h3 class="tt-card__title"><?php echo esc_html( $cs->post_title ); ?></h3>
						<?php if ( $challenge ) : ?>
							<p class="tt-card__body" style="margin-bottom:0.5rem"><strong style="color:var(--tt-neutral-700)"><?php esc_html_e( 'Challenge: ', 'trinateo-brand-hub' ); ?></strong><?php echo esc_html( $challenge ); ?></p>
						<?php endif; ?>
						<?php if ( $outcome ) : ?>
							<p class="tt-card__body"><strong style="color:var(--tt-neutral-700)"><?php esc_html_e( 'Outcome: ', 'trinateo-brand-hub' ); ?></strong><?php echo esc_html( $outcome ); ?></p>
						<?php endif; ?>
						<?php if ( ! empty( $tags ) ) : ?>
							<div style="margin-top:1rem">
								<?php foreach ( $tags as $tag ) : ?>
									<span class="tt-tag"><?php echo esc_html( $tag ); ?></span>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>
					</article>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</section>

	<section>
		<h2 class="tt-h2" style="margin-bottom:1.5rem"><?php esc_html_e( 'Testimonials', 'trinateo-brand-hub' ); ?></h2>
		<?php if ( empty( $testimonials ) ) : ?>
			<p class="tt-empty"><?php esc_html_e( 'No testimonials listed yet.', 'trinateo-brand-hub' ); ?></p>
		<?php else : ?>
			<div class="tt-grid tt-grid--3">
				<?php foreach ( $testimonials as $t ) : ?>
					<?php
					$role    = get_post_meta( $t->ID, '_tt_author_role', true );
					$company = get_post_meta( $t->ID, '_tt_author_company', true );
					?>
					<figure class="tt-quote-card">
						<blockquote>&ldquo;<?php echo esc_html( $t->post_content ); ?>&rdquo;</blockquote>
						<figcaption>
							<?php echo esc_html( $t->post_title ); ?>
							<?php if ( $role ) : ?>
								<span><?php echo esc_html( $role . ( $company ? ', ' . $company : '' ) ); ?></span>
							<?php endif; ?>
						</figcaption>
					</figure>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</section>
</main>

<?php get_footer(); ?>
