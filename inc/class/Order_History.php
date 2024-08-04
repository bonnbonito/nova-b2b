<?php

namespace NOVA_B2B;

class Order_History {
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
		add_action( 'woocommerce_account_account-statement_endpoint', array( $this, 'account_statement_content' ) );
	}

	public function account_statement_content() {
		?>
<div id="AccountStatement">Hello World</div>
		<?php
	}
}
