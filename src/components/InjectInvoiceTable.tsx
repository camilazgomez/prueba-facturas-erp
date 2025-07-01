import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  invoices: {
    id: string;
    receiverName: string;
    amount: number;
    currency: string;
  }[];
  onRemove?: (id: string) => void;
};

export default function InjectInvoiceTable({ invoices, onRemove }: Props) {
  return (
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50 text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Emisor</th>
            <th className="px-4 py-3 text-right">Monto</th>
            <th className="px-4 py-3 text-left">Moneda</th>
            {onRemove && <th className="px-4 py-3 text-right">Acción</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-900 border-b border-gray-200">
          {invoices.map((inv) => (
            <tr key={inv.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-left">{inv.receiverName}</td>
              <td className="px-4 py-3 text-right">
                ${inv.amount.toLocaleString("es-CL")}
              </td>
              <td className="px-4 py-3 text-left">{inv.currency}</td>
              {onRemove && (
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onRemove(inv.id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
