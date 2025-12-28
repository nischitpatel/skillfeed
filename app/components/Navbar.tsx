import Link from "next/link";

export default function Navbar() {
  return (
     <nav className="navbar-frosted w-full fixed px-6 py-3 z-50"> 

      <div className="flex justify-center gap-6 text-sm font-medium text-white">
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
      </div>
    </nav>
  );
}
