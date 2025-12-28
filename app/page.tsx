import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-8">
        {/* Headline */}
        <h1 className="text-5xl font-bold text-foreground">
          {`{Learn one skill at a time}`} 
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground">
          SkillFeed is a focused learning feed where each post teaches exactly
          one thing - no noise, no distractions
        </p>

        {/* Value points */}
        <ul className="text-muted-foreground space-y-2">
          <li>• Skill-based learning, not follower-based</li>
          <li>• Micro-learning posts you can read in seconds</li>
          <li>• Learn by sharing what you know</li>
        </ul>

        {/* CTAs */}
        <div className="flex justify-center gap-4">
          <Link
            href="/feed"
            className="px-6 py-3 rounded-md bg-blue-400 text-white font-medium"
          >
            Explore Feed
          </Link>

          <Link
            href="/create"
            className="px-6 py-3 rounded-md border border-border text-foreground"
          >
            Create Post
          </Link>
        </div>
      </div>
    </main>
  );
}
