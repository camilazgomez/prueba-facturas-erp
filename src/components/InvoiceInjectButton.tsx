type InjectButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export default function InjectButton({ disabled, onClick}: InjectButtonProps) {

  return (
    <button
      onClick={onClick}
      className="bg-blue-950 hover:bg-blue-900 text-white font-medium
                 px-8 py-2 rounded-md text-sm
                 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
      disabled={disabled}
    >
      Inyectar
    </button>
  );
}
