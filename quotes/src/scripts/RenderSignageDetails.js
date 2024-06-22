import { allAttributes } from './utils/allAttributes';

export const RenderSignageDetails = ({
	item,
	classContainer,
	classLabel,
	classValue,
}) => {
	return allAttributes(item).map((signage, index) => {
		if (!signage.key) return null;

		if (signage.isLink) {
			return (
				<div className={classContainer} key={`${signage.label}-${index}`}>
					<div className={classLabel}>{signage.label}</div>
					<div className={`${classValue} break-words`}>
						<a href={item.fontFileUrl} target="_blank">
							{item.fontFileName}
						</a>
					</div>
				</div>
			);
		}

		if (signage.isVinyl) {
			return (
				<div className={classContainer} key={`${signage.label}-${index}`}>
					<div className={classLabel}>{signage.label}</div>
					<div className="text-left text-sm">
						{item.vinylWhite?.name} - [{item.vinylWhite?.code}]
					</div>
				</div>
			);
		}

		if (signage.label === 'PRODUCT LINE') {
			return (
				<div className={classContainer} key={`${signage.label}-${index}`}>
					<div className={classLabel}>{signage.label}</div>
					<div
						className={classValue}
						dangerouslySetInnerHTML={{ __html: signage.key }}
					/>
				</div>
			);
		}

		if (signage.label === 'COMMENTS') {
			return (
				<div
					className="grid grid-cols-1 gap-0 py-[2px] mb-1"
					key={`${signage.label}-${index}`}
				>
					<div className={classLabel}>{signage.label}</div>
					<div className="text-left text-sm">{signage.key}</div>
				</div>
			);
		}

		if (signage.isFile) {
			return (
				<div className={classContainer} key={`${signage.label}-${index}`}>
					<div className={classLabel}>{signage.label}</div>
					<div className={classValue}>{signage.key}</div>
				</div>
			);
		}

		if (signage.isFiles) {
			return (
				<div className={classContainer} key={`${signage.label}-${index}`}>
					<div className={classLabel}>{signage.label}</div>
					<div className={classValue}>
						{item.fileUrls.map((fileUrl, fileIndex) => (
							<span key={fileUrl}>
								<a href={fileUrl} target="_blank">
									{item.fileNames[fileIndex]}
								</a>
								{fileIndex < item.fileUrls?.length - 1 ? ', ' : ''}
							</span>
						))}
					</div>
				</div>
			);
		}

		return (
			<div className={classContainer} key={`${signage.label}-${index}`}>
				<div className={classLabel}>{signage.label}</div>
				<div className={classValue}>
					{signage.key}
					{`${
						signage.label === 'LETTER HEIGHT' ||
						signage.label === 'LOGO HEIGHT' ||
						signage.label === 'LOGO WIDTH'
							? '"'
							: ''
					}`}
				</div>
			</div>
		);
	});
};
