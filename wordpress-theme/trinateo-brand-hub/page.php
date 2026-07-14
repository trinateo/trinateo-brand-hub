<?php
/**
 * Fallback for any WordPress Page that isn't one of the dedicated
 * templates (front-page.php, page-about.php, etc).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
while ( have_posts() ) :
	the_post();
	?>
	<main class="tt-detail">
		<h1 class="tt-detail__title"><?php the_title(); ?></h1>
		<div><?php the_content(); ?></div>
	</main>
	<?php
endwhile;
get_footer();
