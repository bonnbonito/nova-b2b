export default function Dropdown({ title, onChange, options, value, style }) {
	const selectClass = value ? 'text-black' : 'text-[#dddddd]';

	return (
		<div className="px-[1px]">
			<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
				{title}
			</label>
			<select
				style={style}
				className={`border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] ${selectClass}`}
				onChange={onChange}
				value={value}
			>
				<option value="">CHOOSE OPTION</option>
				{options}
			</select>
		</div>
	);
}
