'use client';

import { useRef } from 'react';
import { business } from '../content/business';
import { BottleThemeToggle } from './bottle-theme-toggle';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/menu/', label: 'Menu' },
  { href: '/lookbook/', label: 'Lookbook' },
  { href: '/aftercare/', label: 'Aftercare' },
] as const;

/** Slim header: Didone wordmark, quiet text navigation and a lacquer Contact pill. */
export function SiteHeader() {
  const menuRef = useRef<HTMLUListElement>(null);

  function closeMobileMenu() {
    const el = menuRef.current as (HTMLUListElement & { hidePopover?: () => void }) | null;
    if (el && typeof el.hidePopover === 'function') {
      try {
        el.hidePopover();
      } catch {
        // Ignore when the popover is not open (desktop inline view).
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-lg">
      <div className="wrap flex min-h-[4.25rem] items-center justify-between gap-3">
        <SiteLink
          href="/"
          className="font-display text-[1.6rem] leading-none tracking-[-0.03em] text-ink no-underline hover:no-underline sm:text-[1.85rem]"
        >
          <span className="italic">{business.wordmark}</span>
        </SiteLink>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav aria-label="Primary" className="flex items-center">
            <button
              type="button"
              {...({ popoverTarget: 'site-mobile-menu', popoverTargetAction: 'toggle' } as Record<string, string>)}
              aria-controls="site-mobile-menu"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink hover:border-ink md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 9h16M4 15h16" />
              </svg>
              <span>Menu</span>
            </button>

            <ul
              ref={menuRef}
              id="site-mobile-menu"
              {...({ popover: 'auto' } as Record<string, string>)}
              className="mobile-nav-popover m-0 list-none space-y-1 md:static md:flex md:w-auto md:max-w-none md:items-center md:gap-1 md:space-y-0 md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:shadow-none"
            >
              {NAV_ITEMS.map(item => (
                <li key={item.href}>
                  <SiteLink
                    href={item.href}
                    markCurrent="page"
                    onClick={closeMobileMenu}
                    className="flex min-h-11 items-center rounded-full px-4 text-[0.95rem] text-ink no-underline decoration-accent-ink underline-offset-[0.4em] hover:underline aria-[current=page]:underline md:px-3"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
              <li className="pt-2 md:pl-3 md:pt-0">
                <SiteLink
                  href="/contact/"
                  markCurrent="page"
                  onClick={closeMobileMenu}
                  className="button min-h-11 w-full px-5 py-2 text-[0.9rem] md:w-auto"
                >
                  Contact
                </SiteLink>
              </li>
            </ul>
          </nav>

          <BottleThemeToggle />
        </div>
      </div>
    </header>
  );
}
