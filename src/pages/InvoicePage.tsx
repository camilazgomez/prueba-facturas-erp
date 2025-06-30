import { useState } from "react";

import InjectButton from "../components/InvoiceInjectButton";
import InvoiceTable from "../components/InvoiceTable";
import InvoicePagination from "../components/InvoicePagination";

export default function InvoicesPage() {
  return (
    <section className="bg-white w-full h-full p-6">
      <div className="flex justify-end pt-2 pb-4">
        <InjectButton disabled />
      </div>

      <InvoiceTable />
      <InvoicePagination />
    </section>
  );
}

