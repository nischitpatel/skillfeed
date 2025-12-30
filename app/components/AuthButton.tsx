export default function AuthButton({ text }: { text: string }) {
    return (
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
      >
        {text}
      </button>
    );
  }
  