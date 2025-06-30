import { useState } from "react";

import InjectButton from "../components/InvoiceInjectButton";
import InvoiceTable from "../components/InvoiceTable";
import InvoicePagination from "../components/InvoicePagination";
import { useInvoices } from "../hooks/useInvoices";


export default function InvoicesPage() {
    const [page, setPage] = useState(1);
    const { invoices, loading, error } = useInvoices();


    const perPage = 10; 
    const totalPages = Math.ceil(invoices.length / perPage);
    const paginated = invoices.slice(
        (page - 1) * perPage,
        page * perPage
    );

    if (loading) return <p className="text-center">Cargando…</p>;
    if (error)   return <p className="text-center text-red-600">{error}</p>;

    return (
        <section className="bg-white w-full h-full p-6">
        <div className="flex justify-end pt-2 pb-4">
            <InjectButton disabled />
        </div>

        <InvoiceTable invoices={paginated}/>
        <InvoicePagination  currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}/>
        </section>
    );
}

