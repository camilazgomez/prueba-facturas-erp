import type { Invoice } from "../types/invoice";
import { retry } from "../utils/retry";

const BASE_URL = "https://recruiting.data.bemmbo.com";
const AUTH_HEADER = {
  Authorization: `${import.meta.env.VITE_AUTH_TOKEN}`,
};
const BATCH_SIZE = 25

// Obtención invoice
export async function getInvoices(): Promise<Invoice[]> {
  const res = await fetch(`${BASE_URL}/invoices`, {
    headers: {
      ...AUTH_HEADER,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error al obtener facturas");
  }
  const data: Invoice[] = await res.json();
  return data;
}

// Inyección Invoice
export async function injectInvoices(ids: string[]): Promise<void> {
  const maxLenght = ids.length

  for (let i = 0; i < maxLenght; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    await retry(async () => {
      const res = await fetch(`${BASE_URL}/invoices/inject`, {
        method: "POST",
        headers: AUTH_HEADER,
        body: JSON.stringify({ invoiceIds: batch }),
      });
      if (!res.ok) {
        if (res.status === 500) throw new Error("Error en ERP");
        const msg = await res.text();
        throw new Error(`Error ${res.status}: ${msg}`);
      }
    });
  }
}

