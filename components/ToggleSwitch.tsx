interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
          ${checked ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white
            transition-transform duration-200 ease-in-out
            ${checked ? "translate-x-5" : "translate-x-1"}
          `}
        />
      </button>
      {label && (
        <label
          className={`text-sm font-medium ${
            disabled
              ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
