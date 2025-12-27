import Link from "next/link";

export default function Navbar() {
  return (
     <nav className="navbar-frosted fixed top-1 left-1/2 -translate-x-1/2 px-6 py-3"> 

      <div className="flex gap-6 text-sm font-medium text-app">
        <Link href="/" className="frosted-hover">
          Home
        </Link>
        {/* <Link href="/auth/login" className="hover:underline">
          Login
        </Link>
        <Link href="/auth/signup" className="hover:underline">
          Signup
        </Link> */}
        <Link href="/feed" className="frosted-hover">
          Feed
        </Link>
        <Link href="/explore" className="frosted-hover">
          Explore
        </Link>
        <Link href="/create" className="frosted-hover">
          Create
        </Link>
      </div>
    </nav>
  );
}
