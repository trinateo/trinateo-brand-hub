<?php
/**
 * Seeds the same demo content the original Supabase build shipped with,
 * so activating this theme gives an immediately screenshot-able site.
 * Runs once on theme activation; safe to leave in place afterwards.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function tt_seed_content() {
	if ( get_option( 'tt_seed_content_done' ) ) {
		return;
	}

	// Profile
	$profile_id = wp_insert_post(
		array(
			'post_type'    => 'tt_profile',
			'post_title'   => 'Trina Teo',
			'post_content' => "Trina Teo is a trusted advisor to C-suite leaders and HR decision-makers across Asia-Pacific. With 15+ years of experience spanning organisational transformation, leadership development, and executive coaching, she partners with leaders navigating complexity and high-stakes change. Trina combines strategic rigour with human-centred practice to deliver measurable outcomes.",
			'post_status'  => 'publish',
		)
	);
	update_post_meta( $profile_id, '_tt_tagline', 'Executive coach and leadership strategist helping CEOs and HR leaders build thriving organisations.' );
	update_post_meta( $profile_id, '_tt_expertise_tags', 'Executive Coaching, Leadership Development, Organisational Transformation, HR Strategy, C-Suite Advisory' );

	// Services
	$services = array(
		array(
			'title'       => 'Executive Coaching',
			'slug'        => 'executive-coaching',
			'summary'     => 'One-to-one coaching for senior leaders navigating career transitions, team dynamics, or strategic inflection points.',
			'who'         => 'CEOs, C-suite executives, senior leaders stepping into new roles or facing complex decisions.',
			'outcomes'    => 'Greater clarity on leadership identity; stronger decision-making; measurable improvement in team performance.',
			'order'       => 1,
		),
		array(
			'title'       => 'Leadership Team Facilitation',
			'slug'        => 'leadership-team-facilitation',
			'summary'     => 'Structured offsite and workshop facilitation to align leadership teams around strategy, culture, and priorities.',
			'who'         => 'Leadership teams preparing for a new strategy cycle, post-merger integration, or culture reset.',
			'outcomes'    => 'Aligned leadership team; clear priorities; actionable roadmap with shared ownership.',
			'order'       => 2,
		),
		array(
			'title'       => 'HR Strategy Advisory',
			'slug'        => 'hr-strategy-advisory',
			'summary'     => 'Strategic counsel for HR leaders and people functions building capability for the future of work.',
			'who'         => 'CHROs, HR Directors, and People leaders shaping the people agenda for their organisations.',
			'outcomes'    => 'A coherent people strategy; board-ready business cases; stronger HR-to-business partnership.',
			'order'       => 3,
		),
	);
	$service_ids = array();
	foreach ( $services as $service ) {
		$id = wp_insert_post(
			array(
				'post_type'    => 'tt_service',
				'post_title'   => $service['title'],
				'post_name'    => $service['slug'],
				'post_excerpt' => $service['summary'],
				'menu_order'   => $service['order'],
				'post_status'  => 'publish',
			)
		);
		update_post_meta( $id, '_tt_who_its_for', $service['who'] );
		update_post_meta( $id, '_tt_outcomes', $service['outcomes'] );
		update_post_meta( $id, '_tt_cta_label', 'Enquire Now' );
		$service_ids[ $service['slug'] ] = $id;
	}

	// Case studies
	$case_studies = array(
		array(
			'title'    => 'Aligning a Fractured Leadership Team Post-Merger',
			'sector'   => 'Financial Services',
			'challenge' => "A regional bank's leadership team was deeply misaligned following a cross-border merger, resulting in stalled decisions and rising attrition.",
			'approach' => 'Trina conducted individual leader assessments, facilitated a two-day leadership alignment offsite, and coached the CEO through a 90-day re-contracting process with the team.',
			'outcome'  => 'Within six months, executive attrition dropped by 40% and the team delivered its first joint strategic plan on time.',
			'tags'     => array( 'Leadership Alignment', 'Post-Merger', 'Executive Coaching' ),
			'order'    => 1,
		),
		array(
			'title'    => 'Building a Future-Ready HR Function',
			'sector'   => 'Technology',
			'challenge' => "A fast-scaling tech company's HR team was reactive and under-resourced, unable to support rapid headcount growth or retain top talent.",
			'approach' => 'Trina partnered with the CHRO to redesign the HR operating model, prioritise capability gaps, and build a 12-month people strategy roadmap.',
			'outcome'  => 'HR business partnering scores improved by 30 points; time-to-hire fell by 25%; the CHRO secured board approval for a 20% team investment.',
			'tags'     => array( 'HR Strategy', 'Organisational Design', 'Talent' ),
			'order'    => 2,
		),
	);
	foreach ( $case_studies as $cs ) {
		$id = wp_insert_post(
			array(
				'post_type'   => 'tt_case_study',
				'post_title'  => $cs['title'],
				'menu_order'  => $cs['order'],
				'post_status' => 'publish',
			)
		);
		update_post_meta( $id, '_tt_client_sector', $cs['sector'] );
		update_post_meta( $id, '_tt_challenge', $cs['challenge'] );
		update_post_meta( $id, '_tt_approach', $cs['approach'] );
		update_post_meta( $id, '_tt_outcome', $cs['outcome'] );
		wp_set_object_terms( $id, $cs['tags'], 'tt_case_study_tag' );
	}

	// Testimonials
	$testimonials = array(
		array( 'name' => 'James Lim', 'role' => 'CEO', 'company' => 'Apex Financial Group', 'quote' => 'Trina helped me see my leadership blind spots with clarity and compassion. The work we did together directly shaped how I led our merger — I cannot recommend her highly enough.', 'service' => 'executive-coaching', 'order' => 1 ),
		array( 'name' => 'Priya Sharma', 'role' => 'CHRO', 'company' => 'NovaTech Asia', 'quote' => "Working with Trina transformed how our HR team operates. She doesn't just advise — she challenges, supports, and delivers real results.", 'service' => 'hr-strategy-advisory', 'order' => 2 ),
		array( 'name' => 'David Chen', 'role' => 'Managing Director', 'company' => 'Meridian Consulting', 'quote' => 'The leadership offsite Trina facilitated was the turning point for our team. We left with alignment we had been chasing for two years.', 'service' => 'leadership-team-facilitation', 'order' => 3 ),
	);
	foreach ( $testimonials as $t ) {
		$id = wp_insert_post(
			array(
				'post_type'    => 'tt_testimonial',
				'post_title'   => $t['name'],
				'post_content' => $t['quote'],
				'menu_order'   => $t['order'],
				'post_status'  => 'publish',
			)
		);
		update_post_meta( $id, '_tt_author_role', $t['role'] );
		update_post_meta( $id, '_tt_author_company', $t['company'] );
		update_post_meta( $id, '_tt_related_service', $service_ids[ $t['service'] ] ?? '' );
	}

	// Speaking engagements
	$speaking = array(
		array( 'name' => 'HR Leaders Summit Asia 2024', 'date' => '2024-09-12', 'location' => 'Singapore', 'topic' => 'From Seat at the Table to Voice in the Room: Elevating the CHRO Role', 'audience' => 'HR Directors and CHROs', 'upcoming' => false ),
		array( 'name' => 'CEO Institute Leadership Forum', 'date' => '2024-11-05', 'location' => 'Sydney, Australia', 'topic' => 'Leading Through Ambiguity: What the Best CEOs Do Differently', 'audience' => 'CEOs and Managing Directors', 'upcoming' => false ),
		array( 'name' => 'Future of Work Conference 2025', 'date' => '2025-06-18', 'location' => 'Singapore', 'topic' => 'People Strategy in the Age of AI: What HR Leaders Must Get Right', 'audience' => 'HR and Business Leaders', 'upcoming' => true ),
	);
	foreach ( $speaking as $s ) {
		$id = wp_insert_post(
			array(
				'post_type'   => 'tt_speaking',
				'post_title'  => $s['name'],
				'post_status' => 'publish',
			)
		);
		update_post_meta( $id, '_tt_event_date', $s['date'] );
		update_post_meta( $id, '_tt_location', $s['location'] );
		update_post_meta( $id, '_tt_topic', $s['topic'] );
		update_post_meta( $id, '_tt_audience_type', $s['audience'] );
		update_post_meta( $id, '_tt_is_upcoming', $s['upcoming'] ? '1' : '' );
	}

	// Resources
	$resource_id = wp_insert_post(
		array(
			'post_type'    => 'tt_resource',
			'post_title'   => 'The Executive Transition Playbook',
			'post_content' => 'A practical guide for senior leaders moving into new executive roles — covering the first 90 days, stakeholder mapping, and early wins.',
			'menu_order'   => 1,
			'post_status'  => 'publish',
		)
	);
	update_post_meta( $resource_id, '_tt_resource_type', 'guide' );

	// Sample enquiry
	$enquiry_id = wp_insert_post(
		array(
			'post_type'    => 'tt_enquiry',
			'post_title'   => 'Sample Visitor',
			'post_content' => 'I am looking for executive coaching support as I step into a new CEO role. Would love to explore working with Trina.',
			'post_status'  => 'publish',
		)
	);
	update_post_meta( $enquiry_id, '_tt_visitor_email', 'sample@example.com' );
	update_post_meta( $enquiry_id, '_tt_visitor_company', 'Acme Corp' );
	update_post_meta( $enquiry_id, '_tt_visitor_role', 'CEO' );
	update_post_meta( $enquiry_id, '_tt_how_can_i_help', 'Executive Coaching' );
	update_post_meta( $enquiry_id, '_tt_status', 'new' );

	// A front page and contact page so the theme is immediately navigable.
	$front_page_id = wp_insert_post(
		array(
			'post_title'   => 'Home',
			'post_status'  => 'publish',
			'post_type'    => 'page',
			'page_template' => 'front-page.php',
		)
	);
	$contact_page_id = wp_insert_post(
		array(
			'post_title'    => 'Contact',
			'post_status'   => 'publish',
			'post_type'     => 'page',
			'post_name'     => 'contact',
			'page_template' => 'page-contact.php',
		)
	);
	$about_page_id = wp_insert_post( array( 'post_title' => 'About', 'post_status' => 'publish', 'post_type' => 'page', 'post_name' => 'about', 'page_template' => 'page-about.php' ) );
	$proof_page_id = wp_insert_post( array( 'post_title' => 'Proof', 'post_status' => 'publish', 'post_type' => 'page', 'post_name' => 'proof', 'page_template' => 'page-proof.php' ) );
	$speaking_page_id = wp_insert_post( array( 'post_title' => 'Speaking', 'post_status' => 'publish', 'post_type' => 'page', 'post_name' => 'speaking', 'page_template' => 'page-speaking.php' ) );
	$resources_page_id = wp_insert_post( array( 'post_title' => 'Resources', 'post_status' => 'publish', 'post_type' => 'page', 'post_name' => 'resources', 'page_template' => 'page-resources.php' ) );

	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $front_page_id );

	update_option( 'tt_seed_content_done', 1 );
	update_option( 'tt_seeded_pages', array(
		'contact'   => $contact_page_id,
		'about'     => $about_page_id,
		'proof'     => $proof_page_id,
		'speaking'  => $speaking_page_id,
		'resources' => $resources_page_id,
	) );

	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'tt_seed_content' );
