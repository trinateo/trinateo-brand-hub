<?php
/**
 * Homepage: hero + services preview + testimonials strip.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$profile      = tt_get_profile();
$full_name    = $profile ? $profile->post_title : 'Trina Teo';
$tagline      = tt_profile_field( '_tt_tagline', 'Executive coach and leadership strategist helping CEOs and HR leaders build thriving organisations.' );
$services     = tt_get_services( 3 );
$testimonials = tt_get_testimonials( 3 );
$pages        = get_option( 'tt_seeded_pages', array() );
$contact_url  = isset( $pages['contact'] ) ? get_permalink( $pages['contact'] ) : home_url( '/contact/' );
?>

<main>
	<section class="tt-hero">
		<p class="tt-hero__eyebrow"><?php echo esc_html( $full_name ); ?></p>
		<h1 class="tt-hero__title"><?php echo esc_html( $tagline ); ?></h1>
		<div class="tt-hero__actions">
			<a class="tt-btn tt-btn--primary" href="<?php echo esc_url( $contact_url ); ?>"><?php esc_html_e( 'Enquire Now', 'trinateo-brand-hub' ); ?></a>
			<a class="tt-btn tt-btn--secondary" href="<?php echo esc_url( home_url( '/services/' ) ); ?>"><?php esc_html_e( 'View Services', 'trinateo-brand-hub' ); ?></a>
		</div>
	</section>

	<section class="tt-section tt-section--first">
		<div class="tt-section__head">
			<h2 class="tt-h2"><?php esc_html_e( 'Services', 'trinateo-brand-hub' ); ?></h2>
			<a href="<?php echo esc_url( home_url( '/services/' ) ); ?>" style="font-size:0.875rem;color:var(--tt-blue-600)"><?php esc_html_e( 'View all', 'trinateo-brand-hub' ); ?></a>
		</div>
		<?php if ( empty( $services ) ) : ?>
			<p class="tt-empty"><?php esc_html_e( 'No services listed yet.', 'trinateo-brand-hub' ); ?></p>
		<?php else : ?>
			<div class="tt-grid tt-grid--3">
				<?php foreach ( $services as $service ) : ?>
					<a class="tt-card" href="<?php echo esc_url( get_permalink( $service ) ); ?>">
						<h3 class="tt-card__title"><?php echo esc_html( $service->post_title ); ?></h3>
						<p class="tt-card__body"><?php echo esc_html( $service->post_excerpt ); ?></p>
					</a>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</section>

	<?php if ( ! empty( $testimonials ) ) : ?>
		<section class="tt-section">
			<h2 class="tt-h2" style="margin-bottom:2rem"><?php esc_html_e( 'What clients say', 'trinateo-brand-hub' ); ?></h2>
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
		</section>
	<?php endif; ?>
</main>

<?php get_footer(); ?>
