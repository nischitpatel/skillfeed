import MarkdownRenderer from "./MarkdownRenderer";
import SkillTag from "./SkillTag";
import Link from "next/link";

type Post = {
  id: string;
  // username: string;
  skill: string;
  content: string;
  type: string
  createdAt: string;
  author: {
    id: string;
    name: string;
  }
};

type Props = {
  post: Post;
  variant?: "feed" | "detail";
};

export default function FeedPost({ post, variant = "feed" }: Props) {
  const isDetail = variant === "detail";

  const Card = (
    <article className="frosted-card rounded-xl p-5 shadow-sm space-y-3">

      {/* Header */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <Link href={`/profile/${post.author?.id}`}><span className="font-medium text-gray-900">{post.author.name}</span></Link>
        <SkillTag label={post.skill} />
        <SkillTag label={post.type} />
        <span className="ml-auto text-xs">{post.createdAt}</span>
      </div>

      {/* Content */}
      <MarkdownRenderer content={post.content} />

      {/* Actions */}
      <div className="flex gap-6 pt-2 text-gray-500 text-sm">
        <button className="hover:text-red-500">❤️ Like</button>
        <button className="hover:text-blue-500">💬 Comment</button>
        <button className="hover:text-green-500">🔖 Bookmark</button>
        {!isDetail && (<Link href={`/feed/${post.id}`} className="hover:text-green-500">
          {/* <button className="hover:text-blue-500">Need help?</button> */}
          Need help?
        </Link>)}
      </div>

    </article>
  );

  // The post on the feed will be clickable
  // if (!isDetail) {
  //   return (
  //     <Link href={`/feed/${post.id}`} className="block">
  //       {Card}
  //     </Link>
  //   );
  // }

  return Card;
  // return (
  //   <article className="frosted-card rounded-xl p-5 shadow-sm space-y-3">

  //     {/* Header */}
  //     <div className="flex items-center gap-3 text-sm text-gray-600">
  //       <div className="w-8 h-8 rounded-full bg-gray-200" />
  //       <span className="font-medium text-gray-900">{post.username}</span>
  //       <SkillTag label={post.skill} />
  //       <span className="ml-auto text-xs">{post.createdAt}</span>
  //     </div>

  //     {/* Content */}
  //     <MarkdownRenderer content={post.content} />

  //     {/* Actions */}
  //     <div className="flex gap-6 pt-2 text-gray-500 text-sm">
  //       <button className="hover:text-red-500">❤️ Like</button>
  //       <button className="hover:text-blue-500">💬 Comment</button>
  //       <button className="hover:text-green-500">🔖 Bookmark</button>
  //     </div>
  //   </article>
  // );
}
