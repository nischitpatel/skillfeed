import SidebarSkills from "../components/SidebarSkills";
import FeedPost from "../components/FeedPost";

type Props = {
  searchParams : {
    skill?: string;
  };
};

async function getFeed() {
  // In Next.js, files in /public are served at the root URL
  const res = await fetch('http://localhost:3000/feed.json');
  if (!res.ok) throw new Error('Failed to fetch feed');
  return res.json();
}

export default async function FeedPage({ searchParams }: Props) {

  const props = await searchParams;
  const selectedSkill = props.skill;


  const data = await getFeed();
  const mockPosts = selectedSkill ? data.feed.filter(post => post.skill === selectedSkill) : data.feed;

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 px-4 py-6">
        
        {/* Skills Sidebar */}
        <aside className="col-span-3 hidden md:block">
          <SidebarSkills selectedSkill={selectedSkill}/>
        </aside>

        {/* Feed */}
        <main className="col-span-12 md:col-span-6 space-y-4">
          {mockPosts?.map(post => (
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
