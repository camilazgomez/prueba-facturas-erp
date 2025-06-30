import type { Invoice } from "../types/invoice";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

// Por mientras mockeado después remplazo con llamado api
export const MOCK_INVOICES: Invoice[] = [
  { id: '1', receiverName: 'Carlos Torres', amount: 283524, currency: 'USD', injected: false },
  { id: '2', receiverName: 'Lucía Mendoza', amount: 5524, currency: 'USD', injected: false },
  { id: '3', receiverName: 'Javier Salazar', amount: 2283, currency: 'USD', injected: false },
  { id: '4', receiverName: 'Ana López', amount: 83524, currency: 'USD', injected: false },
  { id: '5', receiverName: 'Diego Jiménez', amount: 2000000, currency: 'CLP', injected: true },
  { id: '6', receiverName: 'Sofía Cordero', amount: 200500, currency: 'USD', injected: false },
  { id: '7', receiverName: 'Fernando Ruiz', amount: 4000000, currency: 'CLP', injected: true },
  { id: '8', receiverName: 'Valentina Hernández', amount: 4000000, currency: 'CLP', injected: true },
  { id: '9', receiverName: 'Andrés Morales', amount: 14000000, currency: 'CLP', injected: true },
  { id: '10', receiverName: 'Claudia Aguirre', amount: 4400000, currency: 'CLP', injected: true },
  { id: '11', receiverName: 'Ricardo Castro', amount: 4400000, currency: 'CLP', injected: true },
  { id: '12', receiverName: 'Innovaciones S.A.', amount: 283524, currency: 'CLP', injected: true },
  
];


export default function InvoiceTable() {
    const [invoices] = useState<Invoice[]>(MOCK_INVOICES);
    return (
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50 text-sm font-semibold text-gray-700 border-b-0">
            <tr>
                <th className="px-4 py-3 text-left w-10"></th>
                <th className="px-4 py-3 text-left">Emisor</th>
                <th className="px-4 py-3 text-right">Monto</th>
                <th className="px-4 py-3 text-left">Moneda</th>
                <th className="px-4 py-3 text-center">Inyectado</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-900 border-b border-gray-200">
            {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                    <input type="checkbox" className="accent-blue-600 bg-white border-gray-300 rounded " />
                </td>
                <td className="px-4 py-3 text-left">{invoice.receiverName}</td>
                <td className="px-4 py-3 text-right">
                    {invoice.amount.toLocaleString("es-CL", {
                    style: "currency",
                    currency: invoice.currency,
                    })}
                </td>
                <td className="px-4 py-3 text-left">{invoice.currency}</td>
                <td className="px-4 py-3 flex justify-center items-center">
                    {invoice.injected ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
