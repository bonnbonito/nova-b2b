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

		if (signage.isFile) {
			return (
				<div className={classContainer} key={`${signage.label}-${index}`}>
					<div className={classLabel}>{signage.label}</div>
					<div className={classValue}>
						<a href={item.fileUrl} target="_blank">
							{item.fileName}
						</a>
					</div>
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
