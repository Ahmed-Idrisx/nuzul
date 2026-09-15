import { assets } from "@/assets";
import { site } from "@/constant/site";
import Image from "next/image";
import Link from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main>
      <div className="mx-auto grid min-h-screen max-w-6xl gap-20 px-4 py-20 lg:grid-cols-2 lg:px-6">
        <div className="flex flex-col">
          <Link href="/" className="mb-6 flex justify-start">
            <Image src={assets.logo} alt={site.name} width={142} height={48} />
          </Link>
          <div className="flex flex-1 items-center justify-center">
            {children}
          </div>
          <p className="mt-10 text-center text-xs text-neutral-400">
            {"<Developed By>"} {site.name}{" "}
            {"<All Copy Rights Reserved @" + new Date().getFullYear() + ">"}
          </p>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="relative h-full w-full overflow-hidden rounded-4xl">
            <Image
              src={assets.reg}
              alt="auth image"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/50 flex justify-center items-end text-center pb-20 ">
              <p className="text-3xl font-bold leading-relaxed text-white">
                Book your place
                <br /> in the best hotels
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
