import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function ProfileMePage() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

  const res = await fetch("http://localhost:3000/api/auth/me", {
    headers: {
      cookie: `auth_token=${authToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    redirect("/login");
  }

  const { user } = await res.json();

  redirect(`/profile/${user.id}`);
}
