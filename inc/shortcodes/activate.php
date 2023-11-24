<?php
$activation = $_GET['key'];
$user_id    = $_GET['pu'];
$user       = new WP_User( $user_id );

if ( $activation === get_user_meta( $user_id, 'account_activation_key', true ) ) {

	echo 'Thanks for activating. Please wait while we approve  your account';

	do_action( 'nova_activated', $user_id );

} elseif ( in_array( 'pending', (array) $user->roles ) ) {
	echo 'You have already activated your email. Please wait while we approve your account.';
	do_action( 'nova_already_activated', $user_id );
} else {
	echo 'Error';
	do_action( 'nova_activation_error', $user_id );
}
