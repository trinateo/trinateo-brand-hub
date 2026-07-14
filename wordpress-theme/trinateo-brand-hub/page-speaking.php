<?php
/**
 * Template Name: Speaking
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$events   = tt_get_speaking_engagements();
$upcoming = array();
$past     = array();
foreach ( $events as $event ) {
	if ( '1' === get_post_meta( $event->ID, '_tt_is_upcoming', true ) ) {
		$upcoming[] = $event;
	} else {
		$past[] = $event;
	}
}

function tt_speaking_card( $event ) {
	$date     = get_post_meta( $event->ID, '_tt_event_date', true );
	$location = get_post_meta( $event->ID, '_tt_location', true );
	$topic    = get_post_meta( $event->ID, '_tt_topic', true );
	$audience = get_post_meta( $event->ID, '_tt_audience_type', true );
	$url      = get_post_meta( $event->ID, '_tt_event_url', true );
	?>
	<article class="tt-card" style="cursor:default">
		<div style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem">
			<h3 class="tt-card__title" style="margin:0"><?php echo esc_html( $event->post_title ); ?></h3>
			<?php if ( $date ) : ?>
				<span style="font-size:0.875rem;color:var(--tt-neutral-500);white-space:nowrap"><?php echo esc_html( date_i18n( 'F j, Y', strtotime( $date ) ) ); ?></span>
			<?php endif; ?>
		</div>
		<?php if ( $topic ) : ?>
			<p style="font-size:0.875rem;color:var(--tt-neutral-700);margin-top:0.5rem"><?php echo esc_html( $topic ); ?></p>
		<?php endif; ?>
		<div style="font-size:0.875rem;color:var(--tt-neutral-500);margin-top:0.5rem">
			<?php echo esc_html( trim( implode( ' · ', array_filter( array( $location, $audience ) ) ) ) ); ?>
		</div>
		<?php if ( $url ) : ?>
			<a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:0.75rem;font-size:0.875rem;color:var(--tt-blue-600)"><?php esc_html_e( 'Event details', 'trinateo-brand-hub' ); ?> &rarr;</a>
		<?php endif; ?>
	</article>
	<?php
}
?>

<main class="tt-section tt-section--first">
	<h1 class="tt-h1"><?php esc_html_e( 'Speaking', 'trinateo-brand-hub' ); ?></h1>
	<p class="tt-lede"><?php esc_html_e( 'Past and upcoming speaking engagements.', 'trinateo-brand-hub' ); ?></p>

	<?php if ( empty( $events ) ) : ?>
		<p class="tt-empty"><?php esc_html_e( 'No speaking events listed yet.', 'trinateo-brand-hub' ); ?></p>
	<?php else : ?>
		<?php if ( ! empty( $upcoming ) ) : ?>
			<section style="margin-bottom:3rem">
				<h2 class="tt-h2" style="margin-bottom:1.5rem"><?php esc_html_e( 'Upcoming', 'trinateo-brand-hub' ); ?></h2>
				<div class="tt-grid tt-grid--2">
					<?php foreach ( $upcoming as $event ) { tt_speaking_card( $event ); } ?>
				</div>
			</section>
		<?php endif; ?>
		<?php if ( ! empty( $past ) ) : ?>
			<section>
				<h2 class="tt-h2" style="margin-bottom:1.5rem"><?php esc_html_e( 'Past', 'trinateo-brand-hub' ); ?></h2>
				<div class="tt-grid tt-grid--2">
					<?php foreach ( $past as $event ) { tt_speaking_card( $event ); } ?>
				</div>
			</section>
		<?php endif; ?>
	<?php endif; ?>
</main>

<?php get_footer(); ?>
