"use client";

import Link from "next/link";
import AuthCard from "../components/AuthCard";
import AuthButton from "../components/AuthButton";
import AuthInput from "../components/AuthInput";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setEroor] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEroor("");
    
    try {
      await signup(name, email, password);
      router.push("/feed");
    } catch(err: any) {
      setEroor(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <AuthCard
        title="Create your account"
        subtitle="Start building your learning streak"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <AuthInput
            label="Name"
            placeholder="Your name"
            onChange={e => setName(e.target.value)}
          />
          <AuthInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="Minimum 6 characters"
            onChange={e => setPassword(e.target.value)}
          />

          { error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

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
