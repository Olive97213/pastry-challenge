'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Menu,
  X,
  ChefHat,
  BookOpen,
  PlusCircle,
  UserCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: '/dashboard/recipes', label: 'Mes Recettes', icon: BookOpen },
    { href: '/add-recipes', label: 'Ajouter Recette', icon: PlusCircle },
    { href: '/account', label: 'Mon compte', icon: UserCircle2 },
  ];

  return (
    <nav className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg">
              <ChefHat className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              RecetteBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                <link.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'border-border max-h-64 border-t' : 'max-h-0'
        }`}
      >
        <div className="space-y-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors"
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
