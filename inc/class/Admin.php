<?php

namespace NOVA_B2B;

use WP_Roles;

class Admin {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;
	/**
	 * Instance Control
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	/**
	 * Class Constructor.
	 */
	public function __construct() {
		add_filter( 'manage_nova_quote_posts_columns', array( $this, 'add_nova_columns' ) );
		add_action( 'manage_nova_quote_posts_custom_column', array( $this, 'nova_quote_column_display' ), 20, 2 );
		add_action( 'restrict_manage_posts', array( $this, 'nova_quote_add_custom_filters' ) );
		add_action( 'pre_get_posts', array( $this, 'nova_quote_filter_query' ) );
		add_filter( 'editable_roles', array( $this, 'custom_editable_roles' ) );
		// add_action( 'pre_user_query', array( $this, 'restrict_rep_list_to_specific_roles' ) );
		// add_action( 'manage_nova_quote_posts_custom_column', array( $this, 'show_nova_quote_post_id' ), 10, 2 );
		// add_filter( 'manage_nova_quote_posts_columns', array( $this, 'modify_nova_quote_columns' ) );
		add_action( 'admin_footer', array( $this, 'move_row_actions_js' ) );
		add_filter( 'post_row_actions', array( $this, 'remove_view_link_quote_row_actions' ), 10, 2 );
		add_filter( 'acf/fields/user/result', array( $this, 'custom_acf_user_display' ), 10, 4 );
		// add_filter( 'acf/fields/user/search_columns', array( $this, 'custom_acf_user_search_columns' ), 10, 4 );
		add_filter( 'acf/fields/user/query', array( $this, 'modify_acf_user_query' ), 10, 3 );
		// add_action( 'pre_get_users', array( $this, 'extend_user_search' ) );
		add_filter( 'acf/ajax/query_users/args', array( $this, 'search_user_business_id' ), 10, 3 );
		add_action( 'admin_menu', array( $this, 'export_users_menu' ) );
		add_action( 'admin_init', array( $this, 'export_users_to_csv_check' ) );
		add_action( 'admin_menu', array( $this, 'export_quotes_menu' ) );
		add_action( 'admin_init', array( $this, 'export_quotes_to_csv_check' ) );
		add_action( 'wp_dashboard_setup', array( $this, 'remove_all_dashboard_widgets' ), 20 );
		add_action( 'admin_notices', array( $this, 'notice_testing_mode' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_quote_column' ) );
		add_action( 'wp_ajax_update_quote_status', array( $this, 'update_quote_status' ) );
	}

	public function update_quote_status() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'admin_account_nonce' ) ) {
			$status['error']  = 'Nonce error';
			$status['status'] = 'error';
			wp_send_json( $status );
		}

		$value    = $_POST['quote_status'];
		$quote_id = $_POST['post_id'];

		$old_status = get_field( 'quote_status', $quote_id )['value'];

		update_field( 'quote_status', $value, $quote_id );

		if ( $old_status !== 'ready' && $value === 'ready' ) {
			do_action( 'quote_to_payment', $quote_id, get_current_user_id() );
			$nova_quote_instance = \NOVA_B2B\Nova_Quote::get_instance();

			if ( $nova_quote_instance ) {
				$html     = $nova_quote_instance->html_invoice( $quote_id );
				$html_cad = $nova_quote_instance->html_invoice( $quote_id, 'CAD' );
				$nova_quote_instance->generate_pdf( $quote_id, $html, 'USD' );
				$nova_quote_instance->generate_pdf( $quote_id, $html_cad, 'CAD' );
			}
		}

		if ( $old_status === 'draft' && $value === 'processing' ) {
			do_action( 'quote_to_processing', $quote_id, get_current_user_id() );
		}

		$background_colors = array(
			'processing' => '#bb2124',
			'ready'      => '#22bb33',
			'draft'      => '#bbb',
		);

		$status['code']  = 2;
		$status['post']  = $_POST;
		$status['old']   = $old_status;
		$status['color'] = $background_colors[ $value ];
		wp_send_json( $status );
	}

	public function admin_quote_column() {
		$theme = wp_get_theme();
		wp_register_script( 'admin-quote-column', get_stylesheet_directory_uri() . '/assets/js/admin-quote-columns.js', array(), $theme->Version, true );
		wp_register_style( 'admin-quote-column', get_stylesheet_directory_uri() . '/assets/css/admin-column.css', array(), $theme->Version );
		if ( isset( $_GET['post_type'] ) && $_GET['post_type'] == 'nova_quote' ) {
			wp_enqueue_script( 'admin-quote-column' );
			wp_enqueue_style( 'admin-quote-column' );
		}
		wp_localize_script(
			'admin-quote-column',
			'AdminQuote',
			array(
				'ajax_url'   => admin_url( 'admin-ajax.php' ),
				'nonce'      => wp_create_nonce( 'admin_account_nonce' ),
				'quote_id'   => get_the_ID(),
				'partner_id' => get_field( 'partner', get_the_ID() ),
			)
		);
	}

	public function notice_testing_mode() {
		if ( get_field( 'testing_mode', 'option' ) ) {
			?>
<div class="notice notice-warning">
	<p><strong>TESTING MODE</strong>: Emails are temporarily disabled.</p>
</div>
			<?php
		}
	}

	public function remove_all_dashboard_widgets() {
		global $wp_meta_boxes;

		// Loop through all sections and remove each widget
		foreach ( $wp_meta_boxes['dashboard'] as $context => $sections ) {
			foreach ( $sections as $priority => $widgets ) {
				foreach ( $widgets as $widget_id => $widget ) {
					unset( $wp_meta_boxes['dashboard'][ $context ][ $priority ][ $widget_id ] );
				}
			}
		}
	}

	public function export_users_menu() {
		add_management_page(
			'Export Partners',
			'Export Partners',
			'manage_options',
			'export-partners',
			array( $this, 'export_users_page' )
		);
	}

	public function export_quotes_menu() {
		add_management_page(
			'Export Quotes',
			'Export Quotes',
			'manage_options',
			'export-quotes',
			array( $this, 'export_quotes_page' )
		);
	}

	public function export_quotes_page() {
		// Security check
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}

		// Output the HTML for the page
		echo '<div class="wrap">';
		echo '<h1>Export Quotes</h1>';
		echo '<p>Click the button below to export the quotes to a CSV file.</p>';
		// Button triggers the export action
		echo '<a href="' . admin_url( 'tools.php?page=export-quotes&export_quotes=1' ) . '" class="button button-primary">Export Quotes</a>';
		echo '</div>';
	}

	public function export_users_page() {
		// Security check
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}

		// Output the HTML for the page
		echo '<div class="wrap">';
		echo '<h1>Export Partners</h1>';
		echo '<p>Click the button below to export the partners to a CSV file.</p>';
		// Button triggers the export action
		echo '<a href="' . admin_url( 'tools.php?page=export-partners&export_partners=1' ) . '" class="button button-primary">Export Partners</a>';
		echo '</div>';
	}

	public function export_users_to_csv_check() {
		if ( isset( $_GET['export_partners'] ) && current_user_can( 'manage_options' ) ) {
			$this->export_users_to_csv();
		}
	}

	public function export_quotes_to_csv_check() {
		if ( isset( $_GET['export_quotes'] ) && current_user_can( 'manage_options' ) ) {
			$this->export_quotes_to_csv();
		}
	}

	public function export_quotes_to_csv() {
		// Fetch users with the 'Partner' role
		if ( isset( $_GET['export_quotes'] ) && current_user_can( 'manage_options' ) ) {
			$args   = array(
				'post_type'      => 'nova_quote',
				'posts_per_page' => -1,
				'post_status'    => 'publish',
			);
			$quotes = get_posts( $args );

			header( 'Content-Type: text/csv; charset=utf-8' );
			header( 'Content-Disposition: attachment; filename=quotes.csv' );

			$output = fopen( 'php://output', 'w' );
			fputcsv( $output, array( 'Quote ID', 'Date', 'Business ID', 'Partner Name', 'Status', 'Project Name' ) );

			foreach ( $quotes as $quote ) {

				$user_id      = get_field( 'partner', $quote->ID );
				$user_info    = get_userdata( $user_id );
				$partner_name = ( $user_info->first_name ? $user_info->first_name : '' ) . ' ' . ( $user_info->last_name ? $user_info->last_name : '' );

				$quote_data = array(
					'Quote ID'     => $quote->ID,
					'Date'         => $quote->post_date,
					'Business ID'  => get_field( 'business_id', 'user_' . $user_id ),
					'Partner Name' => $partner_name,
					'Status'       => get_field( 'quote_status', $quote->ID ) ? get_field( 'quote_status', $quote->ID )['label'] : '',
					'Project Name' => get_field( 'frontend_title', $quote->ID ),
				);
				fputcsv( $output, $quote_data );
			}
			fclose( $output );
			exit;
		}
	}

	public function export_users_to_csv() {
		// Fetch users with the 'Partner' role
		if ( isset( $_GET['export_partners'] ) && current_user_can( 'manage_options' ) ) {
			$args  = array(
				'role'    => 'partner',
				'orderby' => 'registered',
				'order'   => 'ASC',
			);
			$users = get_users( $args );

			$keywords = array( 'test', 'demo' );

			header( 'Content-Type: text/csv; charset=utf-8' );
			header( 'Content-Disposition: attachment; filename=users.csv' );

			$output = fopen( 'php://output', 'w' );
			fputcsv( $output, array( 'Business ID', 'Business Name', 'Username', 'Name', 'Email', 'Phone', 'Website', 'Address', 'City', 'Postcode', 'State', 'Country', 'Registration Date', '# of Orders', '# of Quotes' ) );

			foreach ( $users as $user ) {
				$first_name = $user->first_name;
				$last_name  = $user->last_name;
				$email      = $user->user_email;

				// Skip user if any field contains the keywords
				if ( self::containsKeywords( $first_name, $keywords ) ||
				self::containsKeywords( $last_name, $keywords ) ||
				self::containsKeywords( $email, $keywords ) ) {
					continue;
				}

				// Retrieve country or default to 'NONE'
				$country = get_user_meta( $user->ID, 'billing_country', true );
				if ( empty( $country ) ) {
					$country = 'NONE';
				}

				$state = get_user_meta( $user->ID, 'billing_state', true );
				if ( empty( $state ) ) {
					$state = 'NONE';
				}

				$user_data = array(
					'Business ID'       => get_field( 'business_id', 'user_' . $user->ID ) ?: 'None',
					'Business Name'     => get_field( 'business_name', 'user_' . $user->ID ) ?: 'None',
					'Username'          => $user->user_login ?: 'None',
					'Name'              => $first_name . ' ' . $last_name ?: 'None',
					'Email'             => $email ?: 'None',
					'Phone'             => get_field( 'business_phone_number', 'user_' . $user->ID ) ?: 'None',
					'Website'           => get_field( 'business_website', 'user_' . $user->ID ) ?: 'None',
					'Address'           => get_user_meta( $user->ID, 'billing_address_1', true ) ?: 'None',
					'City'              => get_user_meta( $user->ID, 'billing_city', true ) ?: 'None',
					'Postcode'          => get_user_meta( $user->ID, 'billing_postcode', true ) ?: 'None',
					'State'             => get_user_meta( $user->ID, 'billing_state', true ) ?: 'None',
					'Country'           => get_user_meta( $user->ID, 'billing_country', true ) ?: 'None',
					'Registration Date' => ( new \DateTime( $user->user_registered ) )->format( 'Y-m-d' ),
					'# of Orders'       => self::user_orders_count( $user->ID ),
					'# of Quotes'       => self::user_quotes_count( $user->ID ),
				);

				fputcsv( $output, $user_data );
			}
			fclose( $output );
			exit;
		}
	}

	public function user_quotes_count( $user_id ) {
		$args = array(
			'post_type'      => 'nova_quote',  // Set to your custom post type
			'posts_per_page' => -1,       // We don't need to retrieve all posts, just count them
			'fields'         => 'ids',            // Fetch only the IDs to speed up the query
			'post_status'    => 'publish',   // Consider only published posts; adjust if needed
			'meta_query'     => array(
				array(
					'key'     => 'partner',  // The ACF field key
					'value'   => $user_id, // The user ID you want to match
					'compare' => '=',    // Exact match
					'type'    => 'NUMERIC',  // Assuming the field is stored as a numeric value
				),
			),
		);

		$query = new \WP_Query( $args );
		return $query->found_posts; // Return the count of matching posts
	}

	public function user_orders_count( $user_id ) {
		if ( ! class_exists( 'WC_Order_Query' ) ) {
			return 'WooCommerce is not active';
		}

		// Set up the order query arguments
		$args = array(
			'customer_id' => $user_id, // User ID
			'return'      => 'ids',         // Return only IDs to speed up the query
			'status'      => array( 'wc-completed', 'wc-processing', 'wc-on-hold' ), // Optional: specify order statuses
		);

		// Create a new WC_Order_Query object with the specified arguments
		$query  = new \WC_Order_Query( $args );
		$orders = $query->get_orders(); // Get the orders

		// Return the count of orders
		return count( $orders );
	}

	public function search_user_business_id( $args, $request, $query ) {

		if ( isset( $request['s'] ) && ! empty( $request['s'] ) ) {
			$search_term = $request['s'];

			$args['meta_query'] = array(
				'relation' => 'OR',
				array(
					'key'     => 'business_id',
					'value'   => $search_term,
					'compare' => 'LIKE',
				),
				array(
					'key'     => 'first_name',
					'value'   => $search_term,
					'compare' => 'LIKE',
				),
				array(
					'key'     => 'last_name',
					'value'   => $search_term,
					'compare' => 'LIKE',
				),
				array(
					'key'     => 'business_name',
					'value'   => $search_term,
					'compare' => 'LIKE',
				),
				array(
					'key'     => 'business_email',
					'value'   => $search_term,
					'compare' => 'LIKE',
				),
				array(
					'key'     => 'employee_emails',
					'value'   => $search_term,
					'compare' => 'LIKE',
				),
			);

			unset( $args['search'] );
		}

		return $args;
	}

	public function modify_acf_user_query( $args, $field, $post_id ) {
		if ( isset( $field['business_id'] ) && $field['business_id'] ) {
			$args['business_id'] = true;
		}
		if ( isset( $field['business_name'] ) && $field['business_name'] ) {
			$args['business_name'] = true;
		}
		return $args;
	}

	public function extend_user_search( $query ) {

		$query->query_vars['meta_key']     = 'business_id';
		$query->query_vars['meta_value']   = 'USAZ';
		$query->query_vars['meta_compare'] = 'LIKE';
	}

	public function custom_acf_user_search_columns( $columns, $search, $WP_User_Query, $field ) {

		$columns[] = 'meta_value';

		$WP_User_Query->set( 'meta_key', 'business_id' );
		$WP_User_Query->set( 'meta_value', $search );
		$WP_User_Query->set( 'meta_compare', 'LIKE' );

		return $columns;
	}

	public function custom_acf_user_display( $text, $user, $field, $post_id ) {
		$business_id   = get_field( 'business_id', 'user_' . $user->ID );
		$business_name = get_field( 'business_name', 'user_' . $user->ID ) ? ' - ' . get_field( 'business_name', 'user_' . $user->ID ) : '';
		$name          = $user->first_name . ' ' . $user->last_name;
		if ( $business_id ) {
			return $business_id . ' - ' . $name . ' ' . $business_name;
		}
		return $name;
	}

	public function remove_view_link_quote_row_actions( $actions, $post ) {
		if ( 'nova_quote' === $post->post_type ) {
			unset( $actions['view'] );
			unset( $actions['inline hide-if-no-js'] );
		}
		return $actions;
	}

	public function modify_nova_quote_columns( $columns ) {

		$columns['post_id'] = 'ID';

		return $columns;
	}

	public function show_nova_quote_post_id( $column, $post_id ) {
		switch ( $column ) {
			case 'post_id':
				echo $post_id; // Display the Post ID
				break;
		}
	}

	public function restrict_rep_list_to_specific_roles( $user_search ) {
		global $wpdb;

		if ( current_user_can( 'customer-rep' ) ) {
			$user_search->query_where =
			$user_search->query_where . ' AND ' .
			$wpdb->prefix . "usermeta.meta_key = '{$wpdb->prefix}capabilities' AND (" .
			$wpdb->prefix . "usermeta.meta_value LIKE '%pending%' OR " .
			$wpdb->prefix . "usermeta.meta_value LIKE '%partner%' OR " .
			$wpdb->prefix . "usermeta.meta_value LIKE '%temporary%' )";
		}
	}

	public function custom_editable_roles( $roles ) {
		if ( current_user_can( 'customer-rep' ) ) {
			global $wp_roles;
			if ( ! isset( $wp_roles ) ) {
				$wp_roles = new WP_Roles();
			}

			$new_roles     = array();
			$allowed_roles = array( 'pending', 'partner', 'temporary' );

			foreach ( $allowed_roles as $role ) {
				if ( isset( $wp_roles->roles[ $role ] ) ) {
					$new_roles[ $role ] = $wp_roles->roles[ $role ];
				}
			}

			return $new_roles;
		}
		return $roles;
	}

	public function nova_quote_add_custom_filters() {
		global $typenow;
		if ( $typenow == 'nova_quote' ) { // Check if it's the correct post type
			// Dropdown for Quote Status
			$quote_statuses = array(
				'draft'      => 'Draft',
				'processing' => 'Processing',
				'ready'      => 'To Payment',
			); // Assume this function returns an array of quote statuses
			echo '<select name="quote_status">';
			echo '<option value="">All Statuses</option>';
			foreach ( $quote_statuses as $key => $value ) {
				$selected = ( isset( $_GET['quote_status'] ) && $_GET['quote_status'] == $key ) ? ' selected="selected"' : '';
				echo "<option value='{$key}'{$selected}>{$value}</option>";
			}
			echo '</select>';

			// Dropdown for Partner
			$partners = $this->get_partners();
			echo '<select name="partner">';
			echo '<option value="">All Partners</option>';
			foreach ( $partners as $key => $value ) {
				$selected = ( isset( $_GET['partner'] ) && $_GET['partner'] == $key ) ? ' selected="selected"' : '';
				echo "<option value='{$key}'{$selected}>{$value}</option>";
			}
			echo '</select>';

		}
	}

	public function get_partners() {
		$partners_array = array();
		// $args           = array( 'role' => array( 'partner' ) );
		$partners = get_users( array() );

		foreach ( $partners as $partner ) {
			// Assuming you want to use user display name as value and user ID as key
			$partners_array[ $partner->ID ] = $partner->display_name;
		}

		return $partners_array;
	}

	public function nova_quote_column_display( $column, $post_id ) {
		switch ( $column ) {
			case 'quote_id':
				echo "<strong style='font-size: 120%;'><a>Q-" . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '</a></strong>';
				break;
			case 'business_id':
				$partner_id = get_field( 'partner', $post_id );
				echo get_field( 'business_id', 'user_' . $partner_id );
				break;
			case 'project_name':
				echo '<strong>' . get_field( 'frontend_title', $post_id ) . '</strong>';
				break;
			case 'partner':
				// Display content for the partner column
				$user_id   = get_field( 'partner', $post_id );
				$user_info = get_userdata( $user_id );
				echo ( isset( $user_info->first_name ) ? $user_info->first_name : '' ) . ' ' . ( isset( $user_info->last_name ) ? $user_info->last_name : '' );
				break;
			case 'quote_status':
				$this->quote_status_select_view( $post_id );
				break;
			case 'view_details':
				$details = home_url( '/my-account/mockups/view/?qid=' . $post_id );
				echo '<a target="_blank" class="button button-primary button-large" href="' . $details . '">View Details</a>';
				break;
		}
	}

	public function quote_status_old_view( $post_id ) {
		if ( isset( get_field( 'quote_status', $post_id )['value'] ) ) {
			if ( get_field( 'quote_status', $post_id )['value'] === 'processing' ) {
				echo '<span style="padding: 1em; background-color: #bb2124; color: #fff; display: block; text-align: center; width: 120px;">' . get_field( 'quote_status', $post_id )['label'] . '</span>';
			} elseif ( get_field( 'quote_status', $post_id )['value'] === 'ready' ) {
				echo '<span style="padding: 1em; background-color: #22bb33; color: #fff; display: block; text-align: center; width: 120px;">' . get_field( 'quote_status', $post_id )['label'] . '</span>';
			} else {
				echo '<span style="padding: 1em; background-color: gray; color: #fff; display: block; text-align: center; width: 120px;">' . get_field( 'quote_status', $post_id )['label'] . '</span>';
			}
		}
	}

	public function quote_status_select_view( $post_id ) {

		$loading = '<div class="spinner" role="status"></div>';

		$quote_status = get_field( 'quote_status', $post_id );
		if ( isset( $quote_status['value'] ) ) {
			$status_value = $quote_status['value'];

			// Define status options
			$status_options = array(
				'processing' => 'Processing',
				'ready'      => 'To Payment',
				'draft'      => 'Draft',
			);

			$background_colors = array(
				'processing' => '#bb2124',
				'ready'      => '#22bb33',
				'draft'      => '#bbb',
			);

			// Generate the select dropdown
			echo '<div class="select-wrap">';
			echo '<select name="quote_status" style="border-color: ' . $background_colors[ $status_value ] . ';" data-quote-id="' . $post_id . '">';
			foreach ( $status_options as $value => $label ) {
				$selected = ( $status_value === $value ) ? 'selected' : '';
				echo '<option value="' . esc_attr( $value ) . '" ' . $selected . '>' . esc_html( $label ) . '</option>';
			}
			echo '</select>';
			echo $loading;
			echo '</div>';
		}
	}

	public function add_nova_columns( $defaults ) {
		// unset( $defaults['author'] );
		$new_columns['cb']           = $defaults['cb'];
		$new_columns['quote_id']     = 'Quote ID';
		$new_columns['date']         = 'Date';
		$new_columns['business_id']  = 'Business ID';
		$new_columns['partner']      = 'Partner Name';
		$new_columns['quote_status'] = 'Status';
		$new_columns['project_name'] = 'Project Name';
		$new_columns['view_details'] = 'View Details';

		return $new_columns;
	}

	public function nova_quote_filter_query( $query ) {
		global $pagenow;
		if ( is_admin() && $pagenow == 'edit.php' && isset( $query->query_vars['post_type'] ) && $query->query_vars['post_type'] === 'nova_quote' ) {
			$meta_query = array( 'relation' => 'AND' ); // Initialize meta_query array

			if ( ! empty( $_GET['quote_status'] ) ) {
				$meta_query[] = array(
					'key'     => 'quote_status',
					'value'   => $_GET['quote_status'],
					'compare' => '=',
				);
			}

			if ( ! empty( $_GET['partner'] ) ) {
				$meta_query[] = array(
					'key'     => 'partner',
					'value'   => $_GET['partner'],
					'compare' => '=',
				);
			}

			if ( count( $meta_query ) > 1 ) { // Check if any meta query is added
				$query->set( 'meta_query', $meta_query );
			}
		}
	}

	public static function containsKeywords( $string, $keywords ) {
		$lowerString = strtolower( $string ); // Convert string to lower case once
		foreach ( $keywords as $keyword ) {
			if ( strpos( $lowerString, $keyword ) !== false ) {
				return true;
			}
		}
		return false;
	}

	public function move_row_actions_js() {
		$screen = get_current_screen();
		if ( $screen->id === 'edit-nova_quote' ) {
			?>
<script type="text/javascript">
jQuery(document).ready(function($) {
	// Move the row actions from their original location to the 'user_id' column
	$('#the-list tr').each(function() {
		var $this = $(this);
		var rowActions = $this.find('.row-actions').clone(); // Clone the row actions
		$this.find('.row-actions').remove(); // Remove the original row actions

		// Check if the 'user_id' column exists and append the cloned row actions
		var userIDCell = $this.find('td.quote_id');
		if (userIDCell.length) {
			userIDCell.append(rowActions);
		}
	});
});
</script>
			<?php
		}
	}
}
