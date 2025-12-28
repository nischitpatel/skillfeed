import Link from "next/link";

type Props = {
  selectedSkill?: string;
}

const skills = [
  "JavaScript",
  "Next.js",
  "Python",
  "UI/UX",
  "AI Basics",
];

export default function SidebarSkills({ selectedSkill }: Props) {
  return (
    <div className="frosted-card rounded-xl p-4 shadow-sm space-y-3">
      <h3 className="font-semibold text-gray-900">Skills</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <Link
            href="/feed"
            className={!selectedSkill ? "text-[rgb(var(--primary))] font-medium" : "text-app"}
          >
            All
          </Link>
        </li>
        {skills.map(skill => (
          <li
            key={skill}
            // className="cursor-pointer text-gray-600 hover:text-blue-600"
          >
            <Link
              href={`/feed?skill=${encodeURIComponent(skill)}`}
              className={
                selectedSkill === skill
                  ? "text-[rgb(var(--primary))] font-medium"
                  : "text-app hover:text-[rgb(var(--primary))]"
              }
            >
              {skill}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
