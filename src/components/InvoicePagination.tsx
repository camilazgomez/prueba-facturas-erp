import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    const allPages: number[] = [];
    for (let i = 1; i <= total; i++) {
      allPages.push(i);
    }
    return allPages;
  }
  const result: (number | "...")[] = [];
  result.push(1);
  const showLeftDots = current > 3;
  
  if (showLeftDots) {
    result.push("...");
  }

  const firstMiddle = Math.max(2, current - 1);
  const lastMiddle  = Math.min(total - 1, current + 1);

  for (let p = firstMiddle; p <= lastMiddle; p++) {
    result.push(p);
  }

  const showRightDots = current < total - 2;
  if (showRightDots) {
    result.push("...");
  }

  result.push(total);

  return result;
}

export default function InvoicePagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className="w-full flex justify-center mt-6">
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

        {pages.map((p, idx) =>
          p === "..." ? (
            <li key={idx} className="px-2 select-none text-gray-500">
              ...
            </li>
          ) : (
            <li key={p}>
              <button
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 rounded hover:bg-gray-100 ${
                  p === currentPage ? "bg-gray-200 font-medium text-gray-900" : ""
                }`}
              >
                {p}
              </button>
            </li>
          )
        )}
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
