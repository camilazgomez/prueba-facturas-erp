import type { Invoice } from "../types/invoice";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  invoices:  Invoice[];
  selected:  Set<string>;
  onToggle: (id: string) => void;
};


export default function InvoiceTable({ invoices, selected, onToggle }: Props) {
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
                    <input
                        type="checkbox"
                        disabled={invoice.injected}
                        checked={selected.has(invoice.id)}
                        onChange={() => onToggle(invoice.id)}
                        className="accent-blue-950 bg-white border-gray-300 rounded"
                        />
                </td>
                <td className="px-4 py-3 text-left">{invoice.receiverName}</td>
                <td className="px-4 py-3 text-right">
                    ${invoice.amount.toLocaleString("es-CL")}
                </td>
                <td className="px-4 py-3 text-left">{invoice.currency}</td>
                <td className="px-4 py-3 flex justify-center items-center">
                    {invoice.injected ? (
                        <span className="p-1 rounded bg-green-50">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        </span>
                    ) : (
                        <span className="p-1 rounded bg-red-50">
                        <XCircleIcon className="w-4 h-4 text-red-500" />
                        </span>
                    )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
