export default function PrintView() {
	const currency = wcumcs_vars_data.currency;
	return (
		<div id="quoteDiv" ref={quoteRef} className="pb-6">
			<div className="flex gap-2 items-center mb-4 ">
				<h6 className="m-0 text-nova-primary">
					STATUS:{' '}
					<span className="text-sm">
						{NovaAccount.quote_status.label}
					</span>
				</h6>
			</div>
			<div className="mb-10 block">
				<h4 className="uppercase">
					QUOTE ID: Q-{NovaAccount.ID.padStart(4, '0')}
				</h4>
			</div>
			<div className="flex gap-2 items-center">
				<h6 className="leading-[2] m-0">INITIAL QUOTE REQUESTED ON:</h6>{' '}
				<span className="text-sm">{NovaAccount.published}</span>
			</div>
			<div className="flex gap-2 items-center">
				<h6 className="leading-[2] m-0">LAST QUOTE SAVED:</h6>{' '}
				<span className="text-sm">{NovaAccount.updated_date}</span>
			</div>
			<div className="flex gap-2 items-center mb-6">
				<h6 className="leading-[2] m-0">QUOTE NAME:</h6>{' '}
				<span className="text-sm">{decodeHTML(NovaAccount.title)}</span>
			</div>
			<div className="flex gap-2 items-center">
				<h6 className="leading-[2] m-0">BUSINESS ID:</h6>{' '}
				<span className="text-sm">
					{NovaAccount.business_id ? NovaAccount.business_id : 'None'}
				</span>
			</div>
			<div className="flex gap-2 items-center mb-6">
				<h6 className="leading-[2] m-0">COMPANY NAME:</h6>{' '}
				<span className="text-sm">
					{NovaAccount.company_name ? NovaAccount.company_name : 'None'}
				</span>
			</div>
			<div className="flex gap-2 items-center">
				<h6 className="leading-[2] m-0">BUSINESS ID:</h6>{' '}
				<span className="text-sm">
					{NovaAccount.business_id ? NovaAccount.business_id : 'None'}
				</span>
			</div>
			<div className="flex gap-2 items-center">
				<h6 className="leading-[2] m-0">MATERIAL:</h6>{' '}
				<span className="text-sm">
					{NovaAccount.material ? NovaAccount.material : 'None'}
				</span>
			</div>
			<div className="flex gap-2 items-center mb-8 pb-8 border-b-nova-light border-b">
				<h6 className="leading-[2] m-0">PRODUCT:</h6>{' '}
				<span className="text-sm">
					{NovaAccount.product_name
						? decodeHTML(NovaAccount.product_name)
						: 'None'}
				</span>
			</div>
			{signage.map((item) => (
				<PricesView id={item.id} item={item}></PricesView>
			))}

			{NovaAccount.note && (
				<div className="block mb-4">
					<h5>Note:</h5>
					<div
						className="block text-sm"
						dangerouslySetInnerHTML={{ __html: NovaAccount.note }}
					></div>
				</div>
			)}

			<div className="flex justify-between gap-4">
				<h4>ESTIMATED TOTAL:</h4>{' '}
				<h4>
					{currency}${parseFloat(NovaAccount.final_price).toLocaleString()}
				</h4>
			</div>
		</div>
	);
}
