export default function AuthCard({
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm border">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
  
        <div className="mt-6">{children}</div>
      </div>
    );
  }
  