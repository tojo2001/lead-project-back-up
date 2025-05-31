import { Activity } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Count } from "./count";
import PushUpdateBtn from "./push-update-btn";

const IS_ON_PROD = process.env.NODE_ENV == "production";

export default function Navbar() {
  const date = new Date();

  return (
    <nav className="fixed flex items-center justify-between w-full p-2 z-10">
      <Count />
      <div className="flex items-center justify-between md:justify-end space-x-4">
        {!IS_ON_PROD && <PushUpdateBtn />}
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
      </div>
    </nav>
  );
}
