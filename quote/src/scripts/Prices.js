import React from 'react';

export default function Sidebar({ item }) {
	return (
		<div className="block">
			<div className="flex justify-between py-2 font-title uppercase">
				{item.title} <span>$100.00 USD</span>
			</div>
			<table>
				<tr>
					<td className="text-left text-xs font-title">THICKNESS</td>
					<td className="text-left text-[10px] uppercase">Test</td>
				</tr>
				<tr>
					<td className="text-left text-xs font-title">THICKNESS</td>
					<td className="text-left text-[10px] uppercase">Test</td>
				</tr>
				<tr>
					<td className="text-left text-xs font-title">THICKNESS</td>
					<td className="text-left text-[10px] uppercase">Test</td>
				</tr>
				<tr>
					<td className="text-left text-xs font-title">THICKNESS</td>
					<td className="text-left text-[10px] uppercase">Test</td>
				</tr>
				<tr>
					<td className="text-left text-xs font-title">COMMENTS</td>
					<td className="text-left text-[10px]">{item.comments}</td>
				</tr>

				{item.type === 'letters' ? (
					<tr>
						<td className="text-left text-xs font-title">LETTERS</td>
						<td className="text-left text-[10px]">{item.letters}</td>
					</tr>
				) : (
					''
				)}
			</table>
		</div>
	);
}
