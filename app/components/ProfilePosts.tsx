import FeedPost from "./FeedPost";

type Post = {
  id: string;
  username: string;
  skill: string;
  content: string;
  createdAt: string;
};

type Props = {
  posts: Post[];
  // mode: "all" | "skill";
};

export default function ProfilePosts({ posts }: Props) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No posts yet.
      </p>
    );
  }

  // if (mode === "all") {
  //   return (
  //     <div className="space-y-4">
  //       {posts.map(post => (
  //         <FeedPost key={post.id} post={post} />
  //       ))}
  //     </div>
  //   );
  // }

  // GROUP BY SKILL
  // const grouped = posts.reduce<Record<string, Post[]>>((acc, post) => {
  //   acc[post.skill] = acc[post.skill] || [];
  //   acc[post.skill].push(post);
  //   return acc;
  // }, {});

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
    // <div className="space-y-8">
    //   {Object.entries(grouped).map(([skill, skillPosts]) => (
    //     <div key={skill}>
    //       {/* <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
    //         {skill}
    //       </h3> */}

    //       <div className="space-y-4">
    //         {skillPosts.map(post => (
    //           <FeedPost key={post.id} post={post} />
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
