"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className=" sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="md:container md:mx-auto px-4 ">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080FA] to-[#0066CC]">
              <span className="text-xl font-bold text-white">NH</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Nguyễn Hưng</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex">
              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#0080FA]"
                >
                  Trang chủ
                </Link>
                <Link
                  href="/?category=cong-nghe"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#0080FA]"
                >
                  Công nghệ
                </Link>
                <Link
                  href="/?category=lap-trinh"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#0080FA]"
                >
                  Lập trình
                </Link>
                <Link
                  href="/?category=ai-machine-learning"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#0080FA]"
                >
                  AI & ML
                </Link>
              </nav>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white w-full p-4 left-0 absolute shadow-md top-[70px]">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-[#0080FA]"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                href="/?category=cong-nghe"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-[#0080FA]"
                onClick={() => setIsMenuOpen(false)}
              >
                Công nghệ
              </Link>
              <Link
                href="/?category=lap-trinh"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-[#0080FA]"
                onClick={() => setIsMenuOpen(false)}
              >
                Lập trình
              </Link>
              <Link
                href="/?category=ai-machine-learning"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-[#0080FA]"
                onClick={() => setIsMenuOpen(false)}
              >
                AI & ML
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
