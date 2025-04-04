"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Home,
  LogOut,
  Menu,
  Plus,
  Settings,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThemeToggler from "../Theme/theme-toogler";

const routes = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Invoices", icon: FileText, href: "/invoice" },
  { label: "Clients", icon: Users, href: "/clients" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const NavBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-4 border-b bg-background/95 backdrop-blur">
      <Link href="/" className="flex items-center">
        <FileText className="h-6 w-6 text-primary mr-2" />
        <h1 className="text-xl font-bold">InvoiceGen</h1>
      </Link>

      <div className="hidden md:flex items-center gap-x-4">
        {routes.map(({ label, icon: Icon, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
              pathname === href
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Link>
        ))}
      </div>

      <div className="flex  items-center gap-x-2">

      <ThemeToggler />
        {!user ? (
          <Link href={"/login"}>
            <Button size="sm" className="hover: cursor-pointer">
              Log In
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={session.user?.image || ""}
                  alt={session.user?.name || "User"}
                />
                <AvatarFallback>
                  {session.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => signOut({})}
                className="text-red-500 cursor-pointer flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Link href={"/invoice"}>
          <Button size="sm" className="hidden md:flex">
            <Plus className="h-4 w-4 mr-2" /> New Invoice
          </Button>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex items-center p-6 border-b">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <FileText className="h-6 w-6 text-primary mr-2" />
                <h1 className="text-xl font-bold">InvoiceGen</h1>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setIsOpen(false)}
              >
                {/* <X className="h-6 w-6" /> */}
              </Button>
            </div>

            <div className="flex flex-col p-4">
              {routes.map(({ label, icon: Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center p-3 text-sm font-medium rounded-md transition-colors",
                    pathname === href
                      ? "text-primary bg-muted"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {label}
                </Link>
              ))}
              <Link href={"/login"}>
                <Button className="mt-4 w-full hover: cursor-pointer">
                  Log In
                </Button>
              </Link>
              <Button className="mt-4 w-full">
                <Plus className="h-4 w-4 mr-2" /> New Invoice
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
