import fs from "node:fs";
import path from "node:path";
import Hero from "@/components/Hero";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function findCarImage() {
  for (const file of ["car.png", "car.webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", file))) {
      return `${basePath}/${file}`;
    }
  }
  return null;
}

export default function Page() {
  return (
    <main>
      <Hero carSrc={findCarImage()} />
      <footer className="px-6 py-20 text-center text-sm text-ink/70">
        Built with Next.js, GSAP ScrollTrigger and Tailwind CSS.
      </footer>
    </main>
  );
}
