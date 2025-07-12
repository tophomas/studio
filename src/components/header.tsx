"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Feather, Menu, BookOpen, Sparkles, Info, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Feed', icon: BookOpen },
  { href: '/submit', label: 'Submit', icon: Sparkles },
  { href: '/challenges', label: 'Challenges', icon: Feather },
  { href: '/about', label: 'About', icon: Info },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "text-muted-foreground transition-colors hover:text-foreground",
          isActive && "text-foreground"
        )}
      >
        {children}
      </Link>
    );
  };
  
  const MobileNavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
    const isActive = pathname === href;
    return (
      <SheetClose asChild>
        <Link
          href={href}
          className={cn(
            "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
            isActive && "text-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      </SheetClose>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Feather className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">PoéticaMente</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
          </nav>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetClose asChild>
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <Feather className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">PoéticaMente</span>
                </Link>
              </SheetClose>
              <div className="flex flex-col space-y-3">
                <nav className="grid gap-2 text-lg font-medium">
                   {navLinks.map(link => <MobileNavLink key={link.href} href={link.href} label={link.label} icon={link.icon} />)}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <User className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">User Settings</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
