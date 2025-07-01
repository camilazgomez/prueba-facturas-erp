import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

// Genera las páginas visibles en la paginación.
// Siempre incluye la primera, la última, la actual y sus vecinas.
// Usa "..." para indicar saltos cuando hay muchas páginas.
function getVisiblePages(current: number, total: number): (number | "...")[] {
  const raw = new Set<number>();

  raw.add(1);
  raw.add(total);

  raw.add(current);
  if (current - 1 > 1) raw.add(current - 1);
  if (current + 1 < total) raw.add(current + 1);

  if (total <= 7) {
    for (let p = 2; p < total; p++) raw.add(p);
  }

  const sorted = Array.from(raw).sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i];
    if (i === 0) {
      result.push(page);
      continue;
    }
    const prev = sorted[i - 1];
    if (page === prev + 1) {
      result.push(page);            
    } else {
      result.push("...", page);     
    }
  }

  return result;
}

export default function InvoicePagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className="w-full flex justify-center mt-2">
      <ul className="flex items-center space-x-1 text-sm text-gray-700">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </li>

        {pages.map((p, idx) => {
        const key =
            p === "..."
            ? `ellipsis-${idx}` 
            : `page-${p}`; 

        return p === "..." ? (
            <li key={key} className="px-2 select-none text-gray-500">
            …
            </li>
        ) : (
            <li key={key}>
            <button
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 rounded hover:bg-gray-100 ${
                p === currentPage ? "bg-gray-200 font-medium text-gray-900" : ""
                }`}
            >
                {p}
            </button>
            </li>
        );
        })}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
