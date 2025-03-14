import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/ToolTip';

export default function NumberInput({ title, onChange, options, value, style, onlyValue, info }) {
  const selectClass = value || onlyValue ? 'text-black' : 'text-[#dddddd]';
  return (
    <div className="px-[1px] text-ellipsis overflow-hidden">
      <label
        className="uppercase font-title text-sm tracking-[1.4px] px-2 whitespace-nowrap"
        title={title}
      >
        {title && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-pointer">
                  {title}
                  {info && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="red"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </TooltipTrigger>
              {info && (
                <TooltipContent className="bg-white">
                  <span
                    className="font-body text-sm normal-case"
                    dangerouslySetInnerHTML={{ __html: info }}
                  />
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )}
      </label>
      <input
        type="number"
        min="1"
        className="w-full py-4 px-2 color-black border-gray-200 text-sm font-bold rounded-md h-[40px]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
