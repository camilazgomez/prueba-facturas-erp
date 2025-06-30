import { useEffect, useState } from "react";
import { getInvoices } from "../services/api"; 
import type { Invoice } from "../types/invoice";

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

  return { invoices, loading, error };
}
