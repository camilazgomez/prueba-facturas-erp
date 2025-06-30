import { useState } from "react";

import InjectButton from "../components/InvoiceInjectButton";
import InvoiceTable from "../components/InvoiceTable";
import InvoicePagination from "../components/InvoicePagination";
import { useInvoices } from "../hooks/useInvoices";
import InvoiceFilters from "../components/InvoiceFilter";
import {STATUS_FILTERS} from "../components/InvoiceFilter"
import type { CurrencyFilter,StatusFilter, } from "../components/InvoiceFilter";


export default function InvoicesPage() {
    const [page, setPage] = useState(1);
    const [selected, setSelected]   = useState<Set<string>>(new Set());
    const [filters, setFilters] = useState<{
        search: string;
        currency: CurrencyFilter[];   
        status: StatusFilter[];
        }>({
        search: "",
        currency: [],   
        status: [],    
        });

    const { invoices, setInvoices, loading, error } = useInvoices();
    const selectableNotInjected = invoices.filter(
    (inv) => !inv.injected && selected.has(inv.id)
    );
    const canInject = selectableNotInjected.length > 0;

    const filtered = invoices.filter((inv) => {
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

    const perPage = 10; 
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const toggleSelection = (id: string) => {
        setSelected(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
        next.delete(id);
        } else {
        next.add(id);
        }
        return next;
     });
    };

    if (loading) return <p className="text-center">Cargando…</p>;
    if (error)   return <p className="text-center text-red-600">{error}</p>;

    return (
        <section className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-4">
            <InvoiceFilters
                {...filters}
                onChange={(f) => {setFilters(f);setPage(1);}}
                onClear={() => {
                    setFilters({ search: "", currency: [], status: [] });
                    setPage(1);
                }}
                />
            <InjectButton
            disabled={!canInject}             
            invoiceIds={selectableNotInjected.map((i) => i.id)}
            onSuccess={() => {
            setInvoices(prev =>
            prev.map(inv =>
                selected.has(inv.id) ? { ...inv, injected: true } : inv
            )
            );
            setSelected(new Set());
        }}
            />
        </div>
        <p className="text-md font-semibold text-gray-700 mb-2">
            Mostrando {filtered.length}/{invoices.length} facturas
            </p>

        <InvoiceTable
            invoices={paginated}
            selected={selected}
            onToggle={toggleSelection}
        />
        <InvoicePagination  currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}/>
        </section>
    );
}

