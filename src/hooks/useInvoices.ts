import { useEffect, useState } from "react";
import { getInvoices } from "../services/api"; 
import type { Invoice } from "../types/invoice";

// Hook que trae las facturas al cargar la página.
// Devuelve { invoices, setInvoices, loading, error }.

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    getInvoices()
      .then((data) => setInvoices(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { invoices, setInvoices, loading, error };
}
