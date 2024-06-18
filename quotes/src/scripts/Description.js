export default function Description({
	title = 'COMMENTS',
	value,
	handleComments,
	placeholder = 'ADD COMMENTS',
}) {
	return (
		<div className="px-[1px] col-span-4">
			<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
				{title}
			</label>
			<textarea
				className="w-full py-4 px-2 border-gray-200 color-black text-sm rounded-md placeholder:text-slate-400"
				value={value}
				onChange={handleComments}
				placeholder={placeholder}
				rows={4}
			/>
		</div>
	);
}
