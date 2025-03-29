jQuery(document).ready(function ($) {
	$('.restore-quote').on('click', function () {
		const quoteId = $(this).data('quote-id');
		const button = $(this);

		if (!confirm('Are you sure you want to restore this quote?')) {
			return;
		}

		button.prop('disabled', true);

		$.ajax({
			url: NovaQuoteArchive.ajax_url,
			type: 'POST',
			data: {
				action: 'restore_archived_quote',
				quote_id: quoteId,
				nonce: NovaQuoteArchive.nonce,
			},
			success: function (response) {
				if (response.success) {
					button.closest('tr').fadeOut(400, function () {
						$(this).remove();
					});
				} else {
					alert('Error restoring quote: ' + response.data.message);
					button.prop('disabled', false);
				}
			},
			error: function () {
				alert('Error restoring quote. Please try again.');
				button.prop('disabled', false);
			},
		});
	});
});
