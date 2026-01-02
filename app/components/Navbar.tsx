"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling down
      if (currentScrollY > lastScrollY) {
        setShow(false);
      }

      // Hide navbar when near top
      if (currentScrollY < lastScrollY) {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (loading) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b bg-white transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          SkillFeed
        </Link>

        {/* Desktop nav */}
        {user && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/feed" className="text-sm hover:text-blue-600">
              Feed
            </Link>
            <Link href="/create" className="text-sm hover:text-blue-600">
              Create
            </Link>
            <Link href="/profile" className="text-sm hover:text-blue-600">
              Profile
            </Link>
          </nav>
        )}

        {/* Logout */}
        {user && (
          <button
            onClick={logout}
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        )}

        {!user && (
          <Link href="/login" className="text-sm hover:text-blue-600">
              Login / Sign up
            </Link>
        )}
      </div>
    </header>
  );
}


// export default function Navbar() {
//   const { logout } = useAuth();

//   return (
//     <nav className="navbar-frosted fixed top-1 left-1/2 -translate-x-1/2 px-6 py-3 z-50">

//       <div className="flex justify-center gap-6 text-sm font-bold text-white">
//         <Link href="/" className="frosted-hover">
//           Home
//         </Link>
//         <Link href="/feed" className="frosted-hover">
//           Feed
//         </Link>
//         <Link href="/explore" className="frosted-hover">
//           Explore
//         </Link>
//         <Link href="/create" className="frosted-hover">
//           Create
//         </Link>
//         <Link href="/login" className="frosted-hover">
//           Login/Sign Up
//         </Link>
//         <button
//           onClick={logout}
//           className="frosted-hover"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }
