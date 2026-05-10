import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-6">
      <Link href="/">Home</Link>
      <Link href="/events">Events</Link>
      <Link href="/book-table">Book Table</Link>
      <Link href="/contact">Contact Us</Link>
    </nav>
  );
}