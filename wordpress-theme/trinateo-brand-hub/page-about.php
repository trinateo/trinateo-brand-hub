<?php
/**
 * Template Name: About
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$profile = tt_get_profile();
?>

<main class="tt-detail">
	<?php if ( ! $profile ) : ?>
		<p class="tt-empty"><?php esc_html_e( 'Profile details are not available yet.', 'trinateo-brand-hub' ); ?></p>
	<?php else : ?>
		<?php
		$tagline      = get_post_meta( $profile->ID, '_tt_tagline', true );
		$linkedin_url = get_post_meta( $profile->ID, '_tt_linkedin_url', true );
		$tags         = tt_profile_expertise_tags();
		?>
		<div class="tt-about__top">
			<?php if ( has_post_thumbnail( $profile ) ) : ?>
				<?php echo get_the_post_thumbnail( $profile, 'tt-headshot', array( 'class' => 'tt-about__headshot' ) ); ?>
			<?php endif; ?>
			<div>
				<h1 class="tt-h1" style="margin-bottom:0.25rem"><?php echo esc_html( $profile->post_title ); ?></h1>
				<?php if ( $tagline ) : ?>
					<p style="color:var(--tt-neutral-600);margin:0.25rem 0"><?php echo esc_html( $tagline ); ?></p>
				<?php endif; ?>
				<?php if ( $linkedin_url ) : ?>
					<a href="<?php echo esc_url( $linkedin_url ); ?>" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:0.75rem;font-size:0.875rem;color:var(--tt-blue-600)">LinkedIn &rarr;</a>
				<?php endif; ?>
			</div>
		</div>

		<?php if ( $profile->post_content ) : ?>
			<div style="margin-bottom:2.5rem"><?php echo apply_filters( 'the_content', $profile->post_content ); ?></div>
		<?php endif; ?>

		<?php if ( ! empty( $tags ) ) : ?>
			<div>
				<p class="tt-detail__label"><?php esc_html_e( 'Areas of expertise', 'trinateo-brand-hub' ); ?></p>
				<?php foreach ( $tags as $tag ) : ?>
					<span class="tt-tag"><?php echo esc_html( $tag ); ?></span>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	<?php endif; ?>
</main>

<?php get_footer(); ?>
