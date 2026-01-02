"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
      <div className="flex items-center justify-around py-2">
        <Link
          href="/feed"
          className={`flex flex-col items-center text-xs ${
            isActive("/feed") ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <Home size={22} />
          Feed
        </Link>

        <Link
          href="/create"
          className={`flex flex-col items-center text-xs ${
            isActive("/create") ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <PlusCircle size={22} />
          Create
        </Link>

        <Link
          href="/profile/user"
          className={`flex flex-col items-center text-xs ${
            isActive("/profile") ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <User size={22} />
          Profile
        </Link>
      </div>
    </nav>
  );
}
