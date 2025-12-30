import FeedPost from "../components/FeedPost";

type Post = {
  id: string;
  username: string;
  skill: string;
  content: string;
  createdAt: string;
};

type Props = {
  skills: string[];
  posts: Post[];
  selectedSkill: string | null;
  onSelect: (skill: string) => void;
};

export default function SkillSelector({
  skills,
  posts,
  selectedSkill,
  onSelect,
}: Props) {
  return (
    <div className="space-y-6">
      
      {/* Skill List */}
      <div className="flex flex-wrap gap-3">
        {skills.map(skill => {
          const active = selectedSkill === skill;

          return (
            <button
              key={skill}
              onClick={() => onSelect(skill)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  active
                    ? "bg-[rgb(var(--primary))] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {skill}
            </button>
          );
        })}
      </div>

      {/* Posts */}
      {selectedSkill && (
        <div className="space-y-4">
          {posts
            .filter(post => post.skill === selectedSkill)
            .map(post => (
              <FeedPost key={post.id} post={post} />
            ))}
        </div>
      )}

      {!selectedSkill && (
        <p className="text-sm text-gray-500">
          Select a skill to view posts.
        </p>
      )}
    </div>
  );
}
