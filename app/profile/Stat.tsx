type StatProps = {
    label: string;
    value: number;
  };
  
  export function Stat({ label, value }: StatProps) {
    return (
      <div className="text-center min-w-[90px]">
        <div className="text-7xl font-semibold text-[rgb(var(--foreground))]">
          {value}
        </div>
        <div className="text-sm uppercase tracking-wide text-gray-500">
          {label}
        </div>
      </div>
    );
  }
  