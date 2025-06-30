import { useState } from "react";

import InjectButton from "../components/InvoiceInjectButton";
import InvoiceTable from "../components/InvoiceTable";
import InvoicePagination from "../components/InvoicePagination";
import { useInvoices } from "../hooks/useInvoices";


export default function InvoicesPage() {
    const [page, setPage] = useState(1);
    const [selected, setSelected]   = useState<Set<string>>(new Set());

    const { invoices, loading, error } = useInvoices();
    const selectableNotInjected = invoices.filter(
    (inv) => !inv.injected && selected.has(inv.id)
    );
    const canInject = selectableNotInjected.length > 0;


    const perPage = 10; 
    const totalPages = Math.ceil(invoices.length / perPage);
    const paginated = invoices.slice(
        (page - 1) * perPage,
        page * perPage
    );

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
        <div className="flex justify-end pt-2 pb-4">
            <InjectButton
            disabled={!canInject}             
            invoiceIds={selectableNotInjected.map((i) => i.id)}
            />
        </div>

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

