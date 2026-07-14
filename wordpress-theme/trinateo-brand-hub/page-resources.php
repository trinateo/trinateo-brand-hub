<?php
/**
 * Template Name: Resources
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
$resources = tt_get_resources();
?>

<main class="tt-section tt-section--first">
	<h1 class="tt-h1"><?php esc_html_e( 'Resources', 'trinateo-brand-hub' ); ?></h1>
	<p class="tt-lede"><?php esc_html_e( 'Guides and downloads to support your leadership journey.', 'trinateo-brand-hub' ); ?></p>

	<?php if ( empty( $resources ) ) : ?>
		<p class="tt-empty"><?php esc_html_e( 'No resources listed yet.', 'trinateo-brand-hub' ); ?></p>
	<?php else : ?>
		<div class="tt-grid tt-grid--2">
			<?php foreach ( $resources as $resource ) : ?>
				<?php
				$type         = get_post_meta( $resource->ID, '_tt_resource_type', true );
				$file_url     = get_post_meta( $resource->ID, '_tt_file_url', true );
				$external_url = get_post_meta( $resource->ID, '_tt_external_url', true );
				$href         = $file_url ? $file_url : $external_url;
				?>
				<article class="tt-card" style="cursor:default">
					<?php if ( $type ) : ?>
						<p style="font-size:0.75rem;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;color:var(--tt-blue-600);margin:0 0 0.5rem"><?php echo esc_html( $type ); ?></p>
					<?php endif; ?>
					<h2 class="tt-card__title"><?php echo esc_html( $resource->post_title ); ?></h2>
					<?php if ( $resource->post_content ) : ?>
						<p class="tt-card__body"><?php echo esc_html( $resource->post_content ); ?></p>
					<?php endif; ?>
					<?php if ( $href ) : ?>
						<a href="<?php echo esc_url( $href ); ?>" target="_blank" rel="noopener noreferrer" class="tt-card__cta"><?php echo esc_html( $file_url ? __( 'Download', 'trinateo-brand-hub' ) : __( 'View resource', 'trinateo-brand-hub' ) ); ?> &rarr;</a>
					<?php else : ?>
						<span style="font-size:0.875rem;color:var(--tt-neutral-400)"><?php esc_html_e( 'Coming soon', 'trinateo-brand-hub' ); ?></span>
					<?php endif; ?>
				</article>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</main>

<?php get_footer(); ?>
