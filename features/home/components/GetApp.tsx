import { appStores } from "@/constant/site";

export default function GetApp() {
  return (
    <section className="bg-[#08343a] px-5 py-20 sm:px-8 lg:px-14 lg:py-28 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:text-base">
            Get the app
          </span>
          <h2 className="mt-3 text-3xl font-playfair font-bold leading-tight text-white sm:text-4xl lg:text-[56px]">
            Your next stay is one tap away.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9 lg:text-2xl">
            Nuzul lives on your phone — search, book and manage every trip from
            iOS or Android.
          </p>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-xl gap-4 sm:grid-cols-2">
          {appStores.map((store) => {
            const StoreIcon = store.icon;

            return (
              <a
                key={store.name}
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white p-4 text-text shadow-lg transition hover:-translate-y-1 hover:bg-primary hover:text-white"
              >
                <StoreIcon
                  className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
                  aria-hidden="true"
                />
                <span className="text-left">
                  <span className="block text-xs font-medium uppercase tracking-[0.14em] opacity-70">
                    {store.caption}
                  </span>
                  <span className="block text-xl font-semibold leading-tight sm:text-2xl">
                    {store.name}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
