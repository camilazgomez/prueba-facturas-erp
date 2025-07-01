import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { injectInvoices } from "../services/api";

type Props = {
  invoices: {
    id: string;
    receiverName: string;
    amount: number;
    currency: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (ids: string[]) => void;
  onRemove?: (id: string) => void;
};

export default function ConfirmInjectModal({
  invoices,
  isOpen,
  onClose,
  onConfirm,
  onRemove,
}: Props) {

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
        const ids = invoices.map((i) => i.id);
        await injectInvoices(ids);
        setDone(true);
        setLoading(false);
        setTimeout(() => {
        onConfirm(ids); 
        onClose();      
        setDone(false);  
        }, 800);
    } catch (err) {
        alert(
        "Falló inyección: " +
            (err instanceof Error ? err.message : String(err))
        );
        setLoading(false);
    }
    };


  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl max-h-[80vh]  bg-white text-black p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <DialogTitle className="text-lg font-bold">
                Inyección de facturas
              </DialogTitle>
              <Description className="text-sm text-gray-600">
                Revisa las facturas que se van a inyectar y confirma la operación.
              </Description>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

        <div className="overflow-x-auto rounded-md ">
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
          <div className="mt-6 flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-sm font-semibold"
            >
              Cancelar
            </button>
            <button
            onClick={handleConfirm}
            disabled={loading || done}
            className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2
                ${
                done
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-950 hover:bg-blue-900 disabled:bg-blue-300"
                } text-white`}
            >
            {loading && (
                <>
                <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    />
                    <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
                <span>Esperando…</span>
                </>
            )}
            {done && (
                <>
                <CheckCircleIcon className="h-4 w-4 text-white" />
                <span>Inyectado</span>
                </>
            )}
            {!loading && !done && <span>Confirmar</span>}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
