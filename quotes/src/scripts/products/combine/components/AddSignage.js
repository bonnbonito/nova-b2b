export const AddSignage = ({ addSignage, product, type, title, children }) => (
	<button
		className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer justify-between hover:bg-slate-600 font-title text-black hover:text-white"
		onClick={() => {
			addSignage({
				productLine: product.product.post_title,
				productId: product.product.ID,
				type,
				component: product.component,
				material: title,
				isLayered: false,
				hideQuantity: false,
			});
		}}
		style={{ border: '1px solid #d2d2d2d2' }}
	>
		{children}
	</button>
);
