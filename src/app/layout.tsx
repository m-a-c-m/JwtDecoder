import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://miguelacm.es/tools/jwt-decoder";

export const metadata: Metadata = {
  title: {
    default: "Decodificador JWT Online Gratis",
    template: "%s | MACM Tools",
  },
  description:
    "Decodifica tokens JWT al instante. Visualiza header, payload y claims. Comprueba expiración. Sin registro, gratis.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Decodificador JWT Online Gratis",
    description:
      "Decodifica tokens JWT al instante. Visualiza header, payload y claims. Comprueba expiración. Sin registro, gratis.",
    url: SITE_URL,
    siteName: "MACM Tools",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decodificador JWT Online Gratis",
    description:
      "Decodifica tokens JWT al instante. Visualiza header, payload y claims. Comprueba expiración. Sin registro, gratis.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href="https://miguelacm.es" />
      </head>
      <body>
        {children}
        <footer className="mt-12 border-t border-[#1e293b] py-6 text-center text-xs text-[#94a3b8]">
          <p>
            Creado por{" "}
            <a
              href="https://miguelacm.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00d4ff] hover:underline"
            >
              Miguel Ángel Colorado Marin (MACM)
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/m-a-c-m/JwtDecoder"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00d4ff] hover:underline"
            >
              GitHub
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
