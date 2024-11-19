<?php if ( ! defined( 'ABSPATH' ) ) {
	exit;} // Exit if accessed directly ?>
<!DOCTYPE html>
<html
	<?php echo apply_filters( 'wpo_wcpdf_html_language_attributes', get_language_attributes(), $this->get_type(), $this ); ?>>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<?php
	$has_duplicate_order = $this->order->get_meta( '_adjusted_duplicate_order_id' );

	$heading_title = $this->order->is_paid() && ! $has_duplicate_order ? 'Receipt' : 'Invoice';

	$needs_payment  = $this->order->get_meta( 'needs_payment' );
	$deposit_chosen = $this->order->get_meta( '_deposit_chosen' );

	if ( ! $needs_payment && $deposit_chosen ) {
		$heading_title = 'Receipt';
	}

	?>
	<title><?php echo $heading_title; ?></title>
	<style type="text/css">
	<?php
	$this->template_styles();
	?>
	</style>
	<style type="text/css">
	<?php
	do_action( 'wpo_wcpdf_custom_styles', $this->get_type(), $this );
	?>
	</style>
</head>

<body class="<?php echo apply_filters( 'wpo_wcpdf_body_class', $this->get_type(), $this ); ?>">
	<?php echo $content; ?>
</body>

</html>
