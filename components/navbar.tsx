import { Activity } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const date = new Date();

  return (
    <nav className="fixed w-full flex items-center justify-between md:justify-end p-2 space-x-4">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <div className="grid">
        <Link
          href="/"
          className="flex items-center space-x-2 cursor-pointer select-none"
        >
          <Activity size="16" />
          <h1 className="font-bold">Leads</h1>
        </Link>
        <p className="text-[8px]">
          &copy; {date.getFullYear()} | the Support Team
        </p>
      </div>

      <ThemeToggle />
    </nav>
  );
}
