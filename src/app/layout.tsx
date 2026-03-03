import "./globals.css";
import Providers from "./providers";
import { Press_Start_2P } from "next/font/google";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-white text-black ${pixelFont.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
