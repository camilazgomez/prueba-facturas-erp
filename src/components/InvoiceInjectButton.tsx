type InjectButtonProps = {
  disabled: boolean;
  invoiceIds: string[];
  onSuccess?: () => void;
};

export default function InjectButton({ disabled }: InjectButtonProps) {
  return (
    <button
      className="bg-blue-950 hover:bg-blue-900 text-white font-medium
                 px-8 py-2 rounded-md text-sm
                 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
      disabled={disabled}
    >
      Inyectar
    </button>
  );
}
