<?php
/**
 * Site footer.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$pages       = get_option( 'tt_seeded_pages', array() );
$contact_url = isset( $pages['contact'] ) ? get_permalink( $pages['contact'] ) : home_url( '/contact/' );
?>
	<footer class="tt-footer">
		<div class="tt-footer__inner">
			<span>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( tt_profile_field( '_tt_tagline' ) ? get_bloginfo( 'name' ) : 'Trina Teo' ); ?>. All rights reserved.</span>
			<a href="<?php echo esc_url( $contact_url ); ?>"><?php esc_html_e( 'Get in touch', 'trinateo-brand-hub' ); ?></a>
		</div>
	</footer>

<?php wp_footer(); ?>
</body>
</html>
