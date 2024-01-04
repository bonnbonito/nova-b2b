export default function Dropdown({
	title,
	onChange,
	options,
	value,
	style,
	onBlur,
}) {
	return (
		<div className="px-[1px]">
			<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
				{title}
			</label>
			<select
				style={style}
				className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]"
				onChange={onChange}
				onBlur={onBlur}
				value={value || ''}
			>
				{options}
			</select>
		</div>
	);
}
