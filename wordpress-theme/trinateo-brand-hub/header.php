<?php
/**
 * Site header.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="tt-header">
	<div class="tt-header__inner">
		<a class="tt-header__logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<?php echo esc_html( get_bloginfo( 'name' ) ? get_bloginfo( 'name' ) : tt_profile_field( '_tt_tagline', 'Trina Teo' ) ); ?>
		</a>
		<nav class="tt-nav">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'items_wrap' => '%3$s' ) );
			} else {
				$pages = get_option( 'tt_seeded_pages', array() );
				$links = array(
					'services'  => array( home_url( '/services/' ), __( 'Services', 'trinateo-brand-hub' ) ),
					'about'     => array( isset( $pages['about'] ) ? get_permalink( $pages['about'] ) : home_url( '/about/' ), __( 'About', 'trinateo-brand-hub' ) ),
					'proof'     => array( isset( $pages['proof'] ) ? get_permalink( $pages['proof'] ) : home_url( '/proof/' ), __( 'Proof', 'trinateo-brand-hub' ) ),
					'speaking'  => array( isset( $pages['speaking'] ) ? get_permalink( $pages['speaking'] ) : home_url( '/speaking/' ), __( 'Speaking', 'trinateo-brand-hub' ) ),
					'resources' => array( isset( $pages['resources'] ) ? get_permalink( $pages['resources'] ) : home_url( '/resources/' ), __( 'Resources', 'trinateo-brand-hub' ) ),
					'contact'   => array( isset( $pages['contact'] ) ? get_permalink( $pages['contact'] ) : home_url( '/contact/' ), __( 'Contact', 'trinateo-brand-hub' ) ),
				);
				foreach ( $links as $link ) {
					printf( '<a href="%s">%s</a>', esc_url( $link[0] ), esc_html( $link[1] ) );
				}
			}
			?>
		</nav>
	</div>
</header>
