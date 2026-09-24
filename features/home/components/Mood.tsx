"use client";

import { experiences, type Tab, tabs } from "@/constant/site";
import { useState } from "react";
import { FiShield } from "react-icons/fi";

export default function Mood() {
  const [activeTab, setActiveTab] = useState<Tab>("guest");
  const experience = experiences[activeTab];
  const ExperienceIcon = experience.icon;

  return (
    <section className="bg-cream-bg px-5 py-20 sm:px-8 lg:px-14 lg:py-24 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Whichever you are
          </span>
          <h2 className="mt-3 text-3xl font-playfair font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
            Made for guests. Built for hosts.
          </h2>
          <div
            className="mx-auto mt-8 inline-flex rounded-xl border border-border bg-white p-1 shadow-sm"
            role="tablist"
            aria-label="Choose your experience"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${activeTab === tab ? "bg-primary text-white shadow-sm" : "text-text-muted hover:bg-primary/10 hover:text-text"}`}
              >
                {experiences[tab].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14" role="tabpanel" aria-label={experience.label}>
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-28">
            <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-3xl bg-white p-16 text-primary">
              <ExperienceIcon className="h-full w-full" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-2xl font-playfair font-bold leading-tight text-text sm:text-3xl md:text-4xl">
                {experience.title}
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-text-muted sm:text-2xl">
                {experience.description}
              </p>
              <ul className="mt-7 space-y-4 text-text">
                {experience.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <FiShield
                      className="mt-1 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3 sm:mt-14">
            {experience.steps.map((step, index) => (
              <article key={step.title} className="p-0 sm:p-6">
                <div className="flex items-center justify-between text-primary">
                  <span className="text-5xl font-playfair font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 leading-7 text-text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
