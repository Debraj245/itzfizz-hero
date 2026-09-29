import "./globals.css";

export const metadata = {
  title: "Welcome ITZFIZZ | Scroll-driven hero",
  description:
    "A scroll-driven hero section animation built with Next.js, GSAP ScrollTrigger and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
        />
        
        <noscript>
          <style>{`[data-letter],[data-stat],[data-car-body],[data-trail]{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
