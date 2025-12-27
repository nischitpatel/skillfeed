const skills = [
  "JavaScript",
  "Next.js",
  "Python",
  "UI/UX",
  "AI Basics",
];

export default function SidebarSkills() {
  return (
    <div className="frosted-card rounded-xl p-4 shadow-sm space-y-3">
      <h3 className="font-semibold text-gray-900">Skills</h3>
      <ul className="space-y-2 text-sm">
        {skills.map(skill => (
          <li
            key={skill}
            className="cursor-pointer text-gray-600 hover:text-blue-600"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
