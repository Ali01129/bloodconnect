"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import ConfirmModal from "./ConfirmModal";

interface NavbarProps {
  fetchData?: () => void;
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.69Z" />
      <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
    </svg>
  );
}

function AddPersonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      {/* Person */}
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
      {/* Plus - larger */}
      <path d="M16 10.25h6v1.5h-6zM18.25 8h1.5v6h-1.5z" />
    </svg>
  );
}

function LoginIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path fillRule="evenodd" d="M12 2.25a4.5 4.5 0 0 0-4.5 4.5V9H6.75A2.25 2.25 0 0 0 4.5 11.25v6A2.25 2.25 0 0 0 6.75 19.5h10.5A2.25 2.25 0 0 0 19.5 17.25v-6A2.25 2.25 0 0 0 17.25 9H16.5V6.75a4.5 4.5 0 0 0-4.5-4.5Zm3 6.75h-6V6.75a3 3 0 1 1 6 0V9Z" clipRule="evenodd" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

export default function Navbar({ fetchData }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loginOpen, setLoginOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const isHome = pathname === "/";

  const fetchAuth = () => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(!!data.loggedIn))
      .catch(() => setIsLoggedIn(false));
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  const godash = () => {
    router.push("/");
    if (fetchData) fetchData();
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setIsLoggedIn(false);
        setLogoutOpen(false);
        router.refresh();
      }
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="w-full py-5 px-2 bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <button
          type="button"
          onClick={godash}
          className="font-bold text-[rgb(191,52,52)] text-3xl md:text-[30px] sm:text-xl max-[543px]:text-[15px] max-[437px]:text-[17px] font-['Bungee_Spice'] hover:opacity-90 transition-opacity cursor-pointer"
        >
          BloodConnect
        </button>
        <div className="flex items-center gap-4 font-['Signika',sans-serif]">
          <button
            type="button"
            onClick={godash}
            className={
              isHome
                ? "flex items-center gap-2 text-red-600 bg-red-100 border border-red-300 rounded-lg px-3 py-1.5 text-base max-[649px]:text-[13px] max-[543px]:text-[10px] hover:text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
                : "flex items-center gap-2 text-black rounded-lg px-3 py-1.5 border border-transparent text-base max-[649px]:text-[13px] max-[543px]:text-[10px] hover:text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
            }
          >
            <HomeIcon className="size-5 shrink-0" />
            <span>Home</span>
          </button>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => setLogoutOpen(true)}
              className="flex items-center gap-2 text-black rounded-lg px-3 py-1.5 border border-transparent text-base max-[649px]:text-[13px] max-[543px]:text-[10px] hover:text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
            >
              <LogoutIcon className="size-5 shrink-0" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="flex items-center gap-2 text-black rounded-lg px-3 py-1.5 border border-transparent text-base max-[649px]:text-[13px] max-[543px]:text-[10px] hover:text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
            >
              <LoginIcon className="size-5 shrink-0" />
              <span>Login</span>
            </button>
          )}
          <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
          <ConfirmModal
            isOpen={logoutOpen}
            onClose={() => setLogoutOpen(false)}
            variant="logout"
            title="Logout"
            message="Are you sure you want to logout?"
            cancelLabel="Cancel"
            confirmLabel="Logout"
            onConfirm={handleLogout}
            loading={logoutLoading}
          />
          <Link
            href="/register"
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-base max-[649px]:text-[13px] max-[543px]:text-[10px] cursor-pointer"
          >
            <AddPersonIcon className="size-5 shrink-0" />
            <span>Become a Donor</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
