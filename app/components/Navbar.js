import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link href="/" className="text-lg font-bold">
        Shorty
      </Link>
      <div>
        <Link href="/dashboard" className="px-4">
          Dashboard
        </Link>
        <Link href="/dashboard/urls" className="px-4">
          Manage URLs
        </Link>
        <Link href="/dashboard/stats" className="px-4">
          Stats
        </Link>
      </div>
    </nav>
  );
}
