import type { Invoice } from "../types/invoice";

const BASE_URL = "https://recruiting.data.bemmbo.com";
const AUTH_HEADER = {
  Authorization: `${import.meta.env.VITE_AUTH_TOKEN}`,
};

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

