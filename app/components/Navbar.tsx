"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="navbar-frosted fixed top-1 left-1/2 -translate-x-1/2 px-6 py-3 z-50">

      <div className="flex justify-center gap-6 text-sm font-bold text-white">
        <Link href="/" className="frosted-hover">
          Home
        </Link>
        <Link href="/feed" className="frosted-hover">
          Feed
        </Link>
        <Link href="/explore" className="frosted-hover">
          Explore
        </Link>
        <Link href="/create" className="frosted-hover">
          Create
        </Link>
        <Link href="/login" className="frosted-hover">
          Login/Sign Up
        </Link>
        <button
          onClick={logout}
          className="frosted-hover"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
