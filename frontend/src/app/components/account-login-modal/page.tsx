"use client";

import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store/users-store";
interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
    const user = useUserStore((state)=> state.user);
    const logout = useUserStore((state)=> state.logout);

    const handleLogout = ()=> {
        logout();
        onClose();
    }
   return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-[400px] p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {user ? (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Welcome, {user?.name || user?.email}!
            </h2>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Welcome</h2>

            <Link
              href="/auth/auth-login-form"
              className="w-full text-center bg-[#F53E32] text-white px-4 py-2 rounded hover:bg-[#d32f1f] transition"
              onClick={onClose}
            >
              Login
            </Link>

            <Link
              href="/auth/auth-register-form"
              className="w-full text-center border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

