<?php

namespace NOVA_B2B\Inc\Classes;

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
			);

			unset( $args['search'] );
		}

		return $args;
	}

	public function modify_acf_user_query( $args, $field, $post_id ) {
		if ( isset( $field['business_id'] ) && $field['business_id'] ) {
			$args['business_id'] = true;
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
		$business_id = get_field( 'business_id', 'user_' . $user->ID );
		$name        = $user->first_name . ' ' . $user->last_name;
		if ( $business_id ) {
			return $business_id . ' - ' . $name;
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
				echo $user_info->first_name . ' ' . $user_info->last_name;
				break;
			case 'quote_status':
				if ( get_field( 'quote_status' )['value'] === 'processing' ) {
					echo '<span style="padding: 1em; background-color: #bb2124; color: #fff; display: block; text-align: center; width: 120px;">' . get_field( 'quote_status' )['label'] . '</span>';
				} elseif ( get_field( 'quote_status' )['value'] === 'ready' ) {
					echo '<span style="padding: 1em; background-color: #22bb33; color: #fff; display: block; text-align: center; width: 120px;">' . get_field( 'quote_status' )['label'] . '</span>';
				} else {
					echo '<span style="padding: 1em; background-color: gray; color: #fff; display: block; text-align: center; width: 120px;">' . get_field( 'quote_status' )['label'] . '</span>';
				}

				break;
		}
	}

	public function add_nova_columns( $defaults ) {
		// unset( $defaults['author'] );
		$new_columns['quote_id']     = 'Quote ID';
		$new_columns['date']         = 'Date';
		$new_columns['business_id']  = 'Business ID';
		$new_columns['partner']      = 'Partner Name';
		$new_columns['quote_status'] = 'Status';
		$new_columns['project_name'] = 'Project Name';
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

Admin::get_instance();
