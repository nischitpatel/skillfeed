type Props = {
  label: string;
};

export default function SkillTag({ label }: Props) {
  return (
    <span className="frosted-card text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
      {label}
    </span>
  );
}
