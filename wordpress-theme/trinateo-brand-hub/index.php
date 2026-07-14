<?php
/**
 * Generic fallback template (required by WordPress).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>
<main class="tt-section tt-section--first">
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<article style="margin-bottom:2rem">
				<h2 class="tt-h2"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
				<div><?php the_excerpt(); ?></div>
			</article>
		<?php endwhile; ?>
	<?php else : ?>
		<p class="tt-empty"><?php esc_html_e( 'Nothing found.', 'trinateo-brand-hub' ); ?></p>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
