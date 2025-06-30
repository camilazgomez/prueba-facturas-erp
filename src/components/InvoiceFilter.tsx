import MultiSelect from "./SelectorMultiple";

export const STATUS_FILTERS = {
  ALL: "ALL",
  PENDING: "PENDING",
  INJECTED: "INJECTED",
} as const;

export const CURRENCY_FILTERS = {
  ALL: "ALL",
  CLP: "CLP",
  USD: "USD",
} as const;

export type StatusFilter = keyof typeof STATUS_FILTERS;
export type CurrencyFilter = keyof typeof CURRENCY_FILTERS;

type Filters = {
  search: string;
  currency: CurrencyFilter[]; 
  status: StatusFilter[];
};

type Props = Filters & {
  onChange: (next: Filters) => void;
  onClear: () => void;
};

export default function InvoiceFilters({
  search,
  currency,
  status,
  onChange,
  onClear,
}: Props) {
  const update = (patch: Partial<Filters>) =>
    onChange({ search, currency, status, ...patch });

  const inputStyles =
  "border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 w-52";

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-bold text-gray-700 mb-1">Nombre</label>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => update({ search: e.target.value })}
          className={`${inputStyles} placeholder-gray-500`}
        />
      </div>

      <MultiSelect
        label="Monedas"
        options={[
          { label: "CLP", value: CURRENCY_FILTERS.CLP },
          { label: "USD", value: CURRENCY_FILTERS.USD },
        ]}
        selected={currency}
        placeholder="Todas"
        onChange={(vals) => update({ currency: vals })}
      />

      <MultiSelect
        label="Estado de inyección"
        options={[
          { label: "Pendientes", value: STATUS_FILTERS.PENDING },
          { label: "Inyectadas", value: STATUS_FILTERS.INJECTED },
        ]}
        selected={status}
        placeholder="Todos"
        onChange={(vals) => update({ status: vals })}
      />

      <div className="flex flex-col">
        <label className="text-sm font-bold text-transparent mb-1">.</label>

        <button
            type="button"
            onClick={onClear}
            className="flex items-center justify-between gap-2
                    px-3 py-2 w-32
                    bg-gray-100 text-gray-800 font-medium text-sm
                    rounded-lg hover:bg-gray-200"
        >
            Limpiar
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
            </svg>
        </button>
        </div>

    </div>
  );
}
