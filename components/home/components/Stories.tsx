import { testimonials } from "@/constant/site";

export default function Stories() {
  return (
    <section className="bg-cream-bg px-5 py-20 sm:px-8 lg:px-14 lg:py-28 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:text-base">
            Stories
          </span>
          <h2 className="mt-3 text-3xl font-playfair font-bold leading-tight text-text sm:text-4xl lg:text-[56px]">
            Loved by travelers and hosts alike.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-8"
            >
              <blockquote className="mt-6 flex-1 text-lg leading-8 text-text">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-8 border-t border-border pt-5">
                <p className="font-semibold text-text">{testimonial.name}</p>
                <p className="mt-1 text-sm text-text-muted">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
