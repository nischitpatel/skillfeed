// import ProfileHeader from "../../components/ProfileHeader";
// import ProfileTabs from "../../components/ProfileTabs";

// export default async function ProfilePage() {
//   // TEMP data (replace with feed API)
//   const posts = [
//     {
//       id: "1",
//       username: "nischitp",
//       skill: "JavaScript",
//       content: "Array.map returns a new array.",
//       createdAt: new Date().toISOString(),
//       author: {
//         id: "admin1234",
//         name: "admin1234"
//       }
//     },
//     {
//       id: "2",
//       username: "nischitp",
//       skill: "Next.js",
//       content: "Server Components reduce JS bundle size.",
//       createdAt: new Date().toISOString(),
//       author: {
//         id: "admin1234",
//         name: "admin1234"
//       }
//     },
//     {
//       id: "3",
//       username: "nischitp",
//       skill: "JavaScript",
//       content: "Closures allow function state.",
//       createdAt: new Date().toISOString(),
//       author: {
//         id: "admin1234",
//         name: "admin1234"
//       }
//     },
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

//       <ProfileTabs posts={posts} />
//     </main>
//   );
// }

import ProfileHeader from "../../components/ProfileHeader";
import ProfileTabs from "../../components/ProfileTabs";

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

async function getProfile(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/profile?userId=${userId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to load profile");
  }

  return res.json();
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;
  const data = await getProfile(userId);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <ProfileHeader
        name={data.user.name}
        bio="Backend-focused full-stack engineer sharing practical coding lessons."
        totalPosts={data.totalPosts}
        skillsTaught={data.skillsTaught}
      />

      <ProfileTabs posts={data.posts} />
    </main>
  );
}
