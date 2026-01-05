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
