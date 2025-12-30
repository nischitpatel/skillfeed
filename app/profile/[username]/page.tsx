// import ProfileHeader from "../ProfileHeader";

// export default function ProfilePage() {
//   // TEMP mock data (later from feed)
//   const posts = [
//     { skill: "JavaScript" },
//     { skill: "Next.js" },
//     { skill: "JavaScript" },
//   ];

//   const totalPosts = posts.length;
//   const skillsTaught = new Set(posts.map(p => p.skill)).size;

//   return (
//     <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
//       <ProfileHeader
//         name="Nischit Patel"
//         bio="Backend-focused full-stack engineer sharing practical coding lessons."
//         totalPosts={totalPosts}
//         skillsTaught={skillsTaught}
//       />

//       {/* Tabs will go here next */}
      
//     </main>
//   );
// }
// import ProfileHeader from "@/components/ProfileHeader";
// import ProfileTabs from "@/components/ProfileTabs";
import ProfileHeader from "../ProfileHeader";
import ProfileTabs from "../ProfileTabs";

export default async function ProfilePage() {
  // TEMP data (replace with feed API)
  const posts = [
    {
      id: "1",
      skill: "JavaScript",
      content: "Array.map returns a new array.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      skill: "Next.js",
      content: "Server Components reduce JS bundle size.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      skill: "JavaScript",
      content: "Closures allow function state.",
      createdAt: new Date().toISOString(),
    },
  ];

  const totalPosts = posts.length;
  const skillsTaught = new Set(posts.map(p => p.skill)).size;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <ProfileHeader
        name="Nischit Patel"
        bio="Backend-focused full-stack engineer sharing practical coding lessons."
        totalPosts={totalPosts}
        skillsTaught={skillsTaught}
      />

      <ProfileTabs posts={posts} />
    </main>
  );
}
