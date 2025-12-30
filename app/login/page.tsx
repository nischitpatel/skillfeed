import Link from "next/link";
import AuthCard from "../components/AuthCard";
import AuthButton from "../components/AuthButton";
import AuthInput from "../components/AuthInput";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <AuthCard
        title="Welcome back"
        subtitle="Log in to continue learning"
      >
        <form className="space-y-4">
          <AuthInput
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
          />

          <AuthButton text="Log in" />
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </AuthCard>
    </main>
  );
}
