import Link from "next/link";
import AuthCard from "../components/AuthCard";
import AuthButton from "../components/AuthButton";
import AuthInput from "../components/AuthInput";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <AuthCard
        title="Create your account"
        subtitle="Start building your learning streak"
      >
        <form className="space-y-4">
          <AuthInput
            label="Name"
            placeholder="Your name"
          />
          <AuthInput
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="Minimum 6 characters"
          />

          <AuthButton text="Sign up" />
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </AuthCard>
    </main>
  );
}
