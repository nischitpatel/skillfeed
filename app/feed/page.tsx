import SidebarSkills from "../components/SidebarSkills";
import FeedPost from "../components/FeedPost";

const mockPosts = [
  {
    id: "1",
    username: "Nischit Patel",
    skill: "JavaScript",
    content: `Array.map() returns a new array — it does NOT modify the original one.

\`\`\`js
const nums = [1,2,3]
const doubled = nums.map(n => n * 2)
\`\`\`
`,
    createdAt: "2h ago",
  },
  {
    id: "2",
    username: "Nischit Patel",
    skill: "JavaScript",
    content: `Array.map() returns a new array — it does NOT modify the original one.

\`\`\`js
const nums = [1,2,3]
const doubled = nums.map(n => n * 2)
\`\`\`
`,
    createdAt: "2h ago",
  },
  {
    id: "3",
    username: "Nischit Patel",
    skill: "JavaScript",
    content: `Array.map() returns a new array — it does NOT modify the original one.

\`\`\`js
const nums = [1,2,3]
const doubled = nums.map(n => n * 2)
\`\`\`
`,
    createdAt: "2h ago",
  },
  {
    id: "4",
    username: "Nischit Patel",
    skill: "JavaScript",
    content: `Array.map() returns a new array — it does NOT modify the original one.

\`\`\`js
const nums = [1,2,3]
const doubled = nums.map(n => n * 2)
\`\`\`
`,
    createdAt: "2h ago",
  },
  {
    id: "5",
    username: "Nischit Patel",
    skill: "JavaScript",
    content: `Array.map() returns a new array — it does NOT modify the original one.

\`\`\`js
const nums = [1,2,3]
const doubled = nums.map(n => n * 2)
\`\`\`
`,
    createdAt: "2h ago",
  },
  {
    id: "6",
    username: "Nischit Patel",
    skill: "JavaScript",
    content: `Array.map() returns a new array — it does NOT modify the original one.

\`\`\`js
const nums = [1,2,3]
const doubled = nums.map(n => n * 2)
\`\`\`
`,
    createdAt: "2h ago",
  },
];

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 px-4 py-6">
        
        {/* Skills Sidebar */}
        <aside className="col-span-3 hidden md:block">
          <SidebarSkills />
        </aside>

        {/* Feed */}
        <main className="col-span-12 md:col-span-6 space-y-4">
          {mockPosts.map(post => (
            <FeedPost key={post.id} post={post} />
          ))}
        </main>

        {/* Right Sidebar (placeholder) */}
        <aside className="col-span-3 hidden md:block">
          <div className="bg-white rounded-xl p-4 shadow-sm text-sm text-gray-600">
            Learning streak coming soon 🔥
          </div>
        </aside>

      </div>
    </div>
  );
}
