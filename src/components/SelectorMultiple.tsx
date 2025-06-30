import { useState } from "react";

type Option<T extends string> = { label: string; value: T };

type Props<T extends string> = {
  options: Option<T>[];
  selected: T[];
  placeholder?: string;
  label: string;
  onChange: (next: T[]) => void;
};

export default function MultiSelect<T extends string>({
  options,
  selected,
  placeholder = "Selecciona...",
  label,
  onChange,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const toggle = (val: T) => {
    onChange(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val]
    );
  };

  return (
    <div className="relative w-60">
      <label className="text-sm font-bold text-gray-700 mb-1 block">
        {label}
      </label>

      <div
        onClick={() => setOpen(!open)}
        className="border border-gray-300 rounded-lg px-3 py-2
                    text-sm text-gray-700 min-h-[40px] cursor-pointer
                    flex flex-wrap gap-1 items-center"
        >
        {selected.length === 0 && (
            <span className="text-gray-500">{placeholder}</span>
        )}

        {selected.map((val) => (
            <span
            key={val}
            className="flex items-center gap-1 bg-white text-gray-800 font-bold
             text-xs px-2 py-1 rounded-full"
            >
            {options.find((o) => o.value === val)?.label || val}
            <button
                onClick={(e) => {
                e.stopPropagation();
                toggle(val);
                }}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                ✕
            </button>
            </span>
        ))}

        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-gray-500 ml-auto"
        >
            <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
            />
        </svg>
        </div>

      {open && (
        <div
          className="absolute z-10 mt-1 max-h-52 overflow-auto
                     w-full bg-white border border-gray-200 rounded-lg shadow"
        >
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800
             hover:bg-gray-100 cursor-pointer text-xs"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggle(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
