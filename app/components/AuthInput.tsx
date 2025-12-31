type Props = {
    label: string;
    type?: string;
    placeholder?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>;
  
  export default function AuthInput({
    label,
    type = "text",
    placeholder,
    ...props
  }: Props) {
    return (
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          {...props}
          className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
  