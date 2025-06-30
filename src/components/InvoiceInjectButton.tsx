import { useState } from "react";
import { injectInvoices } from "../services/api";

type InjectButtonProps = {
  disabled: boolean;
  invoiceIds: string[];
  onSuccess?: () => void;
};

export default function InjectButton({ disabled, invoiceIds, onSuccess }: InjectButtonProps) {
 const [loading, setLoading] = useState(false);

 const handleClick = async () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
        await injectInvoices(invoiceIds);
        if (onSuccess) onSuccess();
        alert("Todas las facturas fueron inyectadas");
    } catch (err: unknown) {
        const message =
        err instanceof Error ? err.message : "Ocurrió un error inesperado";
        alert(`Falló inyección: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-950 hover:bg-blue-900 text-white font-medium
                 px-8 py-2 rounded-md text-sm
                 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
      disabled={disabled || loading}
    >
      Inyectar
    </button>
  );
}
