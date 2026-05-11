"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/book-table", label: "Book Table" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative border-b border-pink-500 bg-black">
      <div className="absolute left-0 top-0 h-8 w-16 bg-pink-500 [clip-path:polygon(0_0,100%_0,55%_100%,0_100%)]" />
      <div className="absolute bottom-0 right-0 h-8 w-16 bg-pink-500 [clip-path:polygon(45%_0,100%_0,100%_100%,0_100%)]" />

      <nav className="mx-auto flex h-28 max-w-7xl items-center justify-between px-6 md:h-24 md:px-8">
        <Link href="/" className="relative z-10 leading-none">
          <div className="text-3xl font-black uppercase tracking-[0.15em] md:text-4xl">
            Night<span className="text-pink-500">Club</span>
          </div>
          <div className="mt-3 text-[10px] uppercase tracking-[0.55em] text-white/80 md:text-xs md:tracking-[0.65em]">
            Have a good time
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-12 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-lg font-bold uppercase tracking-wider transition-colors hover:text-pink-500 ${
                  isActive ? "text-pink-500" : "text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-6 left-0 h-[2px] w-full bg-pink-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile burger - Popover API */}
        <button
          popoverTarget="mobile-menu"
          className="relative z-10 flex flex-col gap-2 md:hidden"
          aria-label="Open menu"
        >
          <span className="h-1 w-12 rounded bg-white" />
          <span className="h-1 w-12 rounded bg-white" />
          <span className="h-1 w-12 rounded bg-white" />
        </button>

        <div
          id="mobile-menu"
          popover="auto"
          className="m-0 ml-auto h-screen w-72 border-l border-pink-500 bg-black p-8 text-white backdrop:bg-black/70 md:hidden"
        >
          <div className="mb-10 text-2xl font-black uppercase tracking-[0.15em]">
            Night<span className="text-pink-500">Club</span>
          </div>

          <div className="flex flex-col gap-6">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xl font-bold uppercase tracking-wider ${
                    isActive ? "text-pink-500" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}