interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  characterCount?: number;
  maxCharacters?: number;
  error?: string;
}

export function TextArea({
  label,
  characterCount,
  maxCharacters,
  error,
  className = "",
  ...props
}: TextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={`
          input-base
          resize-none
          min-h-[280px]
          text-base
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>
          {characterCount !== undefined && `${characterCount} belgi`}
        </span>
        {maxCharacters && (
          <span>
            Max: {maxCharacters}
            {characterCount !== undefined &&
              ` (${Math.max(0, maxCharacters - characterCount)} qoldi)`}
          </span>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
}
