"use client";

import Link from "next/link";
import AuthCard from "../components/AuthCard";
import AuthButton from "../components/AuthButton";
import AuthInput from "../components/AuthInput";
import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try{
      await login(email, password);
      router.push("/feed");
    }catch(err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <AuthCard
        title="Welcome back"
        subtitle="Log in to continue learning"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <AuthInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={e => setPassword(e.target.value)}
          />

          { error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

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
