import { assets } from "@/assets";
import { company, explore, getTheApp, socialLinks } from "@/constant/site";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cream-bg text-text">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Footer Top */}
        <div className="grid gap-10 border-b border-border pb-10 md:grid-cols-2 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand */}
          <div className="max-w-md">
            <Image
              src={assets.logo}
              alt="Nuzul"
              width={130}
              height={44}
              className="h-10 w-auto"
            />

            <p className="mt-5 text-sm leading-6 text-text-muted max-w-70">
              Find your home away from home — unique stays and local
              experiences, wherever you go.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  href={href}
                  className="text-text transition-colors hover:text-primary-dark"
                >
                  <Icon className="size-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {/* Explore */}
            <div>
              <h3 className="text-sm font-bold text-text-muted uppercase">
                Explore
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-muted transition-colors hover:text-primary-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get the app */}
            <div>
              <h3 className="text-sm font-bold text-text-muted uppercase">
                Get The App
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {getTheApp.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-muted transition-colors hover:text-primary-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-bold text-text-muted uppercase">
                Company
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-muted transition-colors hover:text-primary-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col gap-3 pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Nuzul. All rights reserved.</span>

          <span>Cairo, Egypt</span>
        </div>
      </div>
    </footer>
  );
}
