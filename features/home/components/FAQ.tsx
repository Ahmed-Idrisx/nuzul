"use client";

import { questions } from "@/constant/site";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visibleQuestions = showAll ? questions : questions.slice(0, 6);

  return (
    <section id="faq" className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:text-base">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-playfair font-bold leading-tight text-text sm:text-4xl lg:text-[56px]">
            Frequently asked questions.
          </h2>
        </div>

        <div className="mt-12 border-b border-border grid gap-x-10 md:grid-cols-2">
          {visibleQuestions.map((item, index) => {
            const isOpen = openQuestion === index;

            return (
              <article
                key={item.question}
                className="border-t border-border bg-white"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenQuestion(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-1 py-5 text-left font-semibold text-text transition hover:text-primary sm:px-0 sm:py-8 md:text-xl"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <FiMinus
                      className="h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  ) : (
                    <FiPlus
                      className="h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  )}
                </button>
                {isOpen && (
                  <div className="border-t border-border px-1 pb-5 pt-4 text-sm leading-7 text-text-muted sm:px-0 md:text-base">
                    {item.answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          className="mx-auto mt-8 block rounded-xl border border-border bg-primary/5 px-5 py-3 font-semibold text-primary transition-colors hover:border-primary hover:text-primary-dark"
        >
          {showAll ? "Show fewer questions" : "Show more questions"}
        </button>
      </div>
    </section>
  );
}
