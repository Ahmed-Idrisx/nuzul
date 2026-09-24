"use client";

import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { FiMail, FiMessageCircle, FiPhone } from "react-icons/fi";

export default function Contact() {
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);

  return (
    <section
      className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28 xl:px-24"
      onClick={() => setIsContactMenuOpen(false)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:text-base">
            Support
          </span>
          <h2 className="mt-3 text-3xl font-playfair font-bold leading-tight text-text sm:text-4xl lg:text-[56px]">
            We&apos;re here whenever you need us.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-cream-bg p-7 text-center shadow-sm sm:p-8">
            <FiMail className="h-10 w-10 text-primary" aria-hidden="true" />
            <h3 className="mt-5 text-2xl font-bold text-text">Email us</h3>
            <p className="mt-3 max-w-xs leading-7 text-text-muted">
              For anything at all, drop us a line and we&apos;ll get back within
              24 hours.
            </p>
            <a
              href="mailto:ahmedidrisx@gmail.com"
              className="mt-auto pt-6 font-semibold text-primary transition hover:text-primary-dark"
            >
              ahmedidrisx@gmail.com
            </a>
          </div>

          <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-cream-bg p-7 text-center shadow-sm sm:p-8">
            <FaWhatsapp className="h-10 w-10 text-primary" aria-hidden="true" />
            <h3 className="mt-5 text-2xl font-bold text-text">
              WhatsApp / Call
            </h3>
            <p className="mt-3 max-w-xs leading-7 text-text-muted">
              Prefer to talk it through? Message or call us directly.
            </p>
            <div
              className="relative mt-auto pt-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsContactMenuOpen((open) => !open)}
                aria-expanded={isContactMenuOpen}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark"
              >
                <FiMessageCircle aria-hidden="true" />
                Contact Us
              </button>
              {isContactMenuOpen && (
                <div className="absolute bottom-full left-1/2 mb-2 flex w-44 -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-border bg-white p-1 text-left shadow-xl">
                  <a
                    href="tel:+201043104194"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-text transition hover:bg-primary/10 hover:text-primary"
                  >
                    <FiPhone className="text-primary" aria-hidden="true" />
                    Call
                  </a>
                  <a
                    href="https://wa.me/201043104194?text=Hello%20Nuzul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-text transition hover:bg-primary/10 hover:text-primary"
                  >
                    <FaWhatsapp className="text-primary" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-cream-bg p-7 text-center shadow-sm sm:p-8">
            <FaInstagram
              className="h-10 w-10 text-primary"
              aria-hidden="true"
            />
            <h3 className="mt-5 text-2xl font-bold text-text">
              Follow us on Instagram
            </h3>
            <p className="mt-3 max-w-xs leading-7 text-text-muted">
              Follow Nuzul for travel inspiration and new stays.
            </p>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-6 font-semibold text-primary transition hover:text-primary-dark"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
