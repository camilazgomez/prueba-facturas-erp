import { STATUS_FILTERS } from "../components/InvoiceFilter";
import type { Invoice } from "../types/invoice";
import type { CurrencyFilter, StatusFilter } from "../components/InvoiceFilter";

// función que efectua filtro de emisor, currency y estado
export function filterInvoices(
  invoices: Invoice[],
  filters: {
    search: string;
    currency: CurrencyFilter[];
    status: StatusFilter[];
  }
): Invoice[] {
  return invoices.filter((inv) => {
    const nameMatches =
      !filters.search ||
      inv.receiverName.toLowerCase().includes(filters.search.toLowerCase());

    const currencyMatches =
      filters.currency.length === 0 ||
      filters.currency.includes(inv.currency as CurrencyFilter);

    const statusMatches =
      filters.status.length === 0 ||
      (filters.status.includes(STATUS_FILTERS.PENDING) && !inv.injected) ||
      (filters.status.includes(STATUS_FILTERS.INJECTED) && inv.injected);

    return nameMatches && currencyMatches && statusMatches;
  });
}
