<?php
$order_number = $_GET['order_number'];

$order_number = trim( strtolower( $order_number ) );
$order_number = str_replace( [ 'nv', '-' ], '', $order_number );

$order = wc_get_order( $order_number );

if ( empty( $order_number ) || ! $order ) {
	?>
	<form method="GET" class="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
		<div class="mb-6">
			<label for="order_number" class="block text-sm font-semibold text-gray-800 mb-2">Track Your Order</label>
			<input type="text" name="order_number" id="order_number"
				class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent transition-all duration-200"
				value="<?php echo $_GET['order_number'] ? esc_attr( $_GET['order_number'] ) : ''; ?>"
				placeholder="Enter your order number" required>
		</div>
		<?php if ( ! $order && $order_number ) : ?>
			<div class="text-red-500 p-4 mb-4 bg-red-50 rounded-lg text-sm flex items-center">
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				Order not found
			</div>
		<?php endif; ?>
		<button type="submit"
			class="w-full bg-nova-primary text-white px-6 py-3 rounded-lg hover:bg-nova-primary/90 transition-all duration-200 font-medium shadow-sm hover:shadow-md">
			Track Order
		</button>
	</form>
	<?php
	return;
} else {
	$order_lead_time = $order->get_meta( 'lead_time_status' );
	if ( empty( $order_lead_time ) ) {
		?>
		<div class="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
			<div class="text-center text-gray-500 text-sm">
				No lead time data found for this order. Contact us for more information.
			</div>
		</div>
		<?php
	} else {
		$status_config = [ 
			'order_received' => [ 'icon' => '✓', 'label' => 'Order Received' ],
			'waiting_for_drawing' => [ 'icon' => '⏱️', 'label' => 'Waiting for Drawing' ],
			'drawing_approved' => [ 'icon' => '📝', 'label' => 'Drawing Approved' ],
			'in_production' => [ 'icon' => '🔧', 'label' => 'In Production' ],
			'ready_for_packing' => [ 'icon' => '📦', 'label' => 'Ready for Packing' ],
			'shipped' => [ 'icon' => '🚚', 'label' => 'Shipped' ],
			'delivered' => [ 'icon' => '🏠', 'label' => 'Delivered' ]
		];
		?>
		<h3 class="text-center text-2xl font-bold mb-4">Lead Time of Order #<?php echo $order_number; ?></h3>
		<div class="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
			<?php foreach ( $status_config as $key => $config ) :
				if ( ! isset( $order_lead_time[ $key ] ) )
					continue;

				$value = $order_lead_time[ $key ];
				$is_active = $value['is_active'];
				$date = $value['timestamp'] ? esc_html( date_i18n( 'F j, Y', $value['timestamp'] ) ) : '';
				$active_class = $is_active ? 'bg-nova-primary' : 'bg-gray-100';
				$text_class = $is_active ? 'text-gray-900' : 'text-gray-400';
				$icon_class = $is_active ? 'text-white' : 'text-gray-400';
				$is_last = $key === 'delivered';
				?>
				<div class="flex relative group">
					<?php if ( ! $is_last ) : ?>
						<div class="absolute left-6 top-10 bottom-0 w-0.5 <?php echo $active_class; ?>"></div>
					<?php endif; ?>

					<div
						class="flex items-center justify-center w-12 h-12 rounded-full <?php echo $active_class; ?> flex-shrink-0 z-10 shadow-lg transform group-hover:scale-110 transition-all duration-200">
						<span class="<?php echo $icon_class; ?> text-xl"><?php echo $config['icon']; ?></span>
					</div>

					<div class="ml-6 mb-10">
						<div class="font-semibold <?php echo $text_class; ?> text-lg"><?php echo $config['label']; ?></div>
						<div class="text-sm text-gray-500 mt-1"><?php echo $date; ?></div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
		<?php
	}
}
?>