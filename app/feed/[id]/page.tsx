// import FeedPost from "@/components/FeedPost";
import Link from "next/link";
import FeedPost from "@/app/components/FeedPost";
import PostQABot from "@/app/components/PostQABot";

// TEMP: replace with API/db later
async function getPostById(id: string) {
  const res = await fetch("http://localhost:3000/feed.json", {
    cache: "no-store",
  });

  const posts = await res.json();
//   console.log(posts);
  return posts.feed.find((p: any) => p.id === id);
}

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
    const param = await params;
  const post = await getPostById(param.id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <p className="text-gray-500">Post not found.</p>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Back link */}
      <Link
        href="/feed"
        className="text-sm text-gray-500 hover:text-gray-800"
      >
        ← Back to feed
      </Link>

      {/* Post */}
      <FeedPost post={post} variant="detail" />

      {/* Context */}
      <div className="pt-6 border-t text-sm text-gray-600">
        More posts from{" "}
        <Link
          href={`/feed?skill=${post.skill}`}
          className="text-[rgb(var(--primary))] font-medium"
        >
          #{post.skill}
        </Link>
      </div>

      {/* QA Bot */}
      <PostQABot postContent={post.content}/>
    </main>
  );
}
