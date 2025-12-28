import { Stat } from "./Stat";

type ProfileHeaderProps = {
    name: string;
    bio?: string;
    totalPosts: number;
    skillsTaught: number;
  };
  
  export default function ProfileHeader({
    name,
    bio,
    totalPosts,
    skillsTaught,
  }: ProfileHeaderProps) {
    return (
      <section className="w-full rounded-xl bg-none shadow-sm p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          
          {/* LEFT: Name + Bio */}
          <div className="max-w-xl">
            <h1 className="text-7xl font-semibold text-[rgb(var(--foreground))]">
              {name}
            </h1>
  
            {bio && (
              <p className="mt-2 text-md text-gray-600 leading-relaxed">
                {bio}
              </p>
            )}
          </div>
  
          {/* RIGHT: Stats */}
          <div className="flex gap-6">
            <Stat label="Posts" value={totalPosts} />
            <Stat label="Skills Taught" value={skillsTaught} />
          </div>
        </div>
      </section>
    );
  }
  