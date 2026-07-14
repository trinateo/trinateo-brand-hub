<?php
/**
 * 404 page.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>
<main class="tt-detail" style="text-align:center">
	<h1 class="tt-h1">404</h1>
	<p class="tt-lede"><?php esc_html_e( 'This page could not be found.', 'trinateo-brand-hub' ); ?></p>
	<a class="tt-btn tt-btn--secondary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back to home', 'trinateo-brand-hub' ); ?></a>
</main>
<?php get_footer(); ?>
